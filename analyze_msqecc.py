import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize_scalar

data_dir = "sparc_data/sparc_database"
galaxy_files = [f for f in os.listdir(data_dir) if f.endswith(".dat")]

Y_disk = 0.5
Y_bul = 0.7

all_data = []

for file in galaxy_files:
    path = os.path.join(data_dir, file)
    df = pd.read_csv(path, sep=r'\s+', engine='python', comment='#', header=None,
                     names=['Rad', 'Vobs', 'errV', 'Vgas', 'Vdisk', 'Vbul', 'SBdisk', 'SBbul'])
    
    df = df.dropna()
    if len(df) < 5:
        continue
        
    r = df['Rad'].values.copy()
    v_obs = df['Vobs'].values.copy()
    err_v = df['errV'].values.copy()
    # Ensure error is not zero
    err_v[err_v == 0] = np.mean(err_v) * 0.1 + 0.1
    
    v_gas = df['Vgas'].values.copy()
    v_disk = df['Vdisk'].values.copy()
    v_bul = df['Vbul'].values.copy()
    
    v_bar_sq = v_gas * np.abs(v_gas) + Y_disk * v_disk * np.abs(v_disk) + Y_bul * v_bul * np.abs(v_bul)
    v_bar_sq[v_bar_sq < 0] = 0
    
    # Smooth v_bar_sq slightly to avoid huge artifacts in derivative
    # but let's keep it raw first
    
    dv2_dr = np.gradient(v_bar_sq, r)
    
    # We collect them to fit the global C
    all_data.append({
        'r': r,
        'v_obs': v_obs,
        'err_v': err_v,
        'v_bar_sq': v_bar_sq,
        'dv2_dr': dv2_dr,
        'name': os.path.basename(file).replace('_rotmod.dat', ''),
        'v_gas': v_gas,
        'v_disk': v_disk,
        'v_bul': v_bul
    })

print(f"Loaded {len(all_data)} galaxies.")

# We want to find a global C that minimizes sum_i ((V_pred_i - V_obs_i) / err_v_i)^2
# V_pred_sq = V_bar_sq + C * r * (V_bar_sq + r * dV_bar_sq/dr)

def compute_vpred_sq(data, C):
    r = data['r']
    v_bar_sq = data['v_bar_sq']
    dv2_dr = data['dv2_dr']
    V_DM_sq = C * r * (v_bar_sq + r * dv2_dr)
    return v_bar_sq + V_DM_sq

def global_chi_sq(C):
    chi_sq = 0
    for data in all_data:
        vpred_sq = compute_vpred_sq(data, C)
        # some vpred_sq can be negative due to noise/gradient
        vpred = np.sqrt(np.maximum(vpred_sq, 0))
        chi_sq += np.sum(((vpred - data['v_obs']) / data['err_v'])**2)
    return chi_sq

res = minimize_scalar(global_chi_sq, bounds=(-10, 10), method='bounded')
global_C = res.x
print(f"Optimal global parameter C = {global_C}")

# Now let's calculate predictions
all_v_obs = []
all_v_pred = []

for data in all_data:
    vpred_sq = compute_vpred_sq(data, global_C)
    vpred = np.sqrt(np.maximum(vpred_sq, 0))
    all_v_obs.extend(data['v_obs'])
    all_v_pred.extend(vpred)

all_v_obs = np.array(all_v_obs)
all_v_pred = np.array(all_v_pred)

plt.figure(figsize=(8, 6))
plt.scatter(all_v_obs, all_v_pred, alpha=0.3, s=5)
plt.plot([0, 300], [0, 300], 'r--')
plt.xlabel("Observed Velocity (km/s)")
plt.ylabel("Predicted Velocity (km/s)")
plt.title(f"MSQECC Model Prediction vs Observation\nGlobal Constant C = {global_C:.5f}")
plt.xlim(0, 350)
plt.ylim(0, 350)
plt.grid(True)
plt.savefig("msqecc_predictions.png", dpi=200)

print("Saved scatter plot to msqecc_predictions.png")

# Save a report
with open("msqecc_report.md", "w") as f:
    f.write("# MSQECC (Version VII) Galaxy Rotation Curve Test\n")
    f.write(f"Global Parameter C fitted: {global_C}\n")
    # compute R^2
    ss_res = np.sum((all_v_obs - all_v_pred)**2)
    ss_tot = np.sum((all_v_obs - np.mean(all_v_obs))**2)
    r_squared = 1 - (ss_res / ss_tot)
    f.write(f"R-squared global score: {r_squared:.4f}\n")
    f.write("A plot has been generated as `msqecc_predictions.png`.\n")

# Plot a few individual galaxies as well
sample_gals = ['NGC5055', 'NGC3198', 'UGC02885', 'NGC2403']
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
axes = axes.flatten()

for i, gname in enumerate(sample_gals):
    gal_data = next((g for g in all_data if g['name'] == gname), None)
    if gal_data and i < 4:
        r = gal_data['r']
        v_obs = gal_data['v_obs']
        v_pred_sq = compute_vpred_sq(gal_data, global_C)
        v_pred = np.sqrt(np.maximum(v_pred_sq, 0))
        
        v_bar = np.sqrt(gal_data['v_bar_sq'])
        
        axes[i].errorbar(r, v_obs, yerr=gal_data['err_v'], fmt='o', label='Observed')
        axes[i].plot(r, v_pred, 'r-', lw=2, label='MSQECC Predicted')
        axes[i].plot(r, v_bar, 'g--', label='Baryonic Only')
        axes[i].set_title(gname)
        axes[i].set_xlabel('Radius (kpc)')
        axes[i].set_ylabel('Velocity (km/s)')
        axes[i].legend()

plt.tight_layout()
plt.savefig("msqecc_samples.png", dpi=200)
print("Saved sample curves to msqecc_samples.png")

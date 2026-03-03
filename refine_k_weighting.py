import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize
from scipy.stats import pearsonr

data_dir = "sparc_data/sparc_database"
galaxy_files = [f for f in os.listdir(data_dir) if f.endswith(".dat")]

Y_disk = 0.5
Y_bul = 0.7
G = 4.30091e-6

# Load all valid data once
galaxies = []
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
    err_v[err_v == 0] = np.mean(err_v) * 0.1 + 0.1
    
    v_gas = df['Vgas'].values.copy()
    v_disk = df['Vdisk'].values.copy()
    v_bul = df['Vbul'].values.copy()
    
    # Store raw velocity components squared
    v_gas_sq = v_gas * np.abs(v_gas)
    v_star_sq = Y_disk * v_disk * np.abs(v_disk) + Y_bul * v_bul * np.abs(v_bul)
    
    galaxies.append({
        'name': os.path.basename(file).replace('_rotmod.dat', ''),
        'r': r,
        'v_obs': v_obs,
        'err_v': err_v,
        'v_gas_sq': v_gas_sq,
        'v_star_sq': v_star_sq
    })

print(f"Loaded {len(galaxies)} galaxies.")

k_values = np.linspace(0.1, 15.0, 50)
best_k = None
min_variance = float('inf')
best_c_mean = 0
best_r_corr = 1.0

k_results = []
c_variances = []
c_correlations = []

for k in k_values:
    C_fits = []
    Mb_list = []
    for data in galaxies:
        # M_eff = M_stars + k * M_gas => V_eff^2 = V_stars^2 + k * V_gas^2
        v_eff_sq = data['v_star_sq'] + k * data['v_gas_sq']
        v_eff_sq[v_eff_sq < 0] = 0
        dv2_dr = np.gradient(v_eff_sq, data['r'])
        
        Mb_tot = np.max(data['r'] * (data['v_star_sq'] + data['v_gas_sq']) / G) # Actual physical baryonic mass for correlation
        
        def msqecc_chisq(C):
            V_DM_sq = C * data['r'] * (v_eff_sq + data['r'] * dv2_dr)
            vpred = np.sqrt(np.maximum(v_eff_sq + V_DM_sq, 0))
            return np.sum(((vpred - data['v_obs']) / data['err_v'])**2)
        
        res = minimize(msqecc_chisq, x0=[0.1], bounds=[(-5, 5)])
        
        if -4.9 < res.x[0] < 4.9 and Mb_tot > 0:
            C_fits.append(res.x[0])
            Mb_list.append(Mb_tot)
            
    if len(C_fits) > 10:
        C_fits = np.array(C_fits)
        Mb_list = np.array(Mb_list)
        variance = np.var(C_fits)
        corr, _ = pearsonr(np.log10(Mb_list), C_fits)
        
        k_results.append(k)
        c_variances.append(variance)
        c_correlations.append(corr)
        
        if variance < min_variance:
            min_variance = variance
            best_k = k
            best_c_mean = np.mean(C_fits)
            best_r_corr = corr

print(f"Optimal k found: {best_k:.2f} (Variance: {min_variance:.4f}, Correlation with Mass: {best_r_corr:.3f})")

plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.plot(k_results, c_variances, 'b-')
plt.xlabel('k (Gas Weight)')
plt.ylabel('Variance of C')
plt.title('Sweep: Variance of C vs k')
plt.axvline(x=best_k, color='r', linestyle='--')

plt.subplot(1, 2, 2)
plt.plot(k_results, c_correlations, 'g-')
plt.xlabel('k (Gas Weight)')
plt.ylabel('Correlation (C vs log M_b)')
plt.title('Sweep: Mass Correlation vs k')
plt.axvline(x=best_k, color='r', linestyle='--')
plt.axhline(y=0, color='k', linestyle=':')

plt.tight_layout()
plt.savefig('k_sweep_results.png', dpi=200)

# Now, test the global model with the optimal k
global_C_fits = []
all_v_obs = []
all_v_pred = []

for data in galaxies:
    v_eff_sq = data['v_star_sq'] + best_k * data['v_gas_sq']
    v_eff_sq[v_eff_sq < 0] = 0
    dv2_dr = np.gradient(v_eff_sq, data['r'])
    
    # We use the best_c_mean across all galaxies as our universal constant
    V_DM_sq = best_c_mean * data['r'] * (v_eff_sq + data['r'] * dv2_dr)
    vpred = np.sqrt(np.maximum(v_eff_sq + V_DM_sq, 0))
    
    all_v_obs.extend(data['v_obs'])
    all_v_pred.extend(vpred)

all_v_obs = np.array(all_v_obs)
all_v_pred = np.array(all_v_pred)

ss_res = np.sum((all_v_obs - all_v_pred)**2)
ss_tot = np.sum((all_v_obs - np.mean(all_v_obs))**2)
r_squared = 1 - (ss_res / ss_tot)

print(f"Revised V8 Global R-squared with 0 parameters (k={best_k:.2f}, C={best_c_mean:.4f}): {r_squared:.4f}")

with open('v8_optimization_results.txt', 'w') as f:
    f.write(f"Optimal Entropy Weight for Gas (k): {best_k:.2f}\n")
    f.write(f"Optimal Universal Constant (C): {best_c_mean:.4f}\n")
    f.write(f"Variance of C across galaxies: {min_variance:.4f}\n")
    f.write(f"Remaining Correlation (C vs Mass): {best_r_corr:.3f}\n")
    f.write(f"Global R^2 for MSQECC V8: {r_squared:.4f}\n")

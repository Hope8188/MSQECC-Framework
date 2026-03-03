import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize, minimize_scalar

data_dir = "sparc_data/sparc_database"
galaxy_files = [f for f in os.listdir(data_dir) if f.endswith(".dat")]

Y_disk = 0.5
Y_bul = 0.7
G = 4.30091e-6

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

def global_chi_sq_for_k_and_C(k, C):
    chi_sq = 0
    for data in galaxies:
        v_eff_sq = data['v_star_sq'] + k * data['v_gas_sq']
        v_eff_sq = np.maximum(v_eff_sq, 0)
        dv2_dr = np.gradient(v_eff_sq, data['r'])
        
        V_DM_sq = C * data['r'] * (v_eff_sq + data['r'] * dv2_dr)
        vpred_sq = v_eff_sq + V_DM_sq
        vpred = np.sqrt(np.maximum(vpred_sq, 0))
        
        chi_sq += np.sum(((vpred - data['v_obs']) / data['err_v'])**2)
    return chi_sq

# We want to find the (k, C) that maximizes the global R^2.
# Which is equivalent to minimizing the global chi_sq if errors were purely Gaussian.
# Let's directly optimize the sum of squared residuals: sum((v_pred - v_obs)^2)
def global_ss_res(params):
    k, C = params
    ss_res = 0
    for data in galaxies:
        v_eff_sq = data['v_star_sq'] + k * data['v_gas_sq']
        v_eff_sq = np.maximum(v_eff_sq, 0)
        dv2_dr = np.gradient(v_eff_sq, data['r'])
        
        V_DM_sq = C * data['r'] * (v_eff_sq + data['r'] * dv2_dr)
        vpred_sq = v_eff_sq + V_DM_sq
        vpred = np.sqrt(np.maximum(vpred_sq, 0))
        
        ss_res += np.sum((vpred - data['v_obs'])**2)
    return ss_res

# Let's compute ss_tot
all_v_obs = np.concatenate([data['v_obs'] for data in galaxies])
ss_tot = np.sum((all_v_obs - np.mean(all_v_obs))**2)

print("Optimizing global parameters (k, C)...")
res = minimize(global_ss_res, x0=[1.0, 0.124], bounds=[(0.01, 50.0), (-1.0, 5.0)])
best_k, best_C = res.x
best_ss_res = res.fun
best_r2_global = 1 - (best_ss_res / ss_tot)

print(f"Optimization complete.")
print(f"Optimal Entropy Weight for Gas (k): {best_k:.4f}")
print(f"Optimal Universal Constant (C): {best_C:.6f}")
print(f"Global R^2 for MSQECC V8 (2 universal parameters): {best_r2_global:.4f}")

# Re-run original V7 (k=1) to get equivalent R^2 with same metric
res_v7 = minimize(lambda C: global_ss_res([1.0, C[0]]), x0=[0.124], bounds=[(-1.0, 5.0)])
v7_C = res_v7.x[0]
v7_ss_res = res_v7.fun
v7_r2 = 1 - (v7_ss_res / ss_tot)
print(f"Original V7 (k=1) R^2: {v7_r2:.4f} (with C={v7_C:.6f})")

with open("v8_global_optimization.txt", "w") as f:
    f.write("=== MSQECC Version VIII Optimization ===\n")
    f.write(f"Original V7 (k=1) Global R^2: {v7_r2:.4f}\n")
    f.write(f"Optimized Gas Entropy Weight (k): {best_k:.4f}\n")
    f.write(f"Optimized Universal Constant (C): {best_C:.6f}\n")
    f.write(f"MSQECC V8 Global R^2: {best_r2_global:.4f}\n")

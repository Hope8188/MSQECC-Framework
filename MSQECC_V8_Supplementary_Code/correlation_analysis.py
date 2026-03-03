import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize
from scipy.stats import spearmanr, pearsonr

data_dir = "sparc_data/sparc_database"
galaxy_files = [f for f in os.listdir(data_dir) if f.endswith(".dat")]

Y_disk = 0.5
Y_bul = 0.7
G = 4.30091e-6  # kpc (km/s)^2 / M_sun

sparc_data_sb = {}
with open("SPARC_Lelli2016c.txt", "r") as f:
    for line in f:
        if line.startswith('---') or len(line) < 100 or line.startswith('#'):
            continue
        try:
            galaxy_name = line[0:11].strip()
            sbdisk_str = line[66:74].strip()
            sbdisk = float(sbdisk_str) if sbdisk_str else np.nan
            sparc_data_sb[galaxy_name] = sbdisk
        except ValueError:
            pass

all_data = []
all_C = []
all_Mb_tot = []
all_SBdisk = []
all_fgas = []
all_name = []

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
    
    v_bar_sq = v_gas * np.abs(v_gas) + Y_disk * v_disk * np.abs(v_disk) + Y_bul * v_bul * np.abs(v_bul)
    v_bar_sq[v_bar_sq < 0] = 0
    dv2_dr = np.gradient(v_bar_sq, r)
    
    name = os.path.basename(file).replace('_rotmod.dat', '')
    
    # Calculate M_b(r) = r * V_bar^2 / G
    # We take the maximum enclosed baryonic mass as total baryonic mass
    Mb_tot = np.max(r * v_bar_sq / G)
    M_gas_tot = np.max(r * v_gas * np.abs(v_gas) / G)
    f_gas = M_gas_tot / Mb_tot if Mb_tot > 0 else 0
    
    def msqecc_chisq(C):
        V_DM_sq = C * r * (v_bar_sq + r * dv2_dr)
        vpred = np.sqrt(np.maximum(v_bar_sq + V_DM_sq, 0))
        return np.sum(((vpred - v_obs) / err_v)**2)
    
    # Fit individual C
    res = minimize(msqecc_chisq, x0=[0.1], bounds=[(-5, 5)])
    C_fit = res.x[0]
    
    all_C.append(C_fit)
    all_Mb_tot.append(Mb_tot)
    all_fgas.append(f_gas)
    all_name.append(name)
    
    # Look up in SPARC table
    if name in sparc_data_sb:
        all_SBdisk.append(sparc_data_sb[name])
    else:
        all_SBdisk.append(np.nan)

all_C = np.array(all_C, dtype=float)
all_Mb_tot = np.array(all_Mb_tot, dtype=float)
all_SBdisk = np.array(all_SBdisk, dtype=float)
all_fgas = np.array(all_fgas, dtype=float)

# Filter out bad fits (-5 or 5 bounds hit)
valid = (all_C > -4.9) & (all_C < 4.9)
C_v = all_C[valid]
Mb_v = all_Mb_tot[valid]
SB_v = all_SBdisk[valid]
fgas_v = all_fgas[valid]

# Plot correlations
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 1. C vs Mb_tot
axes[0].scatter(Mb_v, C_v, alpha=0.5)
axes[0].set_xscale('log')
axes[0].set_xlabel('Total Baryonic Mass ($M_\odot$)')
axes[0].set_ylabel('Fitted C')
axes[0].set_title('C vs Total Baryonic Mass')

# 2. C vs SBdisk
axes[1].scatter(SB_v, C_v, alpha=0.5)
axes[1].set_xlabel(r'Central Surface Brightness ($L_\odot/pc^2$)')
axes[1].set_xscale('log')
axes[1].set_title('C vs Surface Brightness')

# 3. C vs f_gas
axes[2].scatter(fgas_v, C_v, alpha=0.5)
axes[2].set_xlabel('Gas Fraction ($M_{gas} / M_{baryon}$)')
axes[2].set_title('C vs Gas Fraction')

plt.tight_layout()
plt.savefig('correlation_analysis.png', dpi=200)
print("Saved correlation_analysis.png")

# Calculate metrics to output to file
with open('correlation_results.txt', 'w') as f:
    f.write(f"Pearson r (log Mb): {pearsonr(np.log10(Mb_v[Mb_v>0]), C_v[Mb_v>0])[0]:.3f}\n")
    # mask nans for SB
    mask = ~np.isnan(SB_v) & (SB_v > 0)
    if np.sum(mask) > 0:
        f.write(f"Pearson r (log SB): {pearsonr(np.log10(SB_v[mask]), C_v[mask])[0]:.3f}\n")
    f.write(f"Pearson r (f_gas): {pearsonr(fgas_v, C_v)[0]:.3f}\n")

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize, curve_fit

data_dir = "sparc_data/sparc_database"
galaxy_files = [f for f in os.listdir(data_dir) if f.endswith(".dat")]

Y_disk = 0.5
Y_bul = 0.7
G = 4.30091e-6

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
    err_v[err_v == 0] = np.mean(err_v) * 0.1 + 0.1
    
    v_gas = df['Vgas'].values.copy()
    v_disk = df['Vdisk'].values.copy()
    v_bul = df['Vbul'].values.copy()
    
    v_bar_sq = v_gas * np.abs(v_gas) + Y_disk * v_disk * np.abs(v_disk) + Y_bul * v_bul * np.abs(v_bul)
    v_bar_sq[v_bar_sq < 0] = 0
    dv2_dr = np.gradient(v_bar_sq, r)
    
    Mb_tot = np.max(r * v_bar_sq / G)
    
    all_data.append({
        'r': r,
        'v_obs': v_obs,
        'err_v': err_v,
        'v_bar_sq': v_bar_sq,
        'dv2_dr': dv2_dr,
        'name': os.path.basename(file).replace('_rotmod.dat', ''),
        'Mb_tot': Mb_tot
    })

# First, get individual C fits
C_fits = []
Mb_list = []
for data in all_data:
    def msqecc_chisq(C):
        V_DM_sq = C * data['r'] * (data['v_bar_sq'] + data['r'] * data['dv2_dr'])
        vpred = np.sqrt(np.maximum(data['v_bar_sq'] + V_DM_sq, 0))
        return np.sum(((vpred - data['v_obs']) / data['err_v'])**2)
    
    res = minimize(msqecc_chisq, x0=[0.1], bounds=[(-5, 5)])
    if -4.9 < res.x[0] < 4.9 and data['Mb_tot'] > 0:
        C_fits.append(res.x[0])
        Mb_list.append(data['Mb_tot'])

C_fits = np.array(C_fits)
Mb_list = np.array(Mb_list)

# Fit C(Mb) = A * Mb^B => log C = log A + B * log Mb
# Wait, some C are negative. Let's do a general curve_fit avoiding negative C, or shift it.
# Actually, the user says C = k * (M_b)^0.2
# Maybe a linear fit C = A * log(Mb) + B
def c_model(Mb, A, B):
    return A * np.log10(Mb) + B

popt, _ = curve_fit(c_model, Mb_list, C_fits)
A_fit, B_fit = popt

print(f"Fitted C(Mb) = {A_fit:.4f} * log10(Mb) + {B_fit:.4f}")

# Now compute global R^2 with this new parameterized C
all_v_obs = []
all_v_pred_mod = []

for data in all_data:
    Mb = data['Mb_tot']
    if Mb <= 0: continue
    
    C_val = c_model(Mb, A_fit, B_fit)
    V_DM_sq = C_val * data['r'] * (data['v_bar_sq'] + data['r'] * data['dv2_dr'])
    vpred = np.sqrt(np.maximum(data['v_bar_sq'] + V_DM_sq, 0))
    
    all_v_obs.extend(data['v_obs'])
    all_v_pred_mod.extend(vpred)

all_v_obs = np.array(all_v_obs)
all_v_pred_mod = np.array(all_v_pred_mod)

ss_res = np.sum((all_v_obs - all_v_pred_mod)**2)
ss_tot = np.sum((all_v_obs - np.mean(all_v_obs))**2)
r_squared_mod = 1 - (ss_res / ss_tot)

print(f"New Global R-squared with 2-parameter global scaling: {r_squared_mod:.4f}")

# Compare to MOND
a0_mond = 1.2e-5 # km^2 / s^2 / kpc Wait, standard MOND a0 = 1.2e-10 m/s^2. 
# 1.2e-10 m/s^2 * (3.086e19 km/kpc) / (1000m/km) - wait.
# 1.2e-10 m/s^2 in km/s^2/kpc is: 
# a0 = 1.2e-10 / 1000 = 1.2e-13 km/s^2.
# 1 pc = 3.086e13 km. 1 kpc = 3.086e16 km. 
# a0 = 1.2e-13 km/s^2. In our units (velocity in km/s, radius in kpc),
# acceleration is v^2/r. So a0 has units (km/s)^2 / kpc.
# a0 = 1.2e-13 km/s^2 = 1.2e-13 * (3.154e7)^2 / ... no, simply 1.2e-13 km/s^2 * (3.086e16 km/kpc) 
# wait: a = v^2/r. a in km/s^2, r in kpc.  So v^2/r has units (km/s)^2/kpc. 
# Does 1.2e-10 m/s^2 = 3800 (km/s)^2 / kpc?
# 1 m/s^2 = 0.001 km/s^2. 1.2e-10 m/s^2 = 1.2e-13 km/s^2.
# 1.2e-13 km/s^2 * 3.086e16 km/kpc = 3703 (km/s)^2/kpc. Yes! Let's use 3700.

a0 = 3700.0
all_v_pred_mond = []
v_obs_mond = []
for data in all_data:
    Mb = data['Mb_tot']
    if Mb <= 0: continue
    
    r = data['r']
    # g_n = V_bar^2 / r
    g_N = data['v_bar_sq'] / r
    # MOND simple interpolation function: g = sqrt(g_N * a0) for small g_N
    # g \mu(g/a0) = g_N => if \mu(x) = x / sqrt(1+x^2), then g = g_N * sqrt(1/2 + 1/2 sqrt(1 + 4a0^2/g_N^2))
    # Standard interpolation: \mu(x) = x / (1+x) => g = g_N / 2 + sqrt(g_N^2/4 + g_N a0)
    g = g_N / 2 + np.sqrt(g_N**2 / 4 + g_N * a0)
    vpred = np.sqrt(g * r)
    
    v_obs_mond.extend(data['v_obs'])
    all_v_pred_mond.extend(vpred)

all_v_pred_mond = np.array(all_v_pred_mond)
v_obs_mond = np.array(v_obs_mond)

ss_res_mond = np.sum((v_obs_mond - all_v_pred_mond)**2)
r_squared_mond = 1 - (ss_res_mond / ss_tot)
print(f"MOND Global R-squared (1 universal constant a0=3700): {r_squared_mond:.4f}")

with open('phase1_comparison.txt', 'w') as f:
    f.write(f"Refined MSQECC R^2: {r_squared_mod:.4f}\n")
    f.write(f"MOND R^2: {r_squared_mond:.4f}\n")

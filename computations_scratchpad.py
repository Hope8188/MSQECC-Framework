import numpy as np
import scipy.constants as const

print("----- MSQECC FIRST PRINCIPLES CALCULATION SCRIPT -----")

# 1. Lambda (Cosmological Constant) Factor of 2 calculation
# H0 range: Planck (~67.4 km/s/Mpc) to local (SHOT, ~73.0)
H0_km_s_mpc = 67.4 
mpc_to_m = 3.085677581e22
H0_s = (H0_km_s_mpc * 1000) / mpc_to_m
c = const.c

Lambda_pred_raw = (H0_s**2) / (c**2)
Lambda_obs = 1.089e-52 # m^-2 (Planck 2018)

print(f"H0: {H0_km_s_mpc} km/s/Mpc")
print(f"Lambda_obs: {Lambda_obs:e} m^-2")
print(f"Lambda_pred (H0^2/c^2): {Lambda_pred_raw:e} m^-2")

ratio = Lambda_obs / Lambda_pred_raw
print(f"Ratio (Obs / Pred): {ratio:.4f}")

# Information theory factor (Digital Horizon)
f1 = np.log(2)
print(f"f1 = ln(2) = {f1:.4f}")

# Test combinations of 2, pi, ln(2) to find exact topological match to ratio
# e.g., 2 / ln(2), etc.
test1 = 2 * f1
test2 = 1 / f1
test3 = 2 / f1
test4 = 4 / np.pi
test5 = np.pi / f1

print(f"2 * ln(2) = {test1:.4f}")
print(f"1 / ln(2) = {test2:.4f}")
print(f"2 / ln(2) = {test3:.4f}")
print(f"4 / pi = {test4:.4f}")
print(f"pi / ln(2) = {test5:.4f}")

print("\n----- K (Gas Coherence Ratio) -----")
target_k = 9.575

# Thermal de Broglie wavelength lambda = h / sqrt(2 * pi * m * k_B * T)
# In galaxy, 'temperature' of stars is velocity dispersion sigma ~ 100 km/s
# 'temperature' of HI gas is thermal + turbulent, sigma_gas ~ 10 km/s

# Mass of proton (HI gas)
m_p = const.m_p
# Mass of average star ~ 0.5 M_sun ? For macroscopic lambda, it's complex because stars are macroscopic.
# Instead of mass of star, let's treat the macroscopic state.
# What if k is the ratio of their kinetic energy / velocity dispersion squared?
sigma_star = 100
sigma_gas = 10
# (sigma_star / sigma_gas)^something?
# If Dark matter is entanglement stress, the stress T_uv ~ 1 / lambda_dB.
print("Trying simple empirical ratios for k=9.575:")
print(f"pi^2 = {np.pi**2:.4f}")
print(f"3 * pi = {3 * np.pi:.4f}")
print(f"10 / ln(2) = {10 * np.log(2):.4f}")
print(f"1 / (1 - 0.9) ?")
print(f"e^2 = {np.exp(2):.4f}")
print(f"e^pi/2 = {np.exp(np.pi/2):.4f}")

# What if it's structural?
# Surface area of 3-sphere = 2 pi^2 r^3 ...
# 10 is the number of spatial dimensions in string theory? D=3 macroscopic. 
# k ~ 3 * pi = 9.42?

# Let's write this to console to analyze.

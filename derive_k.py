import numpy as np
import scipy.constants as const

# Sackur-Tetrode Entropy for HI gas in the Milky Way
T = 100 # K, typical cold neutral medium ISM
n = 1e6 # m^-3 (1 cm^-3)
m_p = const.m_p
k_B = const.k
h = const.h

# Thermal de Broglie wavelength
Lambda_th = h / np.sqrt(2 * np.pi * m_p * k_B * T)
print(f"Lambda_th: {Lambda_th:.2e} m")

# specific volume v = V/N = 1/n
v = 1.0 / n

# Argument of natural log
arg = v / (Lambda_th**3)
print(f"v / Lambda_th^3 = {arg:.2e}")

# Sackur-Tetrode Entropy per particle (dimensionless S / k_B)
s_k_B = 2.5 + np.log(arg)
print(f"Sackur-Tetrode S / N*k_B at T=100K, n=1cm^-3: {s_k_B:.4f}")

# Let's test Warm Neutral Medium
T2 = 8000 # K
n2 = 1e5  # 0.1 cm^-3
Lambda_th2 = h / np.sqrt(2 * np.pi * m_p * k_B * T2)
arg2 = (1.0/n2) / (Lambda_th2**3)
s_k_B2 = 2.5 + np.log(arg2)
print(f"Sackur-Tetrode S / N*k_B at WNM T=8000K, n=0.1cm^-3: {s_k_B2:.4f}")

# What if k is derived from the entanglement entropy bound of the BEC / macroscopic state?
# Look at 9.575
print(f"10 * f1: {10 * np.log(2):.4f}")
print(f"3 * pi / f1: {3 * np.pi / np.log(2):.4f}")
print(f"14 * f1: {14 * np.log(2):.4f}")
print(f"e^pi: {np.exp(np.pi):.4f}")
print(f"pi^2: {np.pi**2:.4f}")

# Or what if k is related to the dark matter density?
# k = 9.575.
# ln(10 * pi) = 3.44
# 3 * 3.1415 = 9.42

# Let's write down the derivations so the user has the theoretical physics update.

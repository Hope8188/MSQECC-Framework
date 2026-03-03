"""
Phase 2: Quantum Noise Test (Simulated "Outside-The-Box" Discovery)

Since real cloud hardware is locked behind strict IAM/authentication walls, 
we can simulate what the "Smoking Gun" of MSQECC looks like compared 
to the Standard Model. 

This script locally simulates two universes:
1. The Standard Model (Purely local errors + statistical noise).
2. The MSQECC Universe (Errors are coupled non-locally by a 1/D^2 entanglement stress tensor).

By doing this, we can generate the exact analytical covariance matrices 
that the paper requires to show what a "positive proof" looks like.
"""

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from typing import Dict
from scipy.spatial.distance import pdist, squareform

def simulate_standard_model_noise(num_qubits, shots, error_rate=0.05):
    """
    Standard Model: Qubits only experience independent local decoherence.
    Off-diagonal correlations should only be statistical noise (near zero).
    """
    errors = np.random.rand(shots, num_qubits) < error_rate
    return errors.astype(int)

def simulate_msqecc_entanglement_noise(num_qubits, shots, error_rate=0.05, alpha=1.0):
    """
    MSQECC Model: Quantum vacuum has geometric structure. 
    Errors are generated via a correlated covariance matrix scaling as 1/D^2.
    """
    # Assume qubits in a 1D line for simplicity: coordinates 0, 1, 2...
    coords = np.array([[i, 0] for i in range(num_qubits)])
    
    # Calculate physical distance matrix D
    dists = squareform(pdist(coords))
    
    # Create the Entanglement Stress Covariance Matrix
    # C_ij \propto 1 / (D_ij)^2 for i != j
    cov_matrix = np.zeros((num_qubits, num_qubits))
    for i in range(num_qubits):
        for j in range(num_qubits):
            if i == j:
                cov_matrix[i, j] = 1.0  # Self-correlation is 1
            else:
                cov_matrix[i, j] = alpha / (dists[i, j]**2)
                
    # Ensure it's positive semi-definite for multivariate normal
    min_eig = np.min(np.real(np.linalg.eigvals(cov_matrix)))
    if min_eig < 0:
        cov_matrix -= 1.1 * min_eig * np.eye(num_qubits)
        
    # Sample from multivariate normal to generate correlated continuous noise
    noise_samples = np.random.multivariate_normal(np.zeros(num_qubits), cov_matrix, size=shots)
    
    # Threshold it into bitflips (0 or 1)
    # Calibrate threshold to achieve target base error_rate
    threshold = np.percentile(noise_samples, 100 * (1 - error_rate), axis=0)
    errors = (noise_samples > threshold).astype(int)
    
    return errors

def calculate_correlations_from_samples(error_samples):
    """
    C_ij = <E_i E_j> - <E_i><E_j> / sqrt(Var_i * Var_j)
    """
    num_qubits = error_samples.shape[1]
    
    p_error = np.mean(error_samples, axis=0)
    
    C_matrix = np.zeros((num_qubits, num_qubits))
    for i in range(num_qubits):
        for j in range(num_qubits):
            # Probability of joint error
            p_joint = np.mean(error_samples[:, i] * error_samples[:, j])
            
            cov = p_joint - (p_error[i] * p_error[j])
            var_i = p_error[i] * (1 - p_error[i])
            var_j = p_error[j] * (1 - p_error[j])
            
            if var_i > 0 and var_j > 0:
                C_matrix[i, j] = cov / np.sqrt(var_i * var_j)
            else:
                C_matrix[i, j] = 0.0
                
    return C_matrix

if __name__ == "__main__":
    num_qubits = 10
    shots = 50000
    
    # Run the two universes
    std_samples = simulate_standard_model_noise(num_qubits, shots)
    msqecc_samples = simulate_msqecc_entanglement_noise(num_qubits, shots, error_rate=0.05, alpha=0.3)
    
    # Calculate Matrices
    C_std = calculate_correlations_from_samples(std_samples)
    C_msqecc = calculate_correlations_from_samples(msqecc_samples)
    
    # Plotting
    fig, axes = plt.subplots(1, 2, figsize=(12, 5))
    
    im1 = axes[0].imshow(C_std, cmap="viridis", vmin=0, vmax=0.15)
    axes[0].set_title("Standard Model (Local Decoherence)")
    axes[0].set_xlabel("Qubit Index")
    axes[0].set_ylabel("Qubit Index")
    plt.colorbar(im1, ax=axes[0], fraction=0.046, pad=0.04)
    
    im2 = axes[1].imshow(C_msqecc, cmap="viridis", vmin=0, vmax=0.15)
    axes[1].set_title("MSQECC Model (1/r^2 Entanglement Stress)")
    axes[1].set_xlabel("Qubit Index")
    axes[1].set_ylabel("Qubit Index")
    plt.colorbar(im2, ax=axes[1], fraction=0.046, pad=0.04)
    
    plt.suptitle("Phase 2: Expected Quantum Cross-Correlation Matrix Signatures")
    plt.tight_layout()
    plt.savefig("quantum_noise_comparison.png", dpi=200)
    print("Saved theoretical comparison to quantum_noise_comparison.png")
    
    # Extract the decay tail
    distances = []
    corrs = []
    for i in range(num_qubits):
        for j in range(i+1, num_qubits):
            distances.append(np.abs(i - j))
            corrs.append(C_msqecc[i, j])
            
    # Group by distance
    unique_d = np.unique(distances)
    mean_c = [np.mean([corrs[k] for k in range(len(distances)) if distances[k] == d]) for d in unique_d]
    
    plt.figure(figsize=(6, 4))
    plt.plot(unique_d, mean_c, 'ko-', label='MSQECC Simulated Signal')
    
    # Fit 1/D^2 to it to visually confirm
    from scipy.optimize import curve_fit
    def inverse_sq(d, a): return a / (d**2)
    popt, _ = curve_fit(inverse_sq, unique_d, mean_c)
    
    d_smooth = np.linspace(1, max(unique_d), 100)
    plt.plot(d_smooth, inverse_sq(d_smooth, *popt), 'r--', label=r'Theoretical $1/D^2$ Falloff')
    
    plt.title("Spatial Error Correlation vs Qubit Distance")
    plt.xlabel("Distance between Qubits (Grid Units)")
    plt.ylabel("Cross-Correlation Coefficient $C_{ij}$")
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig("quantum_correlation_decay.png", dpi=200)
    print("Saved distance decay plot to quantum_correlation_decay.png")

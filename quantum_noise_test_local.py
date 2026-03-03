"""
Phase 2: Quantum Noise Test (Local Simulation)
This creates the "Standard Model" baseline (Classical Depolarizing Noise).
It demonstrates that standard decoherence in Qiskit produces a "Dark Matrix"
with zero long-range entanglement stress.

We will use the AerSimulator locally, requiring zero cloud authentication.
"""

from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def build_idle_circuit(num_qubits):
    """
    Creates an empty (idle) circuit to measure intrinsic vacuum noise.
    """
    qc = QuantumCircuit(num_qubits)
    # Apply identity-like delay to all qubits
    qc.delay(10, range(num_qubits), unit='us')
    qc.measure_all()
    return qc

def calculate_correlations(result_counts, num_qubits, shots):
    """
    Calculates the spatial cross-correlation matrix of errors.
    """
    p_error = np.zeros(num_qubits)
    p_joint_error = np.zeros((num_qubits, num_qubits))
    
    # Parse bitstrings
    for bitstring, count in result_counts.items():
        bits = [int(b) for b in bitstring[::-1]]
        prob = count / shots
        for i in range(num_qubits):
            if bits[i] == 1:
                p_error[i] += prob
            for j in range(num_qubits):
                if bits[i] == 1 and bits[j] == 1:
                    p_joint_error[i, j] += prob
                    
    C_matrix = np.zeros((num_qubits, num_qubits))
    for i in range(num_qubits):
        for j in range(num_qubits):
            cov = p_joint_error[i, j] - (p_error[i] * p_error[j])
            var_i = p_error[i] * (1 - p_error[i])
            var_j = p_error[j] * (1 - p_error[j])
            
            if var_i > 0 and var_j > 0:
                C_matrix[i, j] = cov / np.sqrt(var_i * var_j)
            else:
                C_matrix[i, j] = 0.0
                
    return C_matrix

if __name__ == "__main__":
    print("Running Local MSQECC Quantum Noise Baseline...")
    
    num_qubits = 10
    shots = 20000
    
    # Define a simple noise model (Depolarizing error) to represent "Standard Model"
    # This creates the "Dark Matrix" (Zero long-range correlation)
    noise_model = NoiseModel()
    error = depolarizing_error(0.05, 1) # 5% error rate per qubit
    noise_model.add_all_qubit_quantum_error(error, ['delay'])
    
    # Use the local simulator
    simulator = AerSimulator(noise_model=noise_model)
    
    # Build and run circuit
    qc = build_idle_circuit(num_qubits)
    transpiled_qc = transpile(qc, simulator)
    
    print("Executing circuit locally...")
    job = simulator.run(transpiled_qc, shots=shots)
    result = job.result()
    counts = result.get_counts()
    
    # Calculate Matrices
    C_std = calculate_correlations(counts, num_qubits, shots)
    
    print("\n=== Observed Covariance Matrix (Standard Model) ===")
    print(np.round(C_std, 3))
    
    # Plotting the baseline
    plt.figure(figsize=(6, 5))
    im = plt.imshow(C_std, cmap="viridis", vmin=0, vmax=0.15)
    plt.title("Standard Model (Local Depolarizing Noise)")
    plt.xlabel("Qubit Index")
    plt.ylabel("Qubit Index")
    plt.colorbar(im)
    
    plt.tight_layout()
    plt.savefig("qiskit_local_baseline.png", dpi=200)
    print("\nSaved classical noise baseline plot to qiskit_local_baseline.png")

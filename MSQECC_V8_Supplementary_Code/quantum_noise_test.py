"""
Phase 2: Quantum Noise Test (Cloud Computing)
Hypothesis: Errors in quantum computers are not purely local; they are correlated via 
entanglement stress. Idle qubits separated by distance r will show error correlations 
scaling as 1/r^2.

Requirements: qiskit, qiskit-ibm-runtime
"""

import numpy as np
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit, transpile
from qiskit_ibm_runtime import QiskitRuntimeService, Estimator, Session
from qiskit.quantum_info import SparsePauliOp
import itertools

# Note: You will need to save your IBM Quantum account token locally or pass it here.
# service = QiskitRuntimeService(channel="ibm_quantum", token="YOUR_IBM_TOKEN")

def build_ghz_and_idle_circuit(num_qubits, idle_duration_us):
    """
    Creates a non-operation (idle) circuit to measure intrinsic vacuum entanglement noise.
    Since we want to measure correlated bitflips/phaseflips between idle qubits.
    """
    qc = QuantumCircuit(num_qubits)
    
    # Initialize all qubits in |0> (done by default)
    # Apply an identity delay to all qubits
    # In Qiskit, we use the `delay` instruction. The unit can be 'dt' or 's', 'us', etc.
    if idle_duration_us > 0:
        qc.delay(idle_duration_us, range(num_qubits), unit='us')
        
    qc.measure_all()
    return qc

def calculate_correlations(result_counts, num_qubits, shots):
    """
    Calculates the spatial cross-correlation matrix of errors.
    Expects state to be |00...0>. A '1' is an error.
    C_ij = <E_i E_j> - <E_i><E_j>
    """
    # Initialize probability arrays
    p_error = np.zeros(num_qubits)
    p_joint_error = np.zeros((num_qubits, num_qubits))
    
    # Parse bitstrings
    for bitstring, count in result_counts.items():
        # bitstring is ordered q_{n-1} ... q_0
        bits = [int(b) for b in bitstring[::-1]]
        
        prob = count / shots
        for i in range(num_qubits):
            if bits[i] == 1:
                p_error[i] += prob
            for j in range(num_qubits):
                if bits[i] == 1 and bits[j] == 1:
                    p_joint_error[i, j] += prob
                    
    # Calculate Covariance / Correlation
    C_matrix = np.zeros((num_qubits, num_qubits))
    for i in range(num_qubits):
        for j in range(num_qubits):
            cov = p_joint_error[i, j] - (p_error[i] * p_error[j])
            
            # Normalize to get Pearson correlation
            var_i = p_error[i] * (1 - p_error[i])
            var_j = p_error[j] * (1 - p_error[j])
            
            if var_i > 0 and var_j > 0:
                C_matrix[i, j] = cov / np.sqrt(var_i * var_j)
            else:
                C_matrix[i, j] = 0.0
                
    return C_matrix

if __name__ == "__main__":
    print("MSQECC Phase 2: Quantum Noise Correlation Test Script")
    print("This script is designed to run on IBM Quantum hardware.")
    print("It measures long-range vacuum error correlations.")
    print("---------------------------------------------------------")
    print("To execute on real hardware, uncomment the IBM Service lines.")
    
    # Example local simulation for demonstration
    from qiskit_aer.noise import NoiseModel, depolarizing_error
    from qiskit_aer import AerSimulator
    
    num_qubits = 5
    shots = 10000
    
    # Build circuit
    qc = build_ghz_and_idle_circuit(num_qubits, idle_duration_us=10)
    
    # Simulate with local depolarizing noise (which is strictly local, no 1/r^2 correlation)
    # The goal on real hardware is to see if correlation > 0 for distant qubits.
    noise_model = NoiseModel()
    error_1q = depolarizing_error(0.05, 1)
    noise_model.add_all_qubit_quantum_error(error_1q, ['delay'])
    
    sim = AerSimulator(noise_model=noise_model)
    transpiled_qc = transpile(qc, sim)
    
    result = sim.run(transpiled_qc, shots=shots).result()
    counts = result.get_counts()
    
    # Calculate Correlation Matrix
    C_matrix = calculate_correlations(counts, num_qubits, shots)
    
    print("\nSimulated Correlation Matrix (Expected to be near 0 for off-diagonals in Standard Model):")
    print(np.round(C_matrix, 3))
    
    # On real hardware, you would map qubit indices i, j to physical distances D(i, j)
    # on the chip topology and fit C(D) ~ 1/D^2.

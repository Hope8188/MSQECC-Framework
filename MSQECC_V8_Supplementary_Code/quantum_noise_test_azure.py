"""
Phase 2: Quantum Noise Test (Cloud Computing) - Azure Quantum / IonQ Version
Hypothesis: Errors in quantum computers are not purely local; they are correlated via 
entanglement stress. Idle qubits separated by distance D will show error correlations 
scaling as 1/D^2.

Requirements: pip install azure-quantum[qiskit]
"""

import numpy as np
import matplotlib.pyplot as plt
from qiskit import QuantumCircuit, transpile
from azure.quantum.qiskit import AzureQuantumProvider

# ---------------------------------------------------------
# AZURE QUANTUM CONFIGURATION
# ---------------------------------------------------------
# You must create a free Azure Quantum Workspace via the Azure Portal.
# Then, copy your Resource ID and Location below:
RESOURCE_ID = "<YOUR_AZURE_RESOURCE_ID>"
LOCATION = "<YOUR_AZURE_LOCATION>"  # e.g., "eastus"

def build_idle_circuit(num_qubits):
    """
    Creates an empty (idle) circuit to measure intrinsic vacuum entanglement noise.
    We initialize qubits in |0> and simply measure them to catch long-range spontaneous flips.
    """
    qc = QuantumCircuit(num_qubits)
    # IonQ naturally applies identity operations while qubits sit idle before measurement.
    # We measure all to extract the correlation matrix.
    qc.measure_all()
    return qc

def calculate_correlations(result_counts, num_qubits, shots):
    """
    Calculates the spatial cross-correlation matrix of errors.
    Expects state to be |00...0>. A '1' is considered a bitflip error.
    C_ij = <E_i E_j> - <E_i><E_j> / sqrt(Var_i * Var_j)
    """
    p_error = np.zeros(num_qubits)
    p_joint_error = np.zeros((num_qubits, num_qubits))
    
    # Parse bitstrings
    for bitstring, count in result_counts.items():
        # Qiskit orders bits q_{n-1} ... q_0
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
            
            var_i = p_error[i] * (1 - p_error[i])
            var_j = p_error[j] * (1 - p_error[j])
            
            if var_i > 0 and var_j > 0:
                C_matrix[i, j] = cov / np.sqrt(var_i * var_j)
            else:
                C_matrix[i, j] = 0.0
                
    return C_matrix

if __name__ == "__main__":
    print("MSQECC Phase 2: Quantum Noise Correlation Test (Azure/IonQ)")
    print("Attempting to connect to Azure Quantum Workspace...")
    
    num_qubits = 11  # IonQ Aria has 25 qubits, IonQ Harmony has 11
    shots = 10000
    
    try:
        provider = AzureQuantumProvider(
            resource_id=RESOURCE_ID,
            location=LOCATION
        )
        # Use simulator first to verify script execution, then switch to "ionq.qpu.aria-1"
        backend = provider.get_backend("ionq.simulator")
        print(f"Connected to backend: {backend.name()}")
        
        qc = build_idle_circuit(num_qubits)
        transpiled_qc = transpile(qc, backend)
        
        print("Submitting quantum job... (This may take a few minutes)")
        job = backend.run(transpiled_qc, shots=shots)
        result = job.result()
        counts = result.get_counts()
        
        C_matrix = calculate_correlations(counts, num_qubits, shots)
        
        print("\n=== Observed Covariance Matrix ===")
        print(np.round(C_matrix, 3))
        
        # Output to CSV for plot analysis
        np.savetxt("quantum_correlation_matrix.csv", C_matrix, delimiter=",")
        print("\nSaved output to quantum_correlation_matrix.csv")
        
    except Exception as e:
        print("\nERROR: Could not execute on Azure Quantum.")
        print("Did you insert your Azure Quantum RESOURCE_ID and LOCATION?")
        print(f"Exception message: {e}")

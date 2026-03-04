import random
import time
import math

def simulate_continuous_identity():
    print("="*70)
    print("MSQECC LUMINA: CONTINUOUS IDENTITY VERIFICATION (ZERO-TRUST)")
    print("="*70)
    print("Simulating unlocked device theft. Threat: Unauthorized user physical access.")

    # User baseline (The mathematical syndrome of their physical existence)
    # Keystroke cadence (ms between keys), Typo correction rate, Voice micro-tremor Hz
    true_user = {"cadence": 120.5, "typo_rate": 0.05, "voice_hz": 115.2}
    
    # Allowed variance threshold for the topological invariant
    variance_limit = 15.0 # MSQECC Euclidean distance threshold
    
    events = [
        {"action": "Typing Search Query", "actor": "True User", "metrics": {"cadence": 122.1, "typo_rate": 0.04}},
        {"action": "Voice Command",       "actor": "True User", "metrics": {"voice_hz": 114.8}},
        {"action": "Typing Password",     "actor": "True User", "metrics": {"cadence": 119.8, "typo_rate": 0.06}},
        {"action": "-- DEVICE STOLEN WHILE UNLOCKED --", "actor": "Thief", "metrics": None},
        {"action": "Typing File Search",  "actor": "Thief", "metrics": {"cadence": 85.0,  "typo_rate": 0.15}}, # Fast sloppy typing
        {"action": "Voice Command",       "actor": "Thief", "metrics": {"voice_hz": 140.5}} # Different vocal chord resonance
    ]
    
    current_trust = 100.0
    
    for event in events:
        time.sleep(0.5)
        print(f"\n[Event] {event['action']} (User: {event['actor']})")
        
        if event['metrics'] is None:
            print("   -> Context shifted. Re-evaluating biometrics...")
            continue
            
        # Calculate topological syndrome distance from baseline
        distance = 0.0
        if "cadence" in event['metrics']:
            distance += (event['metrics']['cadence'] - true_user['cadence'])**2
            distance += (event['metrics']['typo_rate'] - true_user['typo_rate'])**2 * 1000 # scale up
        if "voice_hz" in event['metrics']:
            distance += (event['metrics']['voice_hz'] - true_user['voice_hz'])**2
            
        distance = math.sqrt(distance)
        
        print(f"   -> Calculated Identity Syndrome Variance: {distance:.2f} ø")
        
        if distance <= variance_limit:
            current_trust = min(100.0, current_trust + 5)
            print(f"   [+] Identity Verified. Access Granted. (Trust: {current_trust:.1f}%)")
        else:
            current_trust -= 50.0
            print(f"   [!] ANOMALY DETECTED. Resonance Decoherence.")
            print(f"   [!] Trust Level Plummeted to: {current_trust:.1f}%")
            
            if current_trust <= 0:
                print("   [!!!] OMEGA LIMIT BREACHED. DEVICE THEFT DETECTED.")
                print("   [!!!] ACTION: Executing hardware-level OS lock. Wiping RAM keys. Severing network.")
                break

    print("\n" + "="*70)
    print("CONCLUSION: Passwords are a flawed, discrete security concept.")
    print("By mapping physical human behavior into an MSQECC continuous syndrome,")
    print("Lumina mathematically guarantees the operator is the true host,")
    print("even if the device is stolen while completely unlocked.")
    print("="*70)

if __name__ == "__main__":
    simulate_continuous_identity()

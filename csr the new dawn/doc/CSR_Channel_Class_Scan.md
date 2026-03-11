# CSR Channel-Class Scan

## Result

The momentum-drift door is open.

The conservative-kernel door is still closed.

The supporting audit is in [csr_channel_class_scan.json](output/audit/csr_channel_class_scan.json).

## Tested Classes

### 1. Local Non-Hermitian Damping

Jump operator:

`L = sqrt(gamma) a`

Result:

- `d<x>/dt = -0.4243`
- `d<p>/dt = -0.3394`
- `d<p^2>/dt = -0.7680`

Interpretation:

This class gives real momentum drift. It is ordinary velocity drag.

### 2. Non-Hermitian Translation Kick

Jump operator:

`L = sqrt(gamma) exp(i k x)`

with `k = 0.4` in the dimensionless test.

Result:

- `d<x>/dt ~= 0`
- `d<p>/dt = 0.2400`
- `d<p^2>/dt = 0.2996`

Interpretation:

This class gives a constant momentum kick, not a restoring or conservative radial law.

### 3. Collective Center-of-Mass Damping

Jump operator:

`L = sqrt(gamma) (a1 + a2) / sqrt(2)`

Result:

- `d<P_cm>/dt = -0.2699`
- `d<P_cm^2>/dt = -0.4852`

Interpretation:

This class gives collective drag on the center-of-mass mode.

### 4. Retarded Auxiliary Channel

Model:

- system mode coupled to a damped auxiliary mode
- reduced system dynamics become retarded after bath elimination

Result:

- momentum envelope decay rate about `0.0903`
- no instantaneous kick at `t=0`
- delayed decay of the system momentum over time

Interpretation:

This class gives retarded drag.

## What This Establishes

The previous semiclassical no-go theorem applied to the minimal Hermitian bridge class.

This scan shows that once non-Hermitian, retarded, or collective channels are allowed, `D^dagger(p)` can be nonzero.

So the absolute no-drift barrier is gone.

## What It Does Not Establish

None of the tested representatives yields the object CSR actually needs for galaxy dynamics:

- not a static conservative radial kernel
- not a MOND-like transition law
- not a stationary extra centripetal term compatible with circular-orbit phenomenology

The tested classes produce:

- drag
- kicks
- diffusion
- retarded damping

not a conservative galaxy law.

## Bottom Line

The tested channel classes save CSR from the strongest version of the momentum no-go.

They do not yet save CSR as a galaxy-dynamics theory.

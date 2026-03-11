# DeepSeek CSR Adversarial Prompt

## Role
You are being asked for a hostile technical review and derivation attempt on a constrained research program. Do not pitch. Do not flatter. Do not speculate beyond the stated assumptions.

## Goal
Derive a CSR galaxy law from quotient/measure structure without smuggling MOND by hand.

## Known Facts
- The repo has an internally established anticommuting bridge result.
- The repo has an internally established lattice renormalization result on the `T^3` backbone.
- Multiple local closure families failed externally even when they looked promising on SPARC.
- A scale-invariant template matches the required low-acceleration structure well, but it is explicitly treated only as a constraint template, not as a derived CSR law.
- A derivation-first root-law branch now exists, but it still fails the full structural and external gate.
- Under the current strict reality suite, no model is scientifically live yet.

## Hard Constraints
- No business hype.
- No legal, life, or narrative strategy.
- No hand-wired MOND interpolation function inserted as an answer.
- Separate what is proved, what is assumed, and what is speculative.
- Use typed equations.
- Propose falsifiable local tests.
- Prefer the shortest derivation or the shortest kill path.

## Current Measured Record
- Triple-test targets are:
  - low-acceleration RAR slope in `[0.35, 0.75]`
  - low-acceleration MDAR slope in `[-0.65, -0.25]`
  - BTFR slope in `[3.3, 4.7]`
- Current main external gate is the direct observed 3-galaxy set:
  - aliases: `m33`, `n1560`, `n5533`
  - source: local direct observed `Vobs` plus baryonic decomposition from `galaxy_massmodels.dat`
- Current best template branch:
  - passes the triple test structurally
  - direct observed aggregate `R^2 = 0.8776`
  - direct observed median `R^2 = 0.6709`
  - beats baryons on `2/3` galaxies
  - mean residual lag-1 autocorrelation `0.8273`
  - ablated direct observed aggregate `R^2 = 0.8786`
  - survives shuffled-radius null controls on the direct gate
  - but still does not beat baryons-only clearly under the current effect-size threshold
  - therefore it is not accepted as a live derivation
- Current derivation-first root-law branch:
  - direct observed aggregate `R^2 = 0.8209`
  - direct observed median `R^2 = -6.2341`
  - beats baryons on `3/3` galaxies
  - mean residual lag-1 autocorrelation `0.8891`
  - fails the triple test structurally
- THINGS/Leroy parametric sets are retained only as sensitivity checks:
  - 9-gal sensitivity aggregate for scale-invariant template `R^2 = 0.4170`
  - 9-gal sensitivity aggregate for derivation-first root law `R^2 = 0.1047`
- The local workspace cannot honestly expand the direct observed decomposition-grade main gate beyond three galaxies without new paired radial baryonic profiles.
- The current theorem-level target is explicit:
  - if the deep-IR action density scales as `L_IR ~ |grad(phi)|^q`, then the unique target matching RAR `0.5`, MDAR `-0.5`, flat rotation curves, and BTFR `4` is `q = 3`
  - this target is not yet derived from the `T^3` program

## What You Must Do
1. Give a hostile technical review of the current route.
2. State the weakest hidden assumptions still being made.
3. Propose the minimal operator-measure pair that could force the low-acceleration bend without answer-smuggling.
4. State the smallest derivation that would count as genuine progress.
5. State the shortest falsification path if the route is wrong.

## Questions To Answer
1. What minimal operator-measure pair can force `g = g_bar * nu(g_bar / a_*)` with:
   - `nu(y) -> 1` for `y >> 1`
   - `nu(y) -> y^(-1/2)` for `y << 1`
   and do so without inserting the asymptotics by hand?
2. What assumptions are still hidden in the current quotient/measure program?
3. Which current associations are illegitimate or too fast?
4. What null tests would kill the route quickly?
5. What is the smallest typed derivation that would upgrade CSR from `constraint template` to `genuine progress`?
6. Can the actual `T^3` backbone plausibly force the fixed-point target equivalent to `q = 3`, or does that target require structure not present in the current program?
7. If the route is wrong, what adjacent route is most likely right?

## Required Output Structure
- `Proved facts`
- `Hidden assumptions`
- `Minimal derivation attempt`
- `Fastest falsification path`
- `Alternative route if this fails`
- `Three concrete local tests`

## Ground Rules
- Do not cite unavailable proprietary notes.
- Do not ask for missing business context.
- Do not claim a breakthrough unless you can state the exact theorem-level or derivation-level object that has been achieved.
- If you think the route is dead, say so directly and state why.

## Success Standard
A good answer will either:
- give a typed derivation target that is smaller and cleaner than the current one, or
- show exactly why the current route cannot work under its own assumptions.

# MSQECC Recovery Roadmap

## Core Principle

Getting MSQECC working means one thing only:

- start from the verified `T^3` toric-code backbone,
- derive a real matter-coupling layer,
- and force every step through external data and algebraic obstruction tests.

Nothing else counts.

## What Is Real Right Now

- The SPARC ansatz is empirically nontrivial.
- The standard `T^3` toric code is mathematically real.
- The alpha coincidence survives a first rarity screen.
- The syndrome channel can generate the needed `sigma_z` dephasing, but only for a noncommuting edge coupling.
- The current galaxy ansatz fails a global positive-density interpretation.

## What Must Be Built

1. A code-derived noncommuting matter coupling.
2. A positivity-safe galaxy law or a clear modified-force reinterpretation.
3. A stronger external validation pipeline with strict train-test separation.
4. At least one first-principles derivation that survives an obstruction check.

## Ten 80/20 Reality Tests

### 1. Syndrome-Channel Derivation Test

Question:

- can the `T^3` syndrome-measurement channel derive the stellar-pointer dissipator without hand insertion?

Pass:

- explicit Lindblad term derived from stabilizer measurement and code-matter coupling.

Fail:

- only hand-chosen dissipators work.

### 2. Commuting vs Noncommuting Coupling Test

Question:

- which edge operators can transmit the measured-plaquette backaction into matter?

Current result:

- commuting `Z_edge tensor sigma_z` fails,
- noncommuting `X_edge tensor sigma_z` works.

Next step:

- prove whether the noncommuting coupling is natural in the full `T^3` code.

### 3. Positivity-Enforced Refit Test

Question:

- can the galaxy ansatz still fit well after enforcing `rho_dm >= 0` everywhere?

Pass:

- constrained fit keeps strong predictive power.

Fail:

- positivity collapses the fit or leaves no feasible global branch.

### 4. External Non-SPARC Benchmark Test

Question:

- does the frozen model stay positive on genuinely external baryonic decompositions?

Current result:

- aggregate `R^2` is positive on the independent mass-model sample,
- but median per-galaxy `R^2` is still negative.

Next step:

- rerun after positivity enforcement and alias-resolved de-duplication.

### 5. Alias-Resolved Dataset Audit

Question:

- are any historical external galaxies actually hidden SPARC overlaps under alternate names?

Pass:

- alias resolution leaves a 20+ galaxy truly external sample.

Fail:

- the apparent external signal collapses once the overlap is removed.

### 6. Action-Level Reformulation Test

Question:

- can the galaxy law be written as a physical modified-force or effective-field model instead of a curve-fitting correction?

Pass:

- clear action or effective potential with admissible branch conditions.

Fail:

- no stable physical formulation exists.

### 7. Alpha Obstruction Test

Question:

- can any algebraic obstruction prove that `4*pi^3 + pi^2 + pi` cannot emerge from the `T^3` stabilizer algebra?

Pass for theory:

- no obstruction, and a derivation path survives.

Fail for theory:

- an obstruction kills the alpha route cleanly.

### 8. A0 Redshift Law Test

Question:

- is `a0 proportional H` actually right?

Current result:

- current two-point fit prefers `n approx 10`, not `n = 1`.

Next step:

- build a proper multi-bin literature table before keeping any cosmological claim.

### 9. Morphology-Coupling Test

Question:

- does morphology correspond to a real missing code variable rather than an empirical nuisance factor?

Pass:

- a code observable explains why morphology shifts `C`.

Fail:

- morphology remains purely phenomenological.

### 10. Pre-Registered Kill Test

Question:

- can the programme name a result that would kill it in advance?

Pass:

- a public criterion is stated and obeyed.

Fail:

- the framework keeps absorbing disconfirming results by reinterpretation.

## The Shortest Path Forward

If the goal is to make MSQECC a serious candidate rather than a narrative layer, the order is:

1. derive the noncommuting syndrome channel in the full code language,
2. positivity-enforce or reformulate the galaxy law,
3. rerun the external benchmark on the constrained branch,
4. only then return to alpha, `k = 3*pi`, and the larger TOE claims.

## Bottom Line

MSQECC becomes real only if the code itself starts generating the matter channel, the galaxy law survives positivity, and the frozen model survives external data.

If those three things happen together, the programme becomes serious.

If they do not, the honest residual result is still valuable:

- a galaxy phenomenology programme,
- a code-theoretic mathematical skeleton,
- and a list of exact places where the bridge failed.

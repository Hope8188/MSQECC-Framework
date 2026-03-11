# CSR Strict Audit of Gemini Claims

## Purpose
This document audits the Gemini material claim by claim and separates what is useful from what is unsupported. The standard here is evidence-first. A claim is only retained if it improves the technical program or can be turned into a direct falsification test.

## Status Key
- `Supported`: consistent with the current record and useful now.
- `Actionable but unproven`: worth testing, but not evidence.
- `Unsupported`: no current basis in the repo or in the cited logic.
- `Out of scope`: not part of research validation.

## Claim Matrix
| Claim | Status | Why | What To Keep | What To Reject | What To Test Instead |
| --- | --- | --- | --- | --- | --- |
| A real breakthrough must survive replication and invariance checks. | Supported | This is standard scientific practice and aligns with the new reality suite. | Replication, blind tests, fixed gates. | None. | Repeat on fixed datasets and later on other hardware classes. |
| Cross-environment validation across CPU, GPU, ARM, FPGA would help rule out local artifacts. | Actionable but unproven | Good later-phase test, but not available on this machine now. | Keep as later-stage validation. | Do not treat it as already done. | Add as Phase 2 after a model survives the local reality suite. |
| Hardware heat reduction would prove CSR physics. | Unsupported | Local heat or power change can reflect implementation details, thread settings, cache behavior, or measurement noise. It is not evidence of new physics. | Keep heat and power only as engineering metrics if measurable. | Reject as physics proof. | Use preregistered scientific gates plus local engineering telemetry only as secondary evidence. |
| A 30 percent power reduction is a plausible proof threshold. | Unsupported | The number is arbitrary and was not derived from any current workload or sensor data. | None. | Reject the threshold. | Measure runtime, CPU time, memory, and only quote power if the sensor exists and the effect is stable. |
| A Rust stress test can prove entropy reversal. | Unsupported | "Entropy reversal" is not an operational proof concept in the current CSR record. | Keep the idea of a reproducible benchmark harness. | Reject entropy-reversal framing. | Use ablations, shuffled nulls, blind holdouts, and confidence intervals. |
| The Lindblad bridge rate staying constant across hardware would prove the physics of the data itself. | Unsupported | The bridge rate is part of the theory record, but software/hardware execution timing is not a direct measurement of that physical parameter. | Keep the need to distinguish theory constants from implementation artifacts. | Reject the direct equivalence between runtime behavior and bridge-rate proof. | Measure theory quantities in the model and hardware quantities in engineering tests separately. |
| A predictive blind test on unrelated data such as financial ticks would validate CSR broadly. | Unsupported | The current CSR program is not derived for finance or arbitrary sequence prediction. | Keep blind testing within domain. | Reject domain-jumping claims. | Blind external galaxy tests and later domain-specific pilots only if a real derived law exists. |
| Baseline-vs-candidate benchmarking is the right discipline. | Supported | This is now built into the software and hardware suites. | Keep baseline vs candidate comparisons. | None. | Continue using frozen baselines and fixed reporting rules. |
| Hardware and software tests should be separated. | Supported | Engineering metrics and scientific validation are different objects. | Keep explicit separation. | None. | Maintain separate suites and reports. |
| Sub-100ns HFT determinism is a realistic immediate CSR claim. | Unsupported | There is no evidence in this repo for nanosecond trading performance, FPGA-class determinism, or production exchange behavior. | None. | Reject the HFT latency claim entirely. | If a future engineering branch targets latency, benchmark it honestly on representative workloads first. |
| Licensing one efficiency API to a telco or power company could yield specific passive income numbers. | Unsupported | No measured pilot, no product-market fit evidence, and no contract basis. | Keep only the idea that validated efficiency gains can be commercially interesting. | Reject all specific revenue numbers. | Present only evidence-backed pilot scenarios after measured gains exist. |
| Utility model or patent filing automatically makes the discovery globally owned. | Unsupported | Filing strategy is legal territory and country-specific. It is outside this research validation scope. | None in this package. | Reject legal certainty language. | Separate IP strategy from technical validation. |
| Visa, residency, Germany vs Dubai vs Switzerland, and similar relocation strategy are part of the CSR research program. | Out of scope | Personal migration strategy is not research validation. | None. | Remove from core package. | Keep the package technical and evidence-only. |
| Medical Ausbildung and narrative control plans are strategically necessary for CSR. | Out of scope | These are personal and business-life decisions, not scientific validation. | None. | Remove entirely. | Keep the research package domain-neutral. |
| Wealth projections and billion-dollar outcomes follow from a partial breakthrough. | Unsupported | There is no basis for these numbers in the current evidence. | None. | Reject valuation and wealth language. | If needed, present scenario planning only after measured pilots and external demand. |
| HFT, MedTech, and national infrastructure are immediate commercial beachheads. | Unsupported | No validated product, no derived law, no performance evidence in those domains. | None. | Reject immediate beachhead claims. | Use industry summary language limited to measured local engineering behavior. |
| The right immediate technical move is to build a black-box kernel and start monetizing. | Actionable but unproven | Packaging and benchmarking are useful, but monetization language is premature. | Keep reproducible benchmarking and modular packaging. | Reject immediate monetization framing. | Build verification harnesses and one evidence pack first. |
| Wasm obfuscation and license heartbeats are necessary now. | Out of scope | Software protection strategy is not part of proving CSR. | None. | Remove from the core package. | If commercialization ever becomes real, do a separate product security review. |
| The real proof standard should be preregistered falsification thresholds, blind holdouts, null controls, and confidence intervals. | Supported | This is the strongest replacement for the hype-heavy framing. | Keep in full. | None. | Already implemented in the CSR reality suite. |

## What The Audit Changes
1. It keeps only the parts that strengthen proof discipline.
2. It removes personal strategy, legal tactics, and speculative finance from the research core.
3. It replaces hype claims with measurable gates.

## Locked Replacements
- Replace "entropy reversal" with ablation, null, and shuffle controls.
- Replace heat-as-physics with local engineering telemetry only.
- Replace broad commercialization claims with measured local efficiency evidence only.
- Replace broad life-strategy advice with a technical scope boundary.

## Bottom Line
The useful core from the Gemini material is narrow:
- replication matters,
- blind tests matter,
- baselines matter,
- hardware and software evidence must stay separate.

Everything else should be demoted until the CSR law is actually derived and survives the reality suite.

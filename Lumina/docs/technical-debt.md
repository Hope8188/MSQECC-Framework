# Technical Debt

| ID | Area | Description | Impact | Owner | Next Step |
|---|---|---|---|---|---|
| TD-001 | Benchmarking | A controlled Ollama benchmark harness exists and records first-token/tokens-per-second metrics, but results are far below target on current hardware/runtime. | High | QA | Run 5-run warm/cold benchmark matrices across quantized models and backend option presets; publish p50/p95 in `reports/benchmarks-*.md`. |
| TD-002 | Backend | `src-tauri/src/lib.rs` is smaller, but it still centralizes most native command handlers. | High | Backend | Split AI, native actions, web search, and updater surfaces into dedicated modules. |
| TD-003 | Frontend | `src/App.tsx` is still a large orchestration and rendering file even after extracting the chat composer. | High | Frontend | Extract panel-level components and shared hooks for HUB, VITALS, and SETTINGS. |
| TD-004 | Security | Native file editing, shell execution, and file search commands lack explicit policy tests. | High | Security | Add contract tests and guardrails. |
| TD-005 | Product Consistency | Offline-first messaging conflicts with updater and web-search network features. | Medium | Architect | Decide allowed network surfaces and document policy. |
| TD-006 | Repo Hygiene | Temporary logs and timestamped config files were stored at the workspace root. | Medium | Release | Ignore and purge local diagnostics artifacts. |
| TD-007 | Build Topology | The app still lives under a nested `Lumina/` root inside the outer repo. Packaging is now automated, but the topology remains unusual. | Medium | Architect | Either keep the wrapper script as the contract or flatten the app to the repo root later. |
| TD-008 | Website Quality | Website build is green but still emits a large-chunk warning. | Medium | Frontend | Add smoke tests and split the large JS bundle. |

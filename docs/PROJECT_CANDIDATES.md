# Workspace project shortlist

Reviewed October 4, 2026. This is a source/documentation review of local workspace projects, not a fresh execution or deployment audit of those projects. Portfolio build, lint, and tests were run separately for the Glyphfall/Bricksy update.

## Featured selection

The homepage now lists Gathr, VibeGrid, Murmur, Glyphfall, and Bricksy. Daybreak is removed from the featured list; its existing design-study route remains available. Glyphfall and Bricksy also have full case studies in the archive.

The five make a coherent product collection, but three social products and two games leave backend/data/ML depth less visible. My next homepage addition would be **TradeVoice**. For a research-oriented audience, use **MotionKey Scribe** instead. Avoid turning the homepage into the entire archive.

## Projects not previously in the archive

| Priority | Project and local evidence | What it adds | Boundary to keep explicit |
| --- | --- | --- | --- |
| 1 | **TradeVoice** — `tradology/README.md`, `backend/app/tools/`, `backend/tests/test_tools.py`, `backend/tests/test_worker.py` | Multi-tenant business workflows, server-owned authorization, exact-action confirmations, idempotent writes, queue recovery, and auditability. The strongest next addition for backend/product engineering. | Default voice flow uses deterministic NLU. Live Realtime and carrier audio are not verified; present it as a voice-support control plane, not a deployed voice agent. |
| 2 | **MotionKey Scribe** — `Motionkey/README.md`, `docs/EVALUATION.md`, `services/ml/tests/test_scribe.py` | Personalized gesture recognition, abstention, session-separated evaluation, bounded robot commands, and deterministic cable geometry. Distinctive physical-computing research with unusually candid negative results. | No real phone dataset or physical drawing loop validated. External wrist-IMU evaluation exposes an unsatisfactory recall/false-trigger tradeoff. Label it a research prototype and simulator. |
| 3 | **Kaggriculture / Farmhand** — `Kaggriculture/submission/main.py`, `src/kaggriculture/eval/`, `tests/test_arena.py`, `docs/ROADMAP.md` | Planning under scarce resources, market-aware scheduling, seeded evaluation with alternating seats, and replay diagnostics. A good algorithms/agent case study. | The official farming simulator is external; feature your agent and evaluation lab. Local results against the starter do not establish a competition rank or learned-policy performance. |
| 4 | **Intent Loop** — `Addiction/README.md`, `experiments/profile-s6e8-v002/`, `services/api/`, `tests/test_features.py` | Connects reproducible ML experiments to an append-only event API, point-in-time session derivation, and intervention-outcome data. Actual saved model/OOF artifacts exist. | Kaggle profile prediction is a synthetic bootstrap task. No Android telemetry, trained session-risk policy, clinical validation, or public service. Use the product name Intent Loop rather than implying addiction diagnosis. |
| 5 | **Habit Tracker Social** — `habit-tracker-social/README.md`, `DEPLOYMENT.md`, backend/frontend/mobile source | Broad Java product engineering: habits, streaks, provider ingestion, deduplication, replay protection, and multi-source data reconciliation. | No verified public deployment in the README. Several providers are scaffolds and many optional features are disabled in the launch configuration. It overlaps more with the existing social products. |
| 6 | **Kalshi Prediction Market Analytics** — `kalshi/README.md`, `transform/`, `ml/`, `streaming/`, `api/` | Strong potential data/ML story: maker/taker accounting, zero-sum contracts, temporal evaluation, calibration, and serving boundaries. | The local `reports/` directory contains only `.gitkeep`; `MEASUREMENTS.md` is largely a measurement plan. Capture a reproducible evaluation and runtime proof before promoting performance claims. |
| 7 | **Customer Segmentation Studio** — `customer_segment/README.md`, `artifacts/`, `MEASUREMENTS.md` | A compact, explainable train-to-artifact-to-API workflow with a business-facing interface. Saved model, scaler, feature engineer, catalog, and metadata are present. | Less distinctive than the existing ML entries. Measurement notes flag a v2 schema mismatch; avoid improvement or latency claims until fresh evidence resolves it. |

## Existing archive entries worth promoting

- **ResolveOps:** a good alternative to TradeVoice when the story is human-approved AI support workflows. Current README describes mock inference, deterministic resolution rules, retrieval, and evaluation; preserve that distinction.
- **Enefit Prosumer Forecasting:** strongest existing choice for time-aware forecasting and shared training/serving contracts.
- **Logistics Customer Ops Pipeline:** gives the homepage a data-engineering dimension instead of another social interface.
- **Fraud Detection Platform:** useful for cost-aware ML decisions, calibration, and drift discussions, with its local-project status and offline metrics clearly identified.

The archive already includes those four plus Punchline, Mini Market, Ramble, ClosetDelta, Receipt Scanner, Stockout Prevention, and Instacart, alongside Gathr, VibeGrid, and Murmur. These would be promotions or refreshed case studies, not new additions.

## Keep out of the main selection for now

- **kalshi-cuda:** actual kernels and benchmark scripts exist, but hardware-specific speedup claims need saved, reproducible GPU measurements. Better as a technical note until those are available.
- **Hotel Offer Aggregator:** concrete Temporal/Redis orchestration exercise, but its mock-supplier assessment scope gives it less differentiation than TradeVoice or the existing backend projects.
- Tutorial, crash-course, and specification collections: use as learning material; they do not establish a distinct shipped product on their own.

## Suggested next order

1. Add TradeVoice to the archive and consider it for the sixth homepage slot.
2. Add MotionKey Scribe as an explicitly scoped research case study.
3. Add Farmhand with a replay and a reproducible baseline comparison.
4. Add Intent Loop if the target audience is ML/data engineering.

The follow-up archive update adds all seven recommended candidates: TradeVoice, MotionKey Scribe, Farmhand, Intent Loop, Habit Tracker Social, Kalshi Prediction Market Analytics, and Customer Segmentation Studio. The archive now contains 23 projects. The homepage remains Gathr, VibeGrid, Murmur, Glyphfall, and Bricksy. CUDA kernels, the hotel assessment, and learning collections remain outside the recommended selection.

Public repository links use the configured remotes for TradeVoice, Habit Tracker Social, and Customer Segmentation Studio. MotionKey, Farmhand, Intent Loop, and Kalshi have no configured remote in the inspected workspace and receive no placeholder links. The write-ups distinguish source and saved documentation from freshly executed project verification; the underlying applications were not retrained, deployed, or runtime-audited for this content update.

# Rust Node-API engine integration

This standalone product builds a Rust Node-API 8 native library loaded in Electron's main process. Rust handles bounded source processing, embedding normalization, cosine similarity, and deterministic vector ranking. JavaScript retains application orchestration and provider selection.

An explicitly configured embedding provider can supply vectors through the provider-neutral JavaScript adapter. Rust normalizes and ranks them; it does not generate semantic embeddings or call language models. No provider, credential, paid API, or source upload is enabled. External providers require separate approval for data handling, retention, and cost.

The generated native addon is unpacked from ASAR and is not committed. The renderer never loads native code; the context-isolated preload exposes only read-only engine capability information. Customer apps do not depend on Brightdesk-AI.

Run `npm run native:build`, `npm run rust:fmt`, `npm run rust:test`, and `npm run rust:check`. CI targets Linux, Windows, and macOS; release readiness requires all platform checks to pass.
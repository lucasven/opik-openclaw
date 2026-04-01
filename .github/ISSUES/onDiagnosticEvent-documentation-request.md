---
name: Plugin SDK documentation — `onDiagnosticEvent`
about: Request formal documentation for `onDiagnosticEvent` in the plugin SDK reference
title: "docs: document `onDiagnosticEvent` in plugin SDK reference"
labels: documentation, plugin-sdk
---

## Problem

`onDiagnosticEvent` is exported from `openclaw/plugin-sdk` and is used internally by the official `diagnostics-otel` extension, but it is not documented in the public plugin SDK reference documents (`sdk-overview.md`, `sdk-runtime.md`).

## Context

- `onDiagnosticEvent` is exported from `openclaw/plugin-sdk/index.js` (the main SDK entry point)
- It is typed in the `.d.ts` files
- The `diagnostics-otel` extension uses it internally (`index.js:51662`)
- The `model.usage` diagnostic event type IS documented in `docs/logging.md` under "Diagnostic event catalog"
- Third-party plugins (e.g. `@opik/opik-openclaw`) are using `onDiagnosticEvent` to capture `model.usage` events for cost/token tracking

## What is missing from docs

The following are NOT documented in the plugin SDK docs but ARE part of the SDK:

- `onDiagnosticEvent(listener)` — function signature, return type (unsubscribe fn)
- `emitDiagnosticEvent(event)` — for emitting diagnostic events from a plugin
- `isDiagnosticsEnabled(config)` — for checking if diagnostics are enabled
- `DiagnosticEventPayload` type — the shape of events including `model.usage`

## Suggested docs location

`docs/plugins/sdk-runtime.md` or a new `docs/plugins/sdk-diagnostics.md` page, covering:
1. What diagnostic events are
2. The event catalog (already in `logging.md`, could be cross-referenced)
3. `onDiagnosticEvent` usage example
4. `emitDiagnosticEvent` usage example
5. `isDiagnosticsEnabled` helper

## Workaround note

Until this is documented, plugin authors can find the types in the SDK's `.d.ts` files at `node_modules/openclaw/dist/plugin-sdk/index.d.ts`.

---

*Opened by `@opik/opik-openclaw` fork investigation (2026-04-01)*

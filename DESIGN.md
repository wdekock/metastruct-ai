Here are comprehensive drafts for your **`README.md`** and **`DESIGN.md`** files for `metastruct-ai`. You can save these directly into your repository root to document your new add-on package cleanly.

---

### File 1: `README.md`

```markdown
# @metastruct/ai-copilot

An AI-powered extension and schema generation add-on for the **Metastruct** meta-framework. Powered by Google Gemini.

## Overview

`@metastruct/ai-copilot` acts as a pure, plug-and-play library that takes your existing system manifest and natural language prompts, ensuring that all AI-generated model extensions strictly comply with Metastruct's core specification schemas (`ENTITY_SPEC_SCHEMA.json`, `UI_SPEC_SCHEMA.json`).

## Features

* **Prompt-to-Entity Generation:** Automatically generate fully compliant entity definitions and UI layouts from plain-text descriptions.
* **Schema-Aware Transformations:** Injects strict schema constraints (types, primary keys, required fields, unique constraints) directly into the AI system instructions.
* **Zero Core Bloat:** Designed as an optional, modular add-on package that integrates seamlessly into your Studio UI or backend service without modifying core compiler logic.

## Installation

Add the package to your workspace or project:

```bash
pnpm add @metastruct/ai-copilot @google/genai

```

## Quick Start

```ts
import { generateManifestUpdate } from '@metastruct/ai-copilot';

const updatedManifest = await generateManifestUpdate({
  apiKey: process.env.GEMINI_API_KEY,
  prompt: "Add an Invoice entity with a total amount, issue date, and client relationship.",
  currentManifest: existingManifest
});

console.log(updatedManifest);

```

## License

MIT

```

---

### File 2: `DESIGN.md`

```markdown
# Architecture & Design Specification: Metastruct AI Copilot

## 1. Core Philosophy
The `@metastruct/ai-copilot` package is built on the principle of **modular non-invasive enhancement**. It decouples Large Language Model interactions from the deterministic Metastruct compiler pipeline. 

* **Deterministic Core:** The compiler and core runtime remain strictly rule-based and predictable.
* **Probabilistic Assistant:** The AI layer acts purely as a authoring accelerator, translating natural language into valid, schema-compliant JSON state patches.

---

## 2. System Architecture & Data Flow

```text
[User Prompt] + [Current Manifest State]
                  │
                  ▼
       (@metastruct/ai-copilot)
                  │
                  ▼
    [Gemini API (google-genai)]
      (System Prompt + Schemas)
                  │
                  ▼
     [Strict JSON Schema Output]
                  │
                  ▼
      [Studio UI / State Dispatch]

```

---

## 3. Specification Enforcement

To prevent the LLM from hallucinating invalid field types or structural layouts, the copilot enforces constraints at the API configuration layer:

1. **System Instructions:** Explicitly defines Metastruct entity rules (`string`, `number`, `boolean`, `date`, `object`, `array`, `primary`, `required`, `unique`) and UI view types (`form`, `table`, `card`, `list`).
2. **MIME Type Enforcement:** Configures Gemini to return guaranteed `application/json` responses, minimizing parsing failures.
3. **Immutability:** Operations treat the manifest as an immutable draft, returning a complete, updated payload ready for real-time compilation.

---

## 4. Security & Configuration

* **Client-Side/Runtime Key Injection:** API keys are passed dynamically per request (or via environment variables) ensuring no secrets are hardcoded into the package or repository.
* **Offline Graceful Degradation:** If the API key is absent or the network fails, the core studio and compiler operate entirely offline without throwing critical dependency faults.

```

---

Whenever you're ready to pick this back up and wire it into your Studio UI workspace, just let me know!

```

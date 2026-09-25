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

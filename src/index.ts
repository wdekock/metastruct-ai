import { GoogleGenAI } from '@google/genai';

export interface AICopilotOptions {
  apiKey: string;
  prompt: string;
  currentManifest: any;
}

/**
 * Sends the current system manifest and a natural language prompt to Gemini,
 * instructing it to return an updated, schema-compliant manifest.
 */
export async function generateManifestUpdate({ apiKey, prompt, currentManifest }: AICopilotOptions): Promise<any> {
  if (!apiKey) {
    throw new Error("Gemini API key is required for @metastruct/ai-copilot");
  }

  const ai = new GoogleGenAI({ apiKey });

  // System instruction enforcing strict adherence to Metastruct specs
  const systemInstruction = `
    You are the AI Copilot for Metastruct, an enterprise meta-framework.
    Your job is to modify or extend the provided JSON system manifest based on user prompts.
    You must strictly adhere to Metastruct entity and UI specifications:
    - Entities contain fields with types ('string', 'number', 'boolean', 'date', 'object', 'array') and constraints ('primary', 'required', 'unique').
    - UI views map entities to layouts and component types ('form', 'table', 'card', 'list').
    - You MUST output ONLY valid JSON representing the updated manifest object. Do not include markdown code block backticks if possible, or ensure the output is cleanly parseable.
  `;

  const userContent = `
    Current Manifest:
    ${JSON.stringify(currentManifest, null, 2)}

    User Request:
    ${prompt}

    Return the complete updated manifest JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userContent,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response received from Gemini AI model.");
    }

    return JSON.parse(textOutput);
  } catch (err: any) {
    console.error("Metastruct AI Copilot execution failed:", err);
    throw new Error(`AI Generation failed: ${err.message}`);
  }
}

import axios from "axios";
import { buildHeaderMappingPrompt } from "../../prompts/headerMappingPrompt.js";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

export async function mapHeaders(headers: string[]) {
  const prompt = buildHeaderMappingPrompt(headers);

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Gemini Attempt ${attempt}...`);

      const response = await axios.post(
        `${API_URL}?key=${process.env.GEMINI_API_KEY}`,
        body,
        {
          timeout: 30000,
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      lastError = error;

      console.log(`Gemini failed (Attempt ${attempt})`);

      if (attempt < 3) {
        console.log("Retrying in 2 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }

  console.log("Gemini unavailable. Using fallback mapping.");

const fallback: Record<string, string | null> = {};

headers.forEach((header) => {
  fallback[header] = null;
});

return JSON.stringify(fallback);
}
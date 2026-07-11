import axios from "axios";
import { buildHeaderMappingPrompt } from "../../prompts/headerMappingPrompt.js";

export async function mapHeaders(headers: string[]) {
  const prompt = buildHeaderMappingPrompt(headers);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await axios.post(url, {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  return response.data.candidates[0].content.parts[0].text;
}
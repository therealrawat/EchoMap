import { GoogleGenAI } from '@google/genai';
import type { UserResponse, AnalysisResult } from '../types';

const ASSESSMENT_STAGES = [
  'Daily Life',
  'Descriptive',
  'Opinion',
  'Professional',
  'Abstract'
];

export async function analyzeResponses(
  userResponses: UserResponse[],
  apiKey: string
): Promise<AnalysisResult> {
  apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Analyze these 5 speech transcripts from an English communication assessment. Each transcript corresponds to a different stage: Daily Life, Descriptive, Opinion, Professional, and Abstract.

Transcripts:
${userResponses.map((response, index) =>
    `${ASSESSMENT_STAGES[index]}: ${response.transcript}`
  ).join('\n\n')}

Please provide a JSON response with the following structure:
{
  "scores": {
    "syntax": <number between 0-100>,
    "lexicalRange": <number between 0-100>,
    "fluidity": <number between 0-100>
  },
  "pastMistakes": [
    "<specific mistake 1>",
    "<specific mistake 2>"
  ],
  "roadmap": [
    {
      "day": 1,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    },
    {
      "day": 2,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    },
    {
      "day": 3,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    },
    {
      "day": 4,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    },
    {
      "day": 5,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    },
    {
      "day": 6,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    },
    {
      "day": 7,
      "task": "<15-minute exercise specific to their needs>",
      "whyItMatters": "<brief explanation>"
    }
  ]
}

Focus on identifying specific, actionable patterns. The roadmap should address the identified mistakes and gaps. Return ONLY valid JSON, no markdown formatting.`;

  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || '';

    // Clean the response (remove markdown code blocks if present)
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const analysis: AnalysisResult = JSON.parse(cleanedText);
    console.log('AI Analysis Result:', analysis);
    console.log('Raw AI Response:', text);
    return analysis;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze responses. Please try again.');
  }
}


'use server';
/**
 * @fileOverview An AI agent that extracts key insights (ingredients, steps, cooking tips) from cooking videos.
 *
 * - aiVideoInsightExtraction - A function that handles the video insight extraction process.
 * - AIVideoInsightExtractionInput - The input type for the aiVideoInsightExtraction function.
 * - AIVideoInsightExtractionOutput - The return type for the aiVideoInsightExtraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIVideoInsightExtractionInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A cooking video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z
    .string()
    .optional()
    .describe('An optional text description or context for the cooking video.'),
});
export type AIVideoInsightExtractionInput = z.infer<
  typeof AIVideoInsightExtractionInputSchema
>;

const AIVideoInsightExtractionOutputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of key ingredients identified in the cooking video.'),
  steps: z
    .array(z.string())
    .describe('A list of key cooking steps or instructions from the video.'),
  cookingTips: z
    .array(z.string())
    .describe(
      'A list of related cooking tips or suggestions based on the video content.'
    ),
});
export type AIVideoInsightExtractionOutput = z.infer<
  typeof AIVideoInsightExtractionOutputSchema
>;

export async function aiVideoInsightExtraction(
  input: AIVideoInsightExtractionInput
): Promise<AIVideoInsightExtractionOutput> {
  return aiVideoInsightExtractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiVideoInsightExtractionPrompt',
  input: {schema: AIVideoInsightExtractionInputSchema},
  output: {schema: AIVideoInsightExtractionOutputSchema},
  prompt: `You are an expert culinary assistant. Your task is to analyze the provided cooking video and an optional description to extract key insights.
Identify the main ingredients used, list the cooking steps in chronological order, and provide relevant cooking tips or suggestions.

Video: {{media url=videoDataUri}}
{{#if description}}
Description: {{{description}}}
{{/if}}

Extract the information into the following JSON format:
{
  "ingredients": [],
  "steps": [],
  "cookingTips": []
}`,
});

const aiVideoInsightExtractionFlow = ai.defineFlow(
  {
    name: 'aiVideoInsightExtractionFlow',
    inputSchema: AIVideoInsightExtractionInputSchema,
    outputSchema: AIVideoInsightExtractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

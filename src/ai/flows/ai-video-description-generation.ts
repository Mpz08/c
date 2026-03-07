'use server';
/**
 * @fileOverview An AI agent for generating a descriptive title and summary for cooking videos.
 *
 * - generateVideoDescription - A function that handles the video description generation process.
 * - GenerateVideoDescriptionInput - The input type for the generateVideoDescription function.
 * - GenerateVideoDescriptionOutput - The return type for the generateVideoDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoDescriptionInputSchema = z.object({
  transcript: z
    .string()
    .describe('The transcript of the cooking video.'),
});
export type GenerateVideoDescriptionInput = z.infer<
  typeof GenerateVideoDescriptionInputSchema
>;

const GenerateVideoDescriptionOutputSchema = z.object({
  title: z.string().describe('A descriptive title for the cooking video.'),
  summary: z
    .string()
    .describe('A concise summary of the recipe or cooking process.'),
});
export type GenerateVideoDescriptionOutput = z.infer<
  typeof GenerateVideoDescriptionOutputSchema
>;

export async function generateVideoDescription(
  input: GenerateVideoDescriptionInput
): Promise<GenerateVideoDescriptionOutput> {
  return generateVideoDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoDescriptionPrompt',
  input: {schema: GenerateVideoDescriptionInputSchema},
  output: {schema: GenerateVideoDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in creating engaging content for cooking videos. Your task is to generate a descriptive title and a concise summary for a cooking video based on its transcript. The title should be catchy and informative, and the summary should highlight the main recipe or cooking process, making it easy for viewers to understand what the video is about.

Video Transcript: {{{transcript}}}`,
});

const generateVideoDescriptionFlow = ai.defineFlow(
  {
    name: 'generateVideoDescriptionFlow',
    inputSchema: GenerateVideoDescriptionInputSchema,
    outputSchema: GenerateVideoDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

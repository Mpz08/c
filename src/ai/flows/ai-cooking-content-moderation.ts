'use server';
/**
 * @fileOverview An AI content moderation agent for the FlavorFeed app.
 *
 * - isCookingRelatedVideo - A function that checks if a video is cooking-related based on its metadata.
 * - AICookingContentModerationInput - The input type for the isCookingRelatedVideo function.
 * - AICookingContentModerationOutput - The return type for the isCookingRelatedVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AICookingContentModerationInputSchema = z.object({
  videoTitle: z.string().describe('The title of the video.'),
  videoDescription: z.string().describe('The description of the video.'),
  videoTags: z.array(z.string()).optional().describe('A list of tags associated with the video.'),
});
export type AICookingContentModerationInput = z.infer<typeof AICookingContentModerationInputSchema>;

const AICookingContentModerationOutputSchema = z.object({
  isCookingRelated: z.boolean().describe('True if the video content is related to cooking, false otherwise.'),
  reason: z.string().describe('Explanation for why the video is or is not related to cooking.'),
});
export type AICookingContentModerationOutput = z.infer<typeof AICookingContentModerationOutputSchema>;

export async function isCookingRelatedVideo(input: AICookingContentModerationInput): Promise<AICookingContentModerationOutput> {
  return aiCookingContentModerationFlow(input);
}

const aiCookingContentModerationPrompt = ai.definePrompt({
  name: 'aiCookingContentModerationPrompt',
  input: { schema: AICookingContentModerationInputSchema },
  output: { schema: AICookingContentModerationOutputSchema },
  prompt: `You are an AI assistant for a social media app called FlavorFeed, dedicated to cooking videos. Your task is to review video metadata and determine if the video content is strictly related to cooking.

Consider if the video's primary topic, as described by its title, description, and tags, is about preparing food, recipes, cooking techniques, food presentation, or other directly cooking-related activities. Videos about eating food, food reviews, restaurant visits, or general lifestyle should be considered NOT cooking-related unless they explicitly involve the act of cooking.

Video Title: "{{{videoTitle}}}"
Video Description: "{{{videoDescription}}}"
{{#if videoTags}}
Video Tags: {{{videoTags}}}
{{/if}}

Based on the information above, please determine if this video is related to cooking.
Respond with a JSON object containing two fields: \`isCookingRelated\` (boolean) and \`reason\` (string).`,
});

const aiCookingContentModerationFlow = ai.defineFlow(
  {
    name: 'aiCookingContentModerationFlow',
    inputSchema: AICookingContentModerationInputSchema,
    outputSchema: AICookingContentModerationOutputSchema,
  },
  async (input) => {
    const { output } = await aiCookingContentModerationPrompt(input);
    return output!;
  }
);

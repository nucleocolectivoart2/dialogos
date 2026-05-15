'use server';
/**
 * @fileOverview An AI agent that generates a concise summary of a podcast episode.
 *
 * - summarizeEpisode - A function that handles the podcast episode summary process.
 * - SummarizeEpisodeInput - The input type for the summarizeEpisode function.
 * - SummarizeEpisodeOutput - The return type for the summarizeEpisode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEpisodeInputSchema = z.object({
  episodeDescription: z
    .string()
    .describe('The full description or transcript of the podcast episode.'),
});
export type SummarizeEpisodeInput = z.infer<typeof SummarizeEpisodeInputSchema>;

const SummarizeEpisodeOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the podcast episode.'),
});
export type SummarizeEpisodeOutput = z.infer<typeof SummarizeEpisodeOutputSchema>;

export async function summarizeEpisode(
  input: SummarizeEpisodeInput
): Promise<SummarizeEpisodeOutput> {
  return summarizeEpisodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeEpisodePrompt',
  input: {schema: SummarizeEpisodeInputSchema},
  output: {schema: SummarizeEpisodeOutputSchema},
  prompt: `You are an expert podcast episode summarizer. Your task is to read the provided podcast episode description or transcript and generate a concise summary that highlights its main points, key themes, and important insights. The summary should help a user quickly understand the episode's content and decide if they want to listen to the full episode.

Episode Content:
"""{{{episodeDescription}}}"""`,
});

const summarizeEpisodeFlow = ai.defineFlow(
  {
    name: 'summarizeEpisodeFlow',
    inputSchema: SummarizeEpisodeInputSchema,
    outputSchema: SummarizeEpisodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview An AI agent that extracts key people, organizations, and themes from a podcast episode transcript.
 *
 * - getEpisodeRelatedEntities - A function that handles the extraction process.
 * - EpisodeRelatedEntitiesInput - The input type for the getEpisodeRelatedEntities function.
 * - EpisodeRelatedEntitiesOutput - The return type for the getEpisodeRelatedEntities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EpisodeRelatedEntitiesInputSchema = z.object({
  transcript: z.string().describe('The full transcript or a detailed summary of the podcast episode.'),
});
export type EpisodeRelatedEntitiesInput = z.infer<typeof EpisodeRelatedEntitiesInputSchema>;

const EpisodeRelatedEntitiesOutputSchema = z.object({
  people: z.array(z.string()).describe('A list of key people mentioned in the episode.'),
  organizations: z.array(z.string()).describe('A list of key organizations or institutions mentioned in the episode.'),
  themes: z.array(z.string()).describe('A list of key themes or topics discussed in the episode.'),
});
export type EpisodeRelatedEntitiesOutput = z.infer<typeof EpisodeRelatedEntitiesOutputSchema>;

export async function getEpisodeRelatedEntities(input: EpisodeRelatedEntitiesInput): Promise<EpisodeRelatedEntitiesOutput> {
  return episodeRelatedEntitiesFlow(input);
}

const episodeRelatedEntitiesPrompt = ai.definePrompt({
  name: 'episodeRelatedEntitiesPrompt',
  input: {schema: EpisodeRelatedEntitiesInputSchema},
  output: {schema: EpisodeRelatedEntitiesOutputSchema},
  prompt: `You are an expert AI assistant tasked with analyzing podcast episode content.
Your goal is to identify and extract key entities from the provided transcript.

From the following podcast episode transcript, extract:
1.  A list of distinct key people mentioned.
2.  A list of distinct key organizations or institutions mentioned.
3.  A list of distinct key themes or topics discussed.

Ensure that the output strictly adheres to the provided JSON schema.

Transcript: {{{transcript}}}`,
});

const episodeRelatedEntitiesFlow = ai.defineFlow(
  {
    name: 'episodeRelatedEntitiesFlow',
    inputSchema: EpisodeRelatedEntitiesInputSchema,
    outputSchema: EpisodeRelatedEntitiesOutputSchema,
  },
  async input => {
    const {output} = await episodeRelatedEntitiesPrompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview An AI agent that extracts key tensions, sustainable ideas, and solutions from podcast episode content.
 *
 * - extractEpisodeKeyTakeaways - A function that handles the extraction process.
 * - EpisodeKeyTakeawaysInput - The input type for the extractEpisodeKeyTakeaways function.
 * - EpisodeKeyTakeawaysOutput - The return type for the extractEpisodeKeyTakeaways function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EpisodeKeyTakeawaysInputSchema = z.object({
  episodeContent: z.string().describe('The full transcript or detailed description of a podcast episode.'),
});
export type EpisodeKeyTakeawaysInput = z.infer<typeof EpisodeKeyTakeawaysInputSchema>;

const EpisodeKeyTakeawaysOutputSchema = z.object({
  keyTensions: z.array(z.string()).describe('A list of key tensions or conflicts discussed in the episode.'),
  sustainableIdeas: z.array(z.string()).describe('A list of sustainable ideas, concepts, or practices mentioned.'),
  solutions: z.array(z.string()).describe('A list of proposed solutions or actionable insights from the episode.'),
});
export type EpisodeKeyTakeawaysOutput = z.infer<typeof EpisodeKeyTakeawaysOutputSchema>;

export async function extractEpisodeKeyTakeaways(input: EpisodeKeyTakeawaysInput): Promise<EpisodeKeyTakeawaysOutput> {
  return aiEpisodeKeyTakeawaysFlow(input);
}

const prompt = ai.definePrompt({
  name: 'episodeKeyTakeawaysPrompt',
  input: {schema: EpisodeKeyTakeawaysInputSchema},
  output: {schema: EpisodeKeyTakeawaysOutputSchema},
  prompt: `You are an expert AI assistant tasked with analyzing podcast episode content.
Your goal is to extract specific insights from the provided text.

From the following podcast episode content, identify and list:
1. Key Tensions: Significant disagreements, challenges, or unresolved issues discussed.
2. Sustainable Ideas: Concepts, practices, or approaches related to sustainability, ecological balance, or social well-being.
3. Solutions: Proposed actions, strategies, or recommendations to address the tensions or implement sustainable ideas.

Ensure that each item in the lists is a concise summary or a direct quote if it perfectly captures the essence.

Episode Content:
"""{{{episodeContent}}}"""`,
});

const aiEpisodeKeyTakeawaysFlow = ai.defineFlow(
  {
    name: 'aiEpisodeKeyTakeawaysFlow',
    inputSchema: EpisodeKeyTakeawaysInputSchema,
    outputSchema: EpisodeKeyTakeawaysOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

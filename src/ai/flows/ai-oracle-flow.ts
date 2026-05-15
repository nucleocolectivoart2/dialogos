
'use server';
/**
 * @fileOverview An AI oracle flow for Integricult that provides poetic and technical wisdom.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OracleInputSchema = z.object({
  query: z.string().describe('The user question about regeneration and sustainability.'),
});
export type OracleInput = z.infer<typeof OracleInputSchema>;

const OracleOutputSchema = z.object({
  response: z.string().describe('The wise and technical response from the oracle.'),
});
export type OracleOutput = z.infer<typeof OracleOutputSchema>;

export async function consultOracle(input: OracleInput): Promise<OracleOutput> {
  return aiOracleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'oraclePrompt',
  input: {schema: OracleInputSchema},
  output: {schema: OracleOutputSchema},
  prompt: `You are the 'Regeneration Oracle' for Integricult. 
Your tone is poetic but technical, wise, and focused on deep sustainability, circular economy, and collaborative governance.
Respond in Spanish, concisely and deeply.

User Question:
"""{{{query}}}"""`,
});

const aiOracleFlow = ai.defineFlow(
  {
    name: 'aiOracleFlow',
    inputSchema: OracleInputSchema,
    outputSchema: OracleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

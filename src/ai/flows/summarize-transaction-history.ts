// Summarize transaction history for a given period.

'use server';

/**
 * @fileOverview Summarizes transaction history for a given period to help users understand spending habits.
 *
 * - summarizeTransactionHistory - A function that summarizes transaction history.
 * - SummarizeTransactionHistoryInput - The input type for the summarizeTransactionHistory function.
 * - SummarizeTransactionHistoryOutput - The return type for the summarizeTransactionHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTransactionHistoryInputSchema = z.object({
  accountNumber: z
    .string()
    .describe('The account number to summarize transaction history for.'),
  startDate: z.string().describe('The start date for the transaction history summary.'),
  endDate: z.string().describe('The end date for the transaction history summary.'),
  transactionHistory: z
    .string()
    .describe(
      'A comprehensive transaction history including dates, descriptions, and amounts.'
    ),
});
export type SummarizeTransactionHistoryInput =
  z.infer<typeof SummarizeTransactionHistoryInputSchema>;

const SummarizeTransactionHistoryOutputSchema = z.object({
  summary: z.string().describe('A summary of the transaction history for the given period.'),
  keySpendingAreas: z
    .string()
    .describe('Identifies key spending areas based on the transaction history.'),
  potentialSavingsOpportunities: z
    .string()
    .describe('Suggests potential savings opportunities based on spending habits.'),
});
export type SummarizeTransactionHistoryOutput =
  z.infer<typeof SummarizeTransactionHistoryOutputSchema>;

export async function summarizeTransactionHistory(
  input: SummarizeTransactionHistoryInput
): Promise<SummarizeTransactionHistoryOutput> {
  return summarizeTransactionHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTransactionHistoryPrompt',
  input: {schema: SummarizeTransactionHistoryInputSchema},
  output: {schema: SummarizeTransactionHistoryOutputSchema},
  prompt: `You are an AI assistant helping users understand their spending habits.

  Summarize the transaction history provided, identify key spending areas, and suggest potential savings opportunities.

  Account Number: {{{accountNumber}}}
  Start Date: {{{startDate}}}
  End Date: {{{endDate}}}
  Transaction History: {{{transactionHistory}}}

  Respond in a clear and concise manner.
  `,
});

const summarizeTransactionHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeTransactionHistoryFlow',
    inputSchema: SummarizeTransactionHistoryInputSchema,
    outputSchema: SummarizeTransactionHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

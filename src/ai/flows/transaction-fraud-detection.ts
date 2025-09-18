'use server';

/**
 * @fileOverview An AI agent for detecting fraudulent transactions.
 *
 * - detectFraudulentTransaction - A function that handles the transaction fraud detection process.
 * - DetectFraudulentTransactionInput - The input type for the detectFraudulentTransaction function.
 * - DetectFraudulentTransactionOutput - The return type for the detectFraudulentTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFraudulentTransactionInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe('The transaction history of the user.'),
  accountNumber: z
    .string()
    .describe('The account number of the user.'),
});
export type DetectFraudulentTransactionInput = z.infer<
  typeof DetectFraudulentTransactionInputSchema
>;

const DetectFraudulentTransactionOutputSchema = z.object({
  isFraudulent: z
    .boolean()
    .describe('Whether or not the transaction is fraudulent.'),
  explanation: z.string().describe('The explanation of the fraud detection.'),
});
export type DetectFraudulentTransactionOutput = z.infer<
  typeof DetectFraudulentTransactionOutputSchema
>;

export async function detectFraudulentTransaction(
  input: DetectFraudulentTransactionInput
): Promise<DetectFraudulentTransactionOutput> {
  return detectFraudulentTransactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectFraudulentTransactionPrompt',
  input: {schema: DetectFraudulentTransactionInputSchema},
  output: {schema: DetectFraudulentTransactionOutputSchema},
  prompt: `You are an expert in fraud detection. Analyze the transaction history and determine if there are any potentially fraudulent transactions.

Transaction History: {{{transactionHistory}}}
Account Number: {{{accountNumber}}}

Determine if the transaction is fraudulent and provide an explanation.
`,
});

const detectFraudulentTransactionFlow = ai.defineFlow(
  {
    name: 'detectFraudulentTransactionFlow',
    inputSchema: DetectFraudulentTransactionInputSchema,
    outputSchema: DetectFraudulentTransactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

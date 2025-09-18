"use server";

import { detectFraudulentTransaction } from "@/ai/flows/transaction-fraud-detection";
import type { DetectFraudulentTransactionInput, DetectFraudulentTransactionOutput } from "@/ai/flows/transaction-fraud-detection";

export async function detectFraudulentTransactionAction(
    input: DetectFraudulentTransactionInput
): Promise<DetectFraudulentTransactionOutput> {
    try {
        const result = await detectFraudulentTransaction(input);
        return result;
    } catch (error) {
        console.error("Error in detectFraudulentTransactionAction:", error);
        throw new Error("Failed to perform fraud detection.");
    }
}

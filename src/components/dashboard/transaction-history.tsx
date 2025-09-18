"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import type { Transaction } from "@/lib/data";
import { cn } from '@/lib/utils';
import { detectFraudulentTransactionAction } from '@/app/actions/detect-fraud';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { DetectFraudulentTransactionOutput } from '@/ai/flows/transaction-fraud-detection';


interface TransactionHistoryProps {
  transactions: Transaction[];
  accountNumber: string;
}

export function TransactionHistory({ transactions, accountNumber }: TransactionHistoryProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [fraudResult, setFraudResult] = useState<DetectFraudulentTransactionOutput | null>(null);

    const handleFraudCheck = async () => {
        setIsLoading(true);
        setFraudResult(null);

        const transactionHistoryString = transactions
            .map(t => `${t.date} | ${t.description} | ${t.type === 'debit' ? '-' : '+'}${t.amount.toFixed(2)}`)
            .join('\n');
        
        try {
            const result = await detectFraudulentTransactionAction({
                transactionHistory: transactionHistoryString,
                accountNumber: accountNumber,
            });
            setFraudResult(result);
        } catch (error) {
            console.error("Fraud detection failed:", error);
            setFraudResult({
                isFraudulent: true,
                explanation: "An error occurred while analyzing transactions. Please try again later."
            });
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="secondary" onClick={handleFraudCheck} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            Check for Fraud
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden md:table-cell text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <div className={cn("flex items-center justify-center h-8 w-8 rounded-full", t.type === 'debit' ? 'bg-destructive/10' : 'bg-[hsl(var(--chart-2))]/10')}>
                           {t.type === 'debit' ? <ArrowDown className="h-4 w-4 text-destructive" /> : <ArrowUp className="h-4 w-4 text-[hsl(var(--chart-2))]" />}
                        </div>
                        <div>
                            <p className="font-medium">{t.description}</p>
                            <p className="text-sm text-muted-foreground md:hidden">{new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                      "text-right font-semibold",
                      t.type === 'debit' ? 'text-card-foreground' : 'text-[hsl(var(--chart-2))]'
                  )}>
                    {t.type === 'debit' ? '-' : '+'} RM {t.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right text-muted-foreground">
                    {new Date(t.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!fraudResult} onOpenChange={() => setFraudResult(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
                {fraudResult?.isFraudulent ? <AlertTriangle className="h-6 w-6 text-destructive" /> : <ShieldCheck className="h-6 w-6 text-[hsl(var(--chart-2))]" />}
                Fraud Detection Result
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
              {fraudResult?.explanation}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setFraudResult(null)}>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

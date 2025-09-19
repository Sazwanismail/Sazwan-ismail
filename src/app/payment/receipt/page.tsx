"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Share, Printer, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

function ReceiptContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    const billerCode = searchParams.get('billerCode');
    const ref1 = searchParams.get('ref1');
    const amount = parseFloat(searchParams.get('amount') || '0').toFixed(2);
    const transactionDate = new Date().toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const transactionId = `TXN${Date.now()}`;

    const handleShare = () => {
        toast({
            title: "Receipt Shared",
            description: "The payment receipt has been shared.",
        });
    };
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center justify-center">
             <div className="w-full max-w-md mx-auto">
                <header className="flex items-center justify-start gap-4 mb-8 w-full">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Payment Receipt</h1>
                </header>
                <Card className="w-full">
                    <CardHeader className="items-center text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <CardTitle>Payment Successful</CardTitle>
                        <CardDescription>Your payment has been processed successfully.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center mb-6">
                            <p className="text-sm text-muted-foreground">Total Paid</p>
                            <p className="text-4xl font-bold">RM {amount}</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Biller Code</span>
                                <span className="font-medium">{billerCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Reference-1</span>
                                <span className="font-medium">{ref1}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Transaction ID</span>
                                <span className="font-medium">{transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Date & Time</span>
                                <span className="font-medium">{transactionDate}</span>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-around mt-6 gap-2">
                             <Button variant="outline" onClick={handleShare} className="flex-1">
                                <Share className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                             <Button variant="outline" onClick={handlePrint} className="flex-1">
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                        </div>
                         <Button onClick={() => router.push('/dashboard')} className="w-full mt-4">
                            Done
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default function ReceiptPage() {
    return (
        <Suspense fallback={<div>Loading receipt...</div>}>
            <ReceiptContent />
        </Suspense>
    );
}

"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Share, Repeat, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

function bankNameToDisplayName(name: string | null) {
    if (!name) return 'N/A';
    switch (name.toLowerCase()) {
        case 'cimb': return 'CIMB Bank';
        case 'maybank': return 'Maybank';
        case 'public_bank': return 'Public Bank';
        case 'rhb': return 'RHB Bank';
        case 'hona_leong': return 'Hong Leong Bank';
        case 'other': return 'Other Bank';
        default: return name;
    }
}

function TransferReceiptContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    const amount = parseFloat(searchParams.get('amount') || '0').toFixed(2);
    const recipientName = searchParams.get('recipientName');
    const bank = bankNameToDisplayName(searchParams.get('bank'));
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
            description: "The transfer receipt has been shared.",
        });
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
                    <h1 className="text-2xl font-bold">Transfer Receipt</h1>
                </header>
                <Card className="w-full">
                    <CardHeader className="items-center text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <CardTitle>Transfer Successful</CardTitle>
                        <CardDescription>Your money has been sent successfully.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center mb-6">
                            <p className="text-sm text-muted-foreground">Amount Transferred</p>
                            <p className="text-4xl font-bold">RM {amount}</p>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Recipient</span>
                                <span className="font-medium">{recipientName}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Bank</span>
                                <span className="font-medium">{bank}</span>
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
                        <div className="grid grid-cols-2 gap-2 mt-6">
                             <Button variant="outline" onClick={handleShare}>
                                <Share className="mr-2 h-4 w-4" />
                                Share
                            </Button>
                            <Button variant="outline" onClick={() => router.push('/transfer')}>
                                <Repeat className="mr-2 h-4 w-4" />
                                New Transfer
                            </Button>
                        </div>
                         <Button onClick={() => router.push('/dashboard')} className="w-full mt-2">
                            Done
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function TransferReceiptPage() {
    return (
        <Suspense fallback={<div>Loading receipt...</div>}>
            <TransferReceiptContent />
        </Suspense>
    );
}

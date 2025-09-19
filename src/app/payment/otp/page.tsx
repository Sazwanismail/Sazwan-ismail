"use client";

import { useState, Suspense } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { PinInput } from '@/components/auth/pin-input';
import { userData } from '@/lib/data';

const CORRECT_OTP = "112233";

function OTPSuspenseBoundary() {
    const searchParams = useSearchParams();
    const billerCode = searchParams.get('billerCode');
    const ref1 = searchParams.get('ref1');
    const amount = searchParams.get('amount');

    const { toast } = useToast();
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOtpComplete = (otp: string) => {
        setIsLoading(true);
        setError(null);
        
        setTimeout(() => {
            if (otp === CORRECT_OTP) {
                const params = new URLSearchParams({
                    billerCode: billerCode || '',
                    ref1: ref1 || '',
                    amount: amount || '0',
                });
                router.push(`/payment/receipt?${params.toString()}`);
            } else {
                setError("Incorrect OTP. Please try again.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <header className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/payment">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Confirm Payment</h1>
            </header>
            <main className="flex flex-col items-center">
                <Card className="w-full max-w-sm">
                    <CardHeader className="text-center">
                        <CardTitle>Enter OTP</CardTitle>
                        <CardDescription>
                            An OTP has been sent to your registered mobile number {userData.phone.slice(0, -4)}XXXX.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="w-full p-4 rounded-lg bg-muted/50 text-center">
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="text-3xl font-bold">RM {parseFloat(amount || '0').toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground mt-2">Biller: {billerCode}</p>
                            <p className="text-xs text-muted-foreground">Ref: {ref1}</p>
                        </div>
                        <PinInput 
                            onComplete={handleOtpComplete}
                            error={error}
                            loading={isLoading}
                            pinLength={6}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default function OTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OTPSuspenseBoundary />
        </Suspense>
    );
}

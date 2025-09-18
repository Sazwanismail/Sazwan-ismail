"use client";

import { useState } from 'react';
import { ArrowLeft, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Payment Successful",
                description: "Your bill has been paid successfully.",
            });
            router.push('/dashboard');
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <header className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Make a Payment</h1>
            </header>
            <main>
                <Card>
                    <CardHeader>
                        <CardTitle>Pay a Bill</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="biller-code">Biller Code</Label>
                                <Input id="biller-code" placeholder="e.g., 1010" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="ref-1">Reference-1</Label>
                                <Input id="ref-1" placeholder="Enter your bill account/reference number" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (RM)</Label>
                                <Input id="amount" type="number" placeholder="0.00" required min="0.01" step="0.01" />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                 {isLoading ? 'Paying...' : 'Pay Now'}
                                <Receipt className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

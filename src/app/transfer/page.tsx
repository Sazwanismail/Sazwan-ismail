"use client";

import { useState } from 'react';
import { ArrowLeft, Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function TransferPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [key, setKey] = useState(Date.now());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(event.currentTarget);
        const amount = formData.get('amount') as string;
        const recipientName = formData.get('recipient-name') as string;
        const bank = formData.get('bank') as string;

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            const params = new URLSearchParams({
                amount,
                recipientName,
                bank,
            });
            router.push(`/transfer/receipt?${params.toString()}`);
        }, 1500);
    }

    const handleReset = () => {
        setKey(Date.now());
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <header className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Transfer Money</h1>
            </header>
            <main>
                <Card>
                    <CardHeader>
                        <CardTitle>Send to Recipient</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form key={key} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="bank">Bank</Label>
                                    <Select name="bank" required>
                                        <SelectTrigger id="bank">
                                            <SelectValue placeholder="Select a bank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cimb">CIMB Bank</SelectItem>
                                            <SelectItem value="maybank">Maybank</SelectItem>
                                            <SelectItem value="public_bank">Public Bank</SelectItem>
                                            <SelectItem value="rhb">RHB Bank</SelectItem>
                                            <SelectItem value="hona_leong">Hong Leong Bank</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="recipient-name">Nama</Label>
                                    <Input id="recipient-name" name="recipient-name" placeholder="e.g., John Doe" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="recipient-account">Code transfer</Label>
                                <Input id="recipient-account" name="recipient-account" placeholder="e.g., 123456789012" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Pay or payment transfer</Label>
                                <Input id="amount" name="amount" type="number" placeholder="0.00" required min="0.01" step="0.01" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reference">Reference (Optional)</Label>
                                <Textarea id="reference" name="reference" placeholder="e.g., For dinner" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Transfer Now'}
                                    <Send className="ml-2 h-4 w-4" />
                                </Button>
                                <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={handleReset} disabled={isLoading}>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

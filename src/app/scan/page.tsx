import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function ScanPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <header className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Scan QR Code</h1>
            </header>
            <main>
                <Card>
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>The QR code scanning feature is currently under development.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

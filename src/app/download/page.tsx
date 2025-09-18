import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <header className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Download Statement</h1>
            </header>
            <main>
                <Card>
                    <CardHeader>
                        <CardTitle>Coming Soon</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>The feature to download transaction history as a PDF is currently under development.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

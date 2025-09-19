"use client";

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { userData } from '@/lib/data';

const TngLogo = () => (
    <div className="inline-flex items-center justify-center bg-[#00A3E0] text-white rounded-lg p-2 w-16 h-12">
        <div className="flex flex-col items-center">
            <span className="font-bold text-sm leading-none">Touch 'n GO</span>
            <span className="text-xs leading-none">eWallet</span>
        </div>
    </div>
);


export default function ShowQrPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
            <header className="w-full p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <div className="flex-1 text-center">
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex flex-col items-center justify-center p-4 w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <TngLogo />
                    <h1 className="text-lg font-semibold mt-2">SHA Wallet</h1>
                </div>

                <Card className="w-full">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                        <p className="font-bold text-lg mb-4 uppercase">{userData.accountHolder}</p>
                        <div className="bg-pink-500 p-4 rounded-xl">
                            <Image 
                                src="https://i.imgur.com/5J3o3U8.png"
                                alt="Malaysia National QR Code"
                                width={250}
                                height={250}
                                data-ai-hint="qr code"
                                className="bg-white p-2 rounded-lg"
                            />
                            <p className="text-white font-semibold text-sm mt-2">MALAYSIA NATIONAL QR</p>
                        </div>
                        <p className="text-muted-foreground mt-6 text-sm">
                            Imbas dengan aplikasi perbankan atau eWallet anda untuk pindahan atau bayaran.
                        </p>
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}

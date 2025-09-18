"use client";

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

export default function ScanPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const getCameraPermission = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.error('Camera API not supported in this browser.');
                toast({
                    variant: 'destructive',
                    title: 'Tidak Didukung',
                    description: 'Peramban Anda tidak mendukung akses kamera.',
                });
                setHasCameraPermission(false);
                return;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setHasCameraPermission(true);

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Akses Kamera Ditolak',
                    description: 'Mohon izinkan akses kamera di pengaturan peramban Anda untuk menggunakan fitur ini.',
                });
            }
        };

        getCameraPermission();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
            <header className="w-full p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Pindai Kode QR</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex flex-col items-center justify-center p-4 w-full max-w-md">
                <Card className="w-full">
                    <CardContent className="p-4">
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center relative">
                            <video 
                                ref={videoRef} 
                                className="w-full h-full object-cover" 
                                autoPlay 
                                playsInline 
                                muted
                            />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white p-4">
                                   <p>Kamera tidak tersedia</p>
                                </div>
                            )}
                            {hasCameraPermission === null && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white p-4">
                                   <p>Meminta akses kamera...</p>
                                </div>
                            )}
                            {/* Overlay for QR code scanning area */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 border-4 border-dashed border-white/50 rounded-lg" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {hasCameraPermission === false && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Akses Kamera Diperlukan</AlertTitle>
                        <AlertDescription>
                            Mohon izinkan akses kamera untuk menggunakan fitur ini. Periksa pengaturan peramban Anda.
                        </AlertDescription>
                    </Alert>
                )}
                 <p className="text-muted-foreground mt-4 text-center text-sm">
                    Posisikan kode QR di dalam bingkai untuk memindainya secara otomatis.
                </p>
            </main>
        </div>
    )
}

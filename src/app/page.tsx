"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PinInput } from "@/components/auth/pin-input";
import { Wallet } from "lucide-react";

const CORRECT_PIN = "123456";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePinComplete = (pin: string) => {
    setLoading(true);
    setError(null);
    
    // Simulate network delay for authentication
    setTimeout(() => {
      if (pin === CORRECT_PIN) {
        router.push("/dashboard");
      } else {
        setError("Incorrect PIN. Please try again.");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm rounded-xl bg-card p-8 shadow-lg">
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
             <Wallet className="h-8 w-8 text-primary" />
             <h1 className="text-3xl font-bold text-center font-headline text-card-foreground">
                SHA Wallet
             </h1>
          </div>
          <p className="text-muted-foreground text-center">Welcome back! Please enter your PIN to continue.</p>
        </div>
        <PinInput 
          onComplete={handlePinComplete}
          error={error}
          loading={loading}
          pinLength={6}
        />
      </div>
    </main>
  );
}

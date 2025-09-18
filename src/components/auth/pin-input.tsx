"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface PinInputProps {
  onComplete: (pin: string) => void;
  error?: string | null;
  loading?: boolean;
  pinLength: number;
}

export function PinInput({ onComplete, error, loading, pinLength }: PinInputProps) {
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (error) {
      setPin('');
    }
  }, [error]);

  const handleNumberClick = (num: number) => {
    if (loading) return;
    if (pin.length < pinLength) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === pinLength) {
        onComplete(newPin);
      }
    }
  };

  const handleDeleteClick = () => {
    if (loading) return;
    setPin(pin.slice(0, -1));
  };
  
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 h-8">
        {loading ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
            Array.from({ length: pinLength }).map((_, index) => (
            <div
                key={index}
                className={cn(
                'h-4 w-4 rounded-full transition-all duration-300',
                index < pin.length ? 'bg-primary' : 'bg-muted',
                error && 'bg-destructive animate-shake'
                )}
            />
            ))
        )}
      </div>
      {error && !loading && <p className="text-sm text-destructive min-h-[1.25rem]">{error}</p>}
      {!error && !loading && <div className="min-h-[1.25rem]"/>}
      
      <div className="grid grid-cols-3 gap-4 w-full">
        {numbers.map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="h-16 rounded-full text-2xl font-semibold"
            onClick={() => handleNumberClick(num)}
            disabled={loading}
          >
            {num}
          </Button>
        ))}
        <div /> 
        <Button
            variant="ghost"
            className="h-16 rounded-full text-2xl font-semibold"
            onClick={() => handleNumberClick(0)}
            disabled={loading}
        >
            0
        </Button>
        <Button
          variant="ghost"
          className="h-16 rounded-full"
          onClick={handleDeleteClick}
          disabled={loading || pin.length === 0}
          aria-label="Delete last digit"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

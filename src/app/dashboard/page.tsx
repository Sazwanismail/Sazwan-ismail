import { AccountCard } from "@/components/dashboard/account-card";
import { CredentialCard } from "@/components/dashboard/credential-card";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { userData } from "@/lib/data";
import { Wallet, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Wallet className="h-7 w-7 text-primary" />
                        <h1 className="text-2xl font-bold font-headline">TNG Wallet</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="font-semibold">{userData.accountHolder}</p>
                            <p className="text-sm text-muted-foreground">{userData.accountNumber}</p>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                        <Link href="/">
                                            <LogOut />
                                            <span className="sr-only">Log Out</span>
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Log Out</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8 grid gap-8 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <AccountCard account={userData} />
                    <TransactionHistory transactions={userData.transactions} accountNumber={userData.accountNumber} />
                </div>
                <div className="lg:col-span-1">
                    <CredentialCard credentials={userData.credentials} />
                </div>
            </main>
        </div>
    );
}

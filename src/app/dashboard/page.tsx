import { AccountCard } from "@/components/dashboard/account-card";
import { CredentialCard } from "@/components/dashboard/credential-card";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { userData } from "@/lib/data";
import { Wallet, LogOut, UserCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`;
        }
        return name.substring(0, 2);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b">
                <div className="container mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Wallet className="h-7 w-7 text-primary" />
                        <h1 className="text-2xl font-bold font-headline">SHA Wallet</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <TooltipProvider>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                     <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                        <Link href="/profile">
                                            <Avatar>
                                                <AvatarImage src={`https://i.pravatar.cc/150?u=${userData.accountNumber}`} />
                                                <AvatarFallback>{getInitials(userData.accountHolder)}</AvatarFallback>
                                            </Avatar>
                                            <span className="sr-only">Profile</span>
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Profile</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                     <Button variant="ghost" size="icon" className="rounded-full" asChild>
                                        <Link href="/settings">
                                            <Settings />
                                            <span className="sr-only">Settings</span>
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>Settings</p>
                                </TooltipContent>
                            </Tooltip>
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

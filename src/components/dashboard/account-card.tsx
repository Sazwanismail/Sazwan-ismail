import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Send, FileDown, Receipt } from "lucide-react";
import type { Account } from "@/lib/data";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AccountCardProps {
  account: Omit<Account, 'transactions' | 'credentials'>;
}

export function AccountCard({ account }: AccountCardProps) {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(account.balance);

  const actions = [
    { href: "/transfer", icon: Send, label: "Transfer" },
    { href: "/scan", icon: QrCode, label: "Scan QR" },
    { href: "/payment", icon: Receipt, label: "Pay" },
    { href: "/download", icon: FileDown, label: "Download PDF" },
  ];

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-medium">Balance</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{account.accountHolder} &bull; {account.accountNumber}</p>
          </div>
          <div className="text-4xl font-bold text-primary">{formattedBalance}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <TooltipProvider>
            {actions.map((action) => (
              <Tooltip key={action.label}>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="flex flex-col h-24 w-full" asChild>
                    <Link href={action.href}>
                      <action.icon className="h-8 w-8 text-primary" />
                      <span className="mt-2 text-sm font-semibold">{action.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical } from "lucide-react";
import type { Account } from "@/lib/data";

interface AccountCardProps {
  account: Omit<Account, 'transactions' | 'credentials'>;
}

export function AccountCard({ account }: AccountCardProps) {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(account.balance);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Balance</CardTitle>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Options</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary">{formattedBalance}</div>
        <p className="text-sm text-muted-foreground mt-1">{account.accountHolder} &bull; {account.accountNumber}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Link Another Account
        </Button>
      </CardFooter>
    </Card>
  );
}

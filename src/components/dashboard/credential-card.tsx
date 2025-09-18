import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, BadgePlus } from "lucide-react";
import type { Credential } from "@/lib/data";

interface CredentialCardProps {
  credentials: Credential[];
}

export function CredentialCard({ credentials }: CredentialCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Digital Credentials</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {credentials.map((cred) => (
          <div key={cred.id} className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50">
            <div className="bg-muted p-3 rounded-md">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">{cred.name}</p>
              <p className="text-sm text-muted-foreground">{cred.issuer}</p>
            </div>
          </div>
        ))}
        <Button variant="secondary" className="w-full">
            <BadgePlus className="mr-2 h-4 w-4" />
            Add Credential
        </Button>
      </CardContent>
    </Card>
  );
}

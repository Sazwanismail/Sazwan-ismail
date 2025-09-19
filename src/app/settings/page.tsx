import { ArrowLeft, Bell, ChevronRight, CreditCard, Lock, User, Palette, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SettingsItem = ({ icon, title, description, href, hasSwitch }: { icon: React.ElementType, title: string, description: string, href?: string, hasSwitch?: boolean }) => {
    const content = (
        <div className="flex items-center gap-4">
            <div className="bg-muted p-3 rounded-lg">
                {React.createElement(icon, { className: "h-6 w-6 text-muted-foreground" })}
            </div>
            <div className="flex-1">
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {hasSwitch ? <Switch /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block transition-colors hover:bg-accent/50 p-4 rounded-lg -m-4">
                {content}
            </Link>
        );
    }

    return (
        <div className="p-4 flex items-center justify-between">
           {content}
        </div>
    )
};


export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                 <div className="container mx-auto flex items-center gap-4 p-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>Manage your account and notification settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <SettingsItem 
                                icon={User} 
                                title="Profile" 
                                description="View and edit your personal details" 
                                href="/profile" 
                            />
                             <Separator />
                             <SettingsItem 
                                icon={Bell} 
                                title="Push Notifications" 
                                description="Enable or disable push notifications"
                                hasSwitch 
                            />
                             <Separator />
                             <SettingsItem 
                                icon={Palette}
                                title="Appearance"
                                description="Customize the look and feel (coming soon)"
                             />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Security & Privacy</CardTitle>
                            <CardDescription>Manage your security and privacy settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <SettingsItem 
                                icon={Lock} 
                                title="Change PIN" 
                                description="Update your 6-digit access PIN"
                                href="#"
                            />
                             <Separator />
                             <SettingsItem 
                                icon={CreditCard} 
                                title="Payment Methods" 
                                description="Manage your linked cards and banks"
                                href="#"
                            />
                            <Separator />
                             <SettingsItem 
                                icon={FileText} 
                                title="Privacy Policy" 
                                description="Read our privacy policy"
                                href="/privacy-policy"
                            />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userData } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`;
        }
        return name.substring(0, 2);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
             <header className="w-full p-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Profil</h1>
                <Button variant="ghost" size="icon">
                    <Edit />
                    <span className="sr-only">Edit Profile</span>
                </Button>
            </header>
            <main className="p-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4">
                             <Avatar className="h-24 w-24">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${userData.accountNumber}`} />
                                <AvatarFallback className="text-3xl">{getInitials(userData.accountHolder)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{userData.accountHolder}</p>
                                <p className="text-muted-foreground">Joined July 2024</p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Nomor Akun</span>
                                <span className="font-semibold">{userData.accountNumber}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Email</span>
                                <span className="font-semibold">{userData.email}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Telepon</span>
                                <span className="font-semibold">{userData.phone}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-muted-foreground">Alamat</span>
                                <span className="font-semibold text-right max-w-[70%]">{userData.address}</span>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Nomor IC</span>
                                <span className="font-semibold">{userData.icNumber}</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

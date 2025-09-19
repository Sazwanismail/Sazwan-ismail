import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                 <div className="container mx-auto flex items-center gap-4 p-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/settings">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Privacy Policy</h1>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>TNG Wallet Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[60vh] pr-4">
                            <div className="space-y-4 text-sm text-muted-foreground">
                                <p><strong>Last Updated: July 31, 2024</strong></p>
                                
                                <p>Welcome to TNG Wallet ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

                                <h3 className="font-bold text-card-foreground">1. Information We Collect</h3>
                                <p>We may collect information about you in a variety of ways. The information we may collect via the Application includes:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Application.</li>
                                    <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Application.</li>
                                     <li><strong>Transaction Data:</strong> We collect details about your transactions, including date, time, amount, and recipient/sender information.</li>
                                </ul>

                                <h3 className="font-bold text-card-foreground">2. Use of Your Information</h3>
                                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Create and manage your account.</li>
                                    <li>Process your transactions and send you related information, including purchase confirmations and receipts.</li>
                                    <li>Email you regarding your account or order.</li>
                                    <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
                                    <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                                </ul>

                                <h3 className="font-bold text-card-foreground">3. Disclosure of Your Information</h3>
                                <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                                    <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                                </ul>

                                <h3 className="font-bold text-card-foreground">4. Security of Your Information</h3>
                                <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                                <h3 className="font-bold text-card-foreground">5. Contact Us</h3>
                                <p>If you have questions or comments about this Privacy Policy, please contact us at: privacy@tngwallet.example.com</p>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

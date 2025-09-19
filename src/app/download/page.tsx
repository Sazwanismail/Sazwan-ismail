"use client"

import { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function DownloadPage() {
    const { toast } = useToast();
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(2024, 6, 20),
      to: addDays(new Date(2024, 6, 20), 10),
    });

    const handleDownload = () => {
        toast({
            title: "Download Started",
            description: "Your transaction history PDF is being generated.",
        })
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4">
            <header className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Download Statement</h1>
            </header>
            <main>
                <Card>
                    <CardHeader>
                        <CardTitle>Generate PDF Statement</CardTitle>
                        <CardDescription>Select a date range to download your transaction history.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                             <Label htmlFor="date-range">Date range</Label>
                            <div className={cn("grid gap-2")}>
                               <Popover>
                                 <PopoverTrigger asChild>
                                   <Button
                                     id="date-range"
                                     variant={"outline"}
                                     className={cn(
                                       "w-full justify-start text-left font-normal",
                                       !date && "text-muted-foreground"
                                     )}
                                   >
                                     <CalendarIcon className="mr-2 h-4 w-4" />
                                     {date?.from ? (
                                       date.to ? (
                                         <>
                                           {format(date.from, "LLL dd, y")} -{" "}
                                           {format(date.to, "LLL dd, y")}
                                         </>
                                       ) : (
                                         format(date.from, "LLL dd, y")
                                       )
                                     ) : (
                                       <span>Pick a date</span>
                                     )}
                                   </Button>
                                 </PopoverTrigger>
                                 <PopoverContent className="w-auto p-0" align="start">
                                   <Calendar
                                     initialFocus
                                     mode="range"
                                     defaultMonth={date?.from}
                                     selected={date}
                                     onSelect={setDate}
                                     numberOfMonths={2}
                                   />
                                 </PopoverContent>
                               </Popover>
                             </div>
                        </div>
                        <Button className="w-full" onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

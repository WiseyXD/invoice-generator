import { validateRequest } from '@/actions/validateRequests';
import NewNavbar from '@/components/Navabar';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from '@/providers/SessionProvider';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextUIProvider } from '@nextui-org/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SCEMask',
    description: 'Developed by WiseyXD',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sessionData = await validateRequest();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider value={sessionData}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NextUIProvider>
                            <NewNavbar />
                            {children}

                            <Toaster />
                        </NextUIProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}

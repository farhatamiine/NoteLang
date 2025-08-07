import type {Metadata} from "next";
import {Geist} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./styles/globals.css";
import React from "react";
import {DEFAULT_URL} from "@/lib/const";
import Providers from "@/components/Providers";
import InstallPWAButton from "@/components/InstallPWAButton";

export const metadata: Metadata = {
    metadataBase: new URL(DEFAULT_URL),
    title: "NoteLang",
    description: "App to learn languages",
    manifest: "/manifest.json",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    display: "swap",
    subsets: ["latin"],
});
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.className} antialiased min-h-screen bg-background`}>
        <Providers>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <InstallPWAButton/>
            </ThemeProvider>
        </Providers>
        </body>
        </html>
    );
}

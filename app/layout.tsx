import type {Metadata} from "next";
import {Nunito} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./styles/globals.css";
import {ReactNode} from "react";
import {DEFAULT_URL} from "@/lib/const";
import ClientProviders from "@/components/shared/ClientProviders";
import AuthProvider from "@/components/shared/AuthProvider";


export const metadata: Metadata = {
    metadataBase: new URL(DEFAULT_URL),
    title: {
        default: "Wordy - Learn Languages with Smart Notes",
        template: "%s | Wordy",
    },
    manifest: "/manifest.json",
    description:
        "Wordy helps you learn languages with AI-generated examples, spaced repetition, and clean note organization. Built for mobile-first PWA experience.",
    applicationName: "Wordy",
    keywords: [
        "language learning",
        "notes",
        "AI flashcards",
        "PWA",
        "Duolingo alternative",
        "spaced repetition",
    ],
    authors: [{name: "Amine Farhat"}],
    creator: "Amine Farhat",
    openGraph: {
        type: "website",
        url: DEFAULT_URL,
        title: "Wordy - Learn Languages with Smart Notes",
        description:
            "Mobile-first PWA to learn languages with AI examples, notes, and flashcards.",
        siteName: "Wordy",
    },
    twitter: {
        card: "summary_large_image",
        title: "Wordy - Learn Languages with Smart Notes",
        description:
            "Learn languages with AI-powered examples, notes, and spaced repetition.",
        creator: "@your_twitter_handle",
    },
    icons: {
        icon: "/icons/icon-192.png",
        apple: "/icons/icon-512.png",
    },
};

const nunitoSans = Nunito({
    weight: ["400", "500", "600", "700"],
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${nunitoSans.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <ClientProviders>
                <AuthProvider>
                    {children}
                </AuthProvider>

            </ClientProviders>
        </ThemeProvider>
        </body>
        </html>
    );
}

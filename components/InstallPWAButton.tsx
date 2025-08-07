'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Make sure shadcn is installed and configured

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    prompt(): Promise<void>;
}

export default function InstallPWAButton() {
    const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setPromptEvent(e as BeforeInstallPromptEvent);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const installApp = () => {
        if (!promptEvent) return;
        promptEvent.prompt();
        promptEvent.userChoice.finally(() => setPromptEvent(null));
    };

    if (!promptEvent) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button onClick={installApp}>📲 Install NoteLang</Button>
        </div>
    );
}

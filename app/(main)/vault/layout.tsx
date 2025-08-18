import {ReactNode} from "react";

export default function VaultLayout({children,}: { children: ReactNode }) {
    return (
        <main className="min-h-screen flex flex-col items-center">
            Vault Layout
            {children}
        </main>
    );
}

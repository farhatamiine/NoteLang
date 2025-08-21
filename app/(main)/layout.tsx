import {ReactNode} from "react";
import {RequireAuth} from "@/components/shared/RequireAuth";


export default function MainLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <RequireAuth>
            {children}
        </RequireAuth>
    );
}

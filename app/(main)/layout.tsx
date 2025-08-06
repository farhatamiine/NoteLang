import {MobileLayout} from "@/components/MobileLayout";
import {ReactNode} from "react";


export default function MainLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <MobileLayout>
            {children}
        </MobileLayout>
    );
}

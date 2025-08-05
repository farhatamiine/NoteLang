import {ReactNode} from "react";


export default function HomeLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <main className="min-h-screen flex flex-col items-center">

            {children}
        </main>
    );
}

import {ReactNode} from "react";


export default function OnBoardingLayout({
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

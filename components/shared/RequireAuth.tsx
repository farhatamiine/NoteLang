"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useAuthStore} from "@/lib/stores/use-auth-store";

type Props = {
    children: React.ReactNode;
};

export const RequireAuth = ({children}: Props) => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const [hasChecked, setHasChecked] = useState(false);

    // Wait until Zustand hydration is complete
    useEffect(() => {
        if (user !== null) {
            setHasChecked(true);
        }
    }, [user]);

    useEffect(() => {
        if (hasChecked && !user) {
            router.replace("/auth/login");
        }
    }, [hasChecked, user, router]);

    if (!hasChecked || !user) return null;

    return <>{children}</>;
};

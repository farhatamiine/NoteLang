// app/auth-bootstrap.tsx
"use client";
import { useEffect } from "react";
import {useAuthStore} from "@/lib/stores/useAuthStore";


export default function AuthBootstrap() {
    const init = useAuthStore((s) => s.init);

    useEffect(() => {
        init();
    }, [init]);

    return null; // no UI
}

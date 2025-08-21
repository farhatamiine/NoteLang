'use client'
import React, {ReactNode, useEffect} from 'react';
import {createClient} from "@/lib/supabase/client";
import {useAuthStore} from "@/lib/stores/use-auth-store";

const AuthProvider = ({children}: { children: ReactNode }) => {
    const supabase = createClient();
    const setUser = useAuthStore((s) => s.setUser);
    useEffect(() => {
        const init = async () => {
            const {data} = await supabase.auth.getUser();
            setUser(data.user ?? null);
        };
        init();

        // keep Zustand in sync with Supabase auth changes
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [setUser, supabase]);
    return (
        <>
            {children}
        </>
    );
};

export default AuthProvider;
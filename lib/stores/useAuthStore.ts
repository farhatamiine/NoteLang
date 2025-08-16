import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";


type Profile = {
    nativeLanguage: string;
    targetLanguage: string;
};

type AuthState = {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    error?: string;
    init: () => Promise<void>;
    signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    profile: null,
    loading: true,

    init: async () => {
        set({ loading: true, error: undefined });

        const supabase = createClient();
        // 1) get current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            set({ error: error.message, loading: false });
            return;
        }

        const user = session?.user ?? null;
        set({ user, loading: false });

        if (user) {
            // fetch profile via HTTP
            const res = await fetch("/api/profile");
            if (res.ok) {
                const profile = await res.json();
                set({ profile });
            }
        }

        // 2) subscribe to auth state changes
        supabase.auth.onAuthStateChange(async (_event, session) => {
            const user = session?.user ?? null;
            set({ user });

            if (user) {
                const res = await fetch("/api/profile");
                if (res.ok) {
                    const profile = await res.json();
                    set({ profile });
                } else {
                    set({ profile: null });
                }
            } else {
                set({ profile: null });
            }
        });
    },

    signOut: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ user: null });
    },
}));

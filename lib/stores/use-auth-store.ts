import {create} from "zustand";
import type {User} from "@supabase/supabase-js";

import {devtools} from 'zustand/middleware'

type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void;
};


export const useAuthStore = create<AuthState>()(devtools(
    (set) => ({
        user: null,
        setUser: (user) => set({user}),

    })));
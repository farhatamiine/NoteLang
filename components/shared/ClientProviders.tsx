'use client'

import React, {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const ClientProviders = ({children}: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
                gcTime: 1000 * 60 * 30,   // 30 minutes
                refetchOnWindowFocus: false,
                retry: (failureCount, error: unknown) => {
                    if ((error as { status?: number })?.status === 404) return false
                    return failureCount < 2
                }
            }
        }
    }))
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default ClientProviders;
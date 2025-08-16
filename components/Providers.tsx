"use client"

import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import AuthBootstrap from "@/components/AuthBootstrap";


const queryClient = new QueryClient()

const Providers = ({children}: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <AuthBootstrap/>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;
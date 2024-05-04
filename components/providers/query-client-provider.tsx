"use client";

import {
    QueryClient,
    QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";


export const QueryClientProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <TanStackQueryClientProvider client={queryClient}>
            { children }
        </TanStackQueryClientProvider>
    );
};
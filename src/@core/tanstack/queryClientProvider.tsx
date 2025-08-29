import {QueryClient ,QueryClientProvider} from "@tanstack/react-query"
import React,{ReactNode} from "react";
import {persistQueryClient} from "@tanstack/react-query-persist-client"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

interface QueryProps {
    children: ReactNode
}

export default function QueryProvider ( {children} : QueryProps) {
    const localStorgePersister = createAsyncStoragePersister({
        storage: window.localStorage
    })

    const queryClient: any = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
                retryDelay: 1000,
                staleTime: 5 * 60 * 1000,
                gcTime: 5 * 60 * 1000
            }
        }
    })
    persistQueryClient({
        queryClient,
        persister: localStorgePersister
    })
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
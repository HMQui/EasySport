// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import axiosAuth from "@/lib/axiosAuth";
import axiosPublic from "@/lib/axiosPublic";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type ClientType = "auth" | "public";

export function useFetch<T = unknown>(
    url: string,
    client: ClientType = "public",
    config?: AxiosRequestConfig
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const axiosInstance = client === "auth" ? axiosAuth : axiosPublic;

        setLoading(true);
        axiosInstance
            .get<T>(url, config)
            .then((res: AxiosResponse<T>) => {
                if (isMounted) setData(res.data);
            })
            .catch((err: AxiosError) => {
                if (isMounted) {
                    const errorMessage =
                        (err.response?.data &&
                        typeof err.response.data === "object" &&
                        "message" in err.response.data
                            ? (err.response.data as { message?: string }).message
                            : undefined) || err.message;
                    setError(errorMessage);
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [url, client, config]);

    return { data, loading, error };
}

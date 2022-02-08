import React, { useCallback } from 'react'
import useIsLoadingProgressBar from './useIsLoadingProgressBar';

export default function useApiCall<T = any>(callback: (...args: any[]) => Promise<T>): (...args: any[]) => Promise<T> {
    const { setIsLoading } = useIsLoadingProgressBar();

    return async (...args: any[]) => {
        setIsLoading(true);
        const data = await callback(...args);
        setIsLoading(false);
        return data;
    }
}
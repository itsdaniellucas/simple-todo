import React, { useContext } from 'react'
import { ProgressBarContext } from '../providers/ProgressBarProvider'

export default () => {
    const { loading, setLoading } = useContext(ProgressBarContext);

    const setIsLoading = (status: boolean) => {
        if(setLoading) {
            setLoading(status);
        }
    }

    return {
        isLoading: loading,
        setIsLoading,
    }
}
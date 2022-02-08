import React, { useState } from 'react';

export interface IProgressBarContext {
    loading: boolean;
    setLoading?: (status: boolean) => void;
}

const defaultValue: IProgressBarContext = {
    loading: false,
}

export const ProgressBarContext = React.createContext<IProgressBarContext>(defaultValue);


export const ProgressBarProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);

    const providerValue: IProgressBarContext = {
        loading: loading,
        setLoading: setLoading,
    }

    return (
        <ProgressBarContext.Provider value={providerValue}>
            {children}
        </ProgressBarContext.Provider>
    );
};
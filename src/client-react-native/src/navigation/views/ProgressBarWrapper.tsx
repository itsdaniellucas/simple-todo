import React from "react";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import useIsLoadingProgressBar from "../../hooks/useIsLoadingProgressBar"

export default ({ children }: any) => {
    const { isLoading } = useIsLoadingProgressBar();
    
    return (
        <>
            { isLoading ? <LinearProgress color="orange" /> : null}
            {children}
        </>
    )
}

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LoginStackRoute from './src/navigation/routes/LoginStackRoute';
import { ProgressBarProvider } from './src/providers/ProgressBarProvider';


const App = () => {
    StatusBar.setBackgroundColor('#000');
    StatusBar.setBarStyle('light-content');

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1}}>
                <ProgressBarProvider>
                    <StatusBar translucent />
                    <NavigationContainer>
                        <LoginStackRoute />
                    </NavigationContainer>
                </ProgressBarProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;

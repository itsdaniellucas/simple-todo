import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import TabRoute from './TabRoute';
import LoginScreen from '../views/LoginScreen';
import { colors } from '../../constants';


const options: StackNavigationOptions = {
    title: 'Todo Login',
    headerStyle: {
        backgroundColor: colors.blue
    },
    headerTintColor: colors.white,
}

const Login = createStackNavigator();


export default () => {
    return (
        <Login.Navigator mode="modal">
            <Login.Screen name="Todo Login" component={LoginScreen} options={options} />
            <Login.Screen name="Main" component={TabRoute} options={{ headerShown: false }} />
        </Login.Navigator>
    )
}
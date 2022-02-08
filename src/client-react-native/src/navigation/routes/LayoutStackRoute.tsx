import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import TodoStackRoute from './TodoStackRoute';
import ModalScreen from '../views/ModalScreen';
import { colors } from '../../constants';

const options: StackNavigationOptions = {
    title: 'Add Todo',
    headerStyle: {
        backgroundColor: colors.blue
    },
    headerTintColor: colors.white,
}


const Layout = createStackNavigator();

export default () => {
    return (
        <Layout.Navigator mode="modal">
            <Layout.Screen name="Todo Stack" component={TodoStackRoute} options={{ headerShown: false }} />
            <Layout.Screen name="Modal" component={ModalScreen} options={options} />
        </Layout.Navigator>
    )
}
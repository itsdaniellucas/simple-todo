import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import LayoutStackRoute from './LayoutStackRoute';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { IconType } from '../../types/props';
import StatsStackRoute from './StatsStackRoute';

const Tab = createMaterialBottomTabNavigator();

const todoIconProps: IconType = {
    name: 'playlist-add-check',
    size: 25,
}

const statsIconProps: IconType = {
    name: 'leaderboard',
    size: todoIconProps.size,
}

export default () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Todo" component={LayoutStackRoute} options={{ tabBarIcon: ({ color }) => (<Icon name={todoIconProps.name} size={todoIconProps.size} color={color} />) }} />
            <Tab.Screen name="Stats" component={StatsStackRoute} options={{ tabBarIcon: ({ color }) => (<Icon name={statsIconProps.name} size={statsIconProps.size} color={color} />) }} />
        </Tab.Navigator>
    )
}
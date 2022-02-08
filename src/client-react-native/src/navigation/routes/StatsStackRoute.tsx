import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import StatsScreen from '../views/StatsScreen';
import { colors } from '../../constants';
import { IconType, TodoStatsScreenPropsType } from '../../types/props';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoutIconProps: IconType = {
    name: 'logout',
    size: 25,
    color: colors.white,
}

const Stat = createStackNavigator();

const options: StackNavigationOptions = {
    title: 'Todo Stats',
    headerStyle: {
        backgroundColor: colors.blue
    },
    headerTintColor: colors.white,
}

export default ({ navigation }: TodoStatsScreenPropsType) => {
    const onLogoutPress = async () => {
        navigation.navigate('Todo Login');
        await AsyncStorage.removeItem('@token');
    };

    const logoutIcon = <Icon style={{ marginRight: 10 }}
                            name={logoutIconProps.name}
                            size={logoutIconProps.size}
                            color={logoutIconProps.color}
                            onPress={onLogoutPress} 
                        />;

    return (
        <Stat.Navigator>
            <Stat.Screen name="TodoStats" component={StatsScreen} options={{ ...options, headerLeft: () => null, headerRight: () => logoutIcon }} />
        </Stat.Navigator>
    )
}
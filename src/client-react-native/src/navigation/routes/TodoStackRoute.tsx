import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import TodoItemScreen from '../views/TodoItemScreen';
import TodoSectionScreen from '../views/TodoSectionScreen';
import { colors } from '../../constants';
import { IconType, MainScreenPropsType } from '../../types/props';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoutIconProps: IconType = {
    name: 'logout',
    size: 25,
    color: colors.white,
}

const Todo = createStackNavigator();

const options: StackNavigationOptions = {
    title: 'Todo',
    headerStyle: {
        backgroundColor: colors.blue
    },
    headerTintColor: colors.white,
}

export default ({ navigation }: MainScreenPropsType) => {
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
        <Todo.Navigator>
            <Todo.Screen name="TodoSection" component={TodoSectionScreen} options={{...options, title: 'Todo Sections', headerRight: () => logoutIcon}} />
            <Todo.Screen name="TodoItem" component={TodoItemScreen} options={{...options, title: 'Todo Items', headerRight: () => logoutIcon}} />
        </Todo.Navigator>
    )
}


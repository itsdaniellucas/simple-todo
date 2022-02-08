import React, { useEffect, useState} from 'react'
import { ToastAndroid, View } from "react-native";
import { Input, Button } from 'react-native-elements';
import { IconType, MainScreenPropsType } from "../../types/props";
import Icon from 'react-native-vector-icons/MaterialIcons'
import MainStyle from '../../styles/MainStyle';
import { LoginService } from '../../services/LoginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiService } from '../../services/ApiService';
import { useNavigation } from '@react-navigation/native';
import useApiCall from '../../hooks/useApiCall';
import ProgressBarWrapper from './ProgressBarWrapper';

const passIconProps: IconType = {
    name: 'lock',
    size: 25,
}

const userIconProps: IconType = {
    name: 'person',
    size: 25,
}

export default ({ navigation }: MainScreenPropsType) => {
    const userIcon = <Icon name={userIconProps.name} size={userIconProps.size} />;
    const passIcon = <Icon name={passIconProps.name} size={passIconProps.size} />;
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const nav = useNavigation();

    const doLogin = useApiCall(async () => {
        return await LoginService.authenticate(user, pass);
    });

    ApiService.SetGlobalErrorHandler((error: any) => {
        if(error.statusCode) {
            if(error.statusCode == 401) { // unauthorized
                ToastAndroid.show(
                    "Unauthorized",
                    ToastAndroid.SHORT
                )
                nav.navigate('Todo Login');
            } else if(error.statusCode == 404) { // not found
                ToastAndroid.show(
                    "Not Found",
                    ToastAndroid.SHORT
                )
            }
        }
    });

    const onLoginPress = async () => {
        const login = await doLogin();
        await AsyncStorage.setItem('@token', login.token);
        navigation.navigate('Main');
    }

    return (
        <ProgressBarWrapper>
            <View style={MainStyle.login}>
                <Input leftIcon={userIcon} placeholder="Username" onChangeText={value => setUser(value)}/>
                <Input leftIcon={passIcon} placeholder="Password" onChangeText={value => setPass(value)} secureTextEntry={true} />
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Button title="Login" containerStyle={{ width: '35%' }} onPress={onLoginPress} />
                </View>
            </View>
        </ProgressBarWrapper>
    )
}
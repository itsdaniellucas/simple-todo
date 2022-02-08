import React from 'react'
import { useState } from "react";
import { View } from "react-native";
import MainStyle from "../../styles/MainStyle";
import { FAB, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { IconType, ModalScreenPropsType, Mode } from "../../types/props";
import { colors } from '../../constants';


const addIconProps: IconType = {
    name: 'add-task',
    size: 25,
}

const saveIconProps: IconType = {
    name: 'save',
    size: addIconProps.size,
}


export default ({ route, navigation }: ModalScreenPropsType) => {
    const mode = route.params.mode;
    const [name, setName] = useState('');
    const inputLabel: string = mode == Mode.Item ? 'Todo Item' : 'Todo Section';
    const inputPlaceHolder: string = mode == Mode.Item ? 'Todo Item Name' : 'Todo Section Name';
    const addIcon = <Icon name={addIconProps.name} size={addIconProps.size} />;
    const saveIcon = <Icon name={saveIconProps.name} size={saveIconProps.size} />;
    const fabPlacement: "right" | "left" = "right";

    const onNameChange = (value: string) => {
        setName(value);
    }

    const onSavePress = () => {
        if(mode == Mode.Section) {
            navigation.navigate('TodoSection', { data: name });
        } else if(mode == Mode.Item) {
            navigation.navigate('TodoItem', { data: name });
        } else {
            navigation.navigate('TodoSection', {});
        }
    }

    return (
        <>
            <View style={MainStyle.container}>
            <Input value={name} placeholder={inputPlaceHolder} label={inputLabel} leftIcon={addIcon} onChangeText={onNameChange} />
            </View>
            <FAB placement={fabPlacement} color={colors.orange} icon={saveIcon} onPress={onSavePress} />
        </>
    )
}
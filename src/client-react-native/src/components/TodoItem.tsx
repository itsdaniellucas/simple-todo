import React, { useState } from 'react'
import { ListItem } from 'react-native-elements'
import { colors } from '../constants';
import MainStyle from '../styles/MainStyle';
import { TodoItemType } from '../types/models';
import { IconType, TodoItemPropsType } from '../types/props';

const iconProps: IconType = {
    color: colors.black,
    name: 'close',
};

export default (props: TodoItemPropsType) => {
    const item: TodoItemType = { ...props.todoItem };
    const [checked, setChecked] = useState(item.isDone);
    const borderColor = item.isDone ? colors.green : colors.red;
    const listItemStyle = { ...MainStyle.listItem, borderLeftColor: borderColor };

    const onCheckPressed = async () => {
        item.isDone = !checked;
        if(props.onCheckPress) {
            await props.onCheckPress(item);
        }
        setChecked(!checked);
    };

    const onRemovePress = async () => {
        if(props.onRemovePress) {
            await props.onRemovePress(item);
        }
    }

    return (
        <ListItem style={listItemStyle}>
            <ListItem.CheckBox checked={checked} onPress={onCheckPressed} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={iconProps.color} name={iconProps.name} onPress={onRemovePress} />
        </ListItem>
    )
}
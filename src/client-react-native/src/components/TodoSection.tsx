import React from 'react'
import { ListItem } from 'react-native-elements'
import MainStyle from '../styles/MainStyle';
import { TodoSectionType } from '../types/models';
import { IconType, TodoSectionPropsType } from '../types/props';
import { colors } from '../constants';
import { getHeaderBackgroundColor, getRatio } from '../utils';

const iconProps: IconType = {
    size: 30,
    color: colors.green,
    name: 'chevron',
};

export default (props: TodoSectionPropsType) => {
    const section: TodoSectionType = { ...props.todoSection };
    const ratio: number = getRatio(section);
    const borderColor: string = getHeaderBackgroundColor(section);

    const onPress = () => {
        props.onPress(section);
    }

    return (
        <ListItem style={{...MainStyle.listItem, borderLeftColor: borderColor}} onPress={onPress}>
            <ListItem.Content>
                <ListItem.Title>{section.title}</ListItem.Title>
                <ListItem.Subtitle>{section.done}/{section.total} ({ratio}%)</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron size={iconProps.size} color={borderColor} />
        </ListItem>
    )
}
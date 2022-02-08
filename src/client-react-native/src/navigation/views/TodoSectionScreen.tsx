import React, { useEffect, useState } from 'react'
import { IconType, Mode, TodoSectionScreenPropsType } from "../../types/props";
import { FAB } from 'react-native-elements'
import { ScrollView } from 'react-native'
import TodoSection from "../../components/TodoSection";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TodoListInput, TodoSectionType, TodoStatsOutput } from "../../types/models";
import MainStyle from '../../styles/MainStyle';
import { colors } from '../../constants';
import { TodoService } from '../../services/TodoService';
import { useIsFocused } from '@react-navigation/native';
import ProgressBarWrapper from './ProgressBarWrapper';
import useApiCall from '../../hooks/useApiCall';

const addIconProps: IconType = {
    name: 'add',
    size: 25
}

export default ({ route, navigation }: TodoSectionScreenPropsType) => {
    const addIcon = <Icon name={addIconProps.name} size={addIconProps.size} />;
    const fabPlacement: "right" | "left" = "right";
    const [stats, setStats] = useState<TodoStatsOutput[]>();
    const isFocused = useIsFocused();

    const doGetTodoStats = useApiCall(async () => {
        return await TodoService.getTodoStats();
    })

    const doSave = useApiCall(async (todoList: TodoListInput) => {
        await TodoService.createTodoList(todoList);
    });

    const fetchStats = async () => {
        const data = await doGetTodoStats();
        setStats(data);
    }

    useEffect(() => {
        if(isFocused) {
            fetchStats();
        }
    }, [isFocused])

    useEffect(() => {
        if(route.params?.data) {
            onSaveSection(route.params.data);
        }
    }, [route.params?.data])

    const onTodoSectionPress = (item: TodoSectionType) => {
        navigation.navigate('TodoItem', { todoSection: item });
    }

    const onSaveSection = async (sectionName: string) => {
        let todoList: TodoListInput = {
            title: sectionName
        };

        await doSave(todoList);
        await fetchStats();
    }

    const onAddPress = () => {
        navigation.navigate('Modal', { mode: Mode.Section });
    }

    const todoSections: TodoSectionType[] = stats?.map(i => {
        let obj: TodoSectionType = {
            id: i.todoListId,
            title: i.title,
            done: i.done,
            total: i.total
        };

        return obj;
    }) ?? [];

    const renderTodoSections = todoSections?.map(i => <TodoSection todoSection={i} key={i.id} onPress={onTodoSectionPress}></TodoSection>) ?? []

    return (
        <ProgressBarWrapper>
            <ScrollView style={MainStyle.container} contentContainerStyle={{ flexGrow: 1 }}>
                {renderTodoSections}
            </ScrollView>
            <FAB placement={fabPlacement} color={colors.orange} icon={addIcon} onPress={onAddPress} />
        </ProgressBarWrapper>
    )
}
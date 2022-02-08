import React, { useEffect, useState } from 'react'
import { TodoItemScreenPropsType, IconType, Mode } from "../../types/props";
import { FAB } from 'react-native-elements'
import { ScrollView, View } from 'react-native'
import TodoItem from "../../components/TodoItem";
import { TodoInput, TodoItemType, TodoOutput } from "../../types/models";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from "../../constants";
import MainStyle from '../../styles/MainStyle';
import { getHeaderBackgroundColor, getHeaderFontColor } from '../../utils';
import { TodoService } from '../../services/TodoService';
import useApiCall from '../../hooks/useApiCall';
import ProgressBarWrapper from './ProgressBarWrapper';


const addIconProps: IconType = {
    name: 'add',
    size: 25,
}

export default ({ route, navigation }: TodoItemScreenPropsType) => {
    const section = route.params.todoSection;
    const addIcon = <Icon name={addIconProps.name} size={addIconProps.size} />;
    const fabPlacement: "right" | "left" = "right";
    const [todos, setTodos] = useState<TodoOutput[]>();

    const doGetTodos = useApiCall(async () => {
        return await TodoService.getTodos(section?.id ?? 0);
    })

    const doChangeStatus = useApiCall(async (item: TodoItemType) => {
        await TodoService.changeTodoStatus(item.id, item.isDone);
    })

    const doRemove = useApiCall(async (item: TodoItemType) => {
        await TodoService.deleteTodo(item.id);
    });

    const doSave = useApiCall(async (todo: TodoInput) => {
        await TodoService.createTodo(todo);
    });

    const fetchTodos = async () => {
        const data = await doGetTodos();
        setTodos(data);
    }


    useEffect(() => {
        fetchTodos();
    }, [route.params.todoSection]);

    useEffect(() => {
        navigation.setOptions({
            title: section?.title || 'Todo Section',
            headerStyle: {
                backgroundColor: getHeaderBackgroundColor(section)
            },
            headerTintColor: getHeaderFontColor(section)
        })
    }, []);

    useEffect(() => {
        if(route.params?.data) {
            onSaveItem(route.params.data);
        }
    }, [route.params?.data])
    

    const onCheckPress = async (item: TodoItemType) => {
        await doChangeStatus(item);
        await fetchTodos();
    }

    const onRemovePress = async (item: TodoItemType) => {
        await doRemove(item);
        await fetchTodos();
    }

    const onSaveItem = async (itemName: string) => {
        let todo: TodoInput = {
            todoListId: section?.id ?? 0,
            done: false,
            title: itemName
        }

        await doSave(todo);
        await fetchTodos();
    }

    const onAddPress = () => {
        navigation.navigate('Modal', { mode: Mode.Item });
    }

    const todoItems: TodoItemType[] = todos?.map(i => {
        let obj: TodoItemType = {
            id: i.id,
            title: i.title,
            isDone: i.isDone,
        };

        return obj;
    }) ?? [];

    const renderTodoItems = todoItems?.map(i => <TodoItem todoItem={i} key={i.id} onRemovePress={onRemovePress} onCheckPress={onCheckPress}></TodoItem>) ?? []

    return (
        <ProgressBarWrapper>
            <ScrollView style={MainStyle.container} contentContainerStyle={{ flexGrow: 1 }}>
                {renderTodoItems}
            </ScrollView>
            <FAB placement={fabPlacement} color={colors.orange} icon={addIcon} onPress={onAddPress} />
        </ProgressBarWrapper>
    )
}
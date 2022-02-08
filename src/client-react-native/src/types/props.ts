import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { GestureResponderEvent } from 'react-native'
import { TodoItemType, TodoSectionType } from './models'

export enum Mode {
    Section,
    Item
}

export interface IconType {
    size?: number,
    color?: string,
    name: string,
}

export interface TodoSectionPropsType {
    todoSection: TodoSectionType,
    onPress: (section: TodoSectionType) => void,
}

export interface TodoItemPropsType {
    todoItem: TodoItemType,
    onCheckPress: (item: TodoItemType) => void,
    onRemovePress: (item: TodoItemType) => void,
}

export interface BaseRoutePropsType {
    data?: any;
}

export interface ModalPropsType extends BaseRoutePropsType {
    mode: Mode,
}

export interface TodoItemRoutePropsType extends BaseRoutePropsType {
    todoSection?: TodoSectionType
}

export interface TodoSectionRoutePropsType extends BaseRoutePropsType {
}

export interface RootStackParams extends ParamListBase {
    TodoItem: TodoItemRoutePropsType
    TodoSection: TodoSectionRoutePropsType,
    Modal: ModalPropsType,
}

export interface BaseScreenPropsType {
    children?: any
}

export interface TodoStatsScreenPropsType extends BaseScreenPropsType {
    route: RouteProp<RootStackParams, 'TodoStats'>,
    navigation: StackNavigationProp<RootStackParams, 'TodoStats'>
}

export interface TodoItemScreenPropsType extends BaseScreenPropsType {
    route: RouteProp<RootStackParams, 'TodoItem'>,
    navigation: StackNavigationProp<RootStackParams, 'TodoItem'>
}

export interface MainScreenPropsType extends BaseScreenPropsType {
    route: RouteProp<RootStackParams, 'Main'>,
    navigation: StackNavigationProp<RootStackParams, 'Main'>
}

export interface TodoSectionScreenPropsType  extends BaseScreenPropsType{
    route: RouteProp<RootStackParams, 'TodoSection'>,
    navigation: StackNavigationProp<RootStackParams, 'TodoSection'>
}

export interface ModalScreenPropsType extends BaseScreenPropsType {
    route: RouteProp<RootStackParams, 'Modal'>,
    navigation: StackNavigationProp<RootStackParams, 'Modal'>
}

export interface ChartConfigType {
    backgroundGradientFrom: string,
    backgroundGradientTo: string,
    color: (opacity: number) => string,
    strokeWidth: number,
    barPercentage: number,
    decimalPlaces: number,
    useShadowColorFromDataset: boolean
};

export interface ChartDataType {
    labels: string[],
    legend: string[],
    data: number[][],
    barColors: string[],
}

export interface ChartPropsType {
    width: number,
    height: number,
    yAxisSuffix: string,
    decimalPlaces: number,
    hideLegend: boolean,
}
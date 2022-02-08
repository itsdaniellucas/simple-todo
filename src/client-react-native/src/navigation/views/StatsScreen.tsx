import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions } from "react-native";
import { StackedBarChart } from 'react-native-chart-kit'
import useApiCall from '../../hooks/useApiCall';
import { TodoService } from '../../services/TodoService';
import MainStyle from '../../styles/MainStyle';
import { TodoStatsOutput } from '../../types/models';
import { ChartPropsType, ChartConfigType, ChartDataType } from '../../types/props'
import ProgressBarWrapper from './ProgressBarWrapper';


const chartProps: ChartPropsType = {
    width: Dimensions.get("window").width - 20,
    height: 350,
    decimalPlaces: 0,
    yAxisSuffix: '%',
    hideLegend: false,
};

const chartConfig: ChartConfigType = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 1,
    decimalPlaces: chartProps.decimalPlaces,
    useShadowColorFromDataset: false
}

export default () => {
    const [stats, setStats] = useState<TodoStatsOutput[]>();
    const isFocused = useIsFocused();

    const doGetTodoStats = useApiCall(async () => {
        return await TodoService.getTodoStats();
    })

    useEffect(() => {
        const fetchStats = async () => {
            const data = await doGetTodoStats();
            setStats(data);
        }

        if(isFocused) {
            fetchStats();
        }
    }, [isFocused]);

    const chartData: ChartDataType = {
        labels: stats?.map(i => i.title) ?? [],
        legend: ["Done", "Not Done"],
        data: stats?.map(i => {
            if(i.total == 0) {
                return [0, 0]
            }
            return [Math.round((i.done / i.total) * 100), 100 - Math.round((i.done / i.total) * 100)]
        }) ?? [],
        barColors: ["#43a047", "#e53935"]
    };

    return (
        <ProgressBarWrapper>
            <ScrollView style={MainStyle.container}>
                <StackedBarChart
                    data={chartData}
                    width={chartProps.width}
                    height={chartProps.height}
                    chartConfig={chartConfig}
                    yAxisSuffix={chartProps.yAxisSuffix}
                    decimalPlaces={chartProps.decimalPlaces}
                    hideLegend={chartProps.hideLegend}
                />
            </ScrollView>
        </ProgressBarWrapper>
    )
}
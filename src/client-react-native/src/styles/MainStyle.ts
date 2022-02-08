import React from 'react'
import { StyleSheet } from 'react-native' 
import { colors } from '../constants';

export default StyleSheet.create({
    header: {
        backgroundColor: colors.green
    },
    button: {
        width: 150
    },
    login: {
        margin: 25,
        flex: 1,
        marginTop: '45%',
    },
    container: {
        margin: 10,
        flex: 1,
        maxHeight: '85%',
    },
    listItem: {
        borderLeftWidth: 5,
        borderLeftColor: colors.green,
        marginBottom: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.5,
        elevation: 3,
    },
});
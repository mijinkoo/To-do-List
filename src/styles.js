import { StyleSheet } from "react-native";
import { theme } from "./theme";
import { lightTheme } from "./theme";
import { useState } from "react";

//const [theme, setTheme] = useState(lightTheme);

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export const textStyles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: theme.main,
        alignItems: 'flex-start',
        marginTop: 0,
        marginLeft: 0,
    },
});

export const barStyles = StyleSheet.create({
    statusbar: {
        backgroundColor: theme.background,
    }
})

export const CalendarStyles = StyleSheet.create({
    date: {
        fontSize: 20,
        fontWeight: '300',
        margin: 15
    },
    day: {
        color: '#00adf5',
        fontWeight: '500',
    }
})
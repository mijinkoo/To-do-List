import { StyleSheet } from "react-native";

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffff1',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export const textStyles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: '600',
        color: 'red',
        alignItems: 'flex-start',
        marginTop: 0,
        marginLeft: 0,
    },
});

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
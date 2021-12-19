import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background: ${({theme})=> theme.background};
    align-items: center;
    justify-content: flex-start;
`;

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

export const barStyles = StyleSheet.create({
    statusbar: {
        backgroundColor: '#ffffff',
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
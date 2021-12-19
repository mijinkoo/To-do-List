import { StyleSheet } from "react-native";
<<<<<<< HEAD
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background: ${({theme})=> theme.background};
    align-items: center;
    justify-content: flex-start;
`;
=======
import { theme } from "./theme";
import { lightTheme } from "./theme";
import { useState } from "react";

//const [theme, setTheme] = useState(lightTheme);
>>>>>>> 7b313bc233a7cfb9bd59a60f04b9aa9a3cda718f

export const ViewStyles = StyleSheet.create({
    container: {
        flex: 1,
<<<<<<< HEAD
        backgroundColor: '#fffff1',
=======
        //backgroundColor: theme.background,
>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
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
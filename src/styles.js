import { StyleSheet } from "react-native";

import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.screenBackground};
    align-items: center;
    justify-content: flex-start;
`;

export const Header = styled.Text`
    font-size: 30px;
    font-weight: 400;
    color: ${props => props.theme.text};
    margin-left: 5px;
`;

export const CategoryContainer = styled.Pressable`
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    background-color: ${props => props.theme.box};
`;

export const smallPicker = StyleSheet.create({ 
    item: {
        justifyContent:'center',
        height: 30,
    },
    text: {
        color: '#646672',
        fontSize: 17,
    }
});

export const bigPicker = StyleSheet.create({ 
    item: {
        justifyContent:'flex-start',
        height: 40,
    },
    text: {
        color: '#646672',
        fontSize: 20,
    }
});

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
import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";

const Input = ({value, onChangeText, onSubmitEditing}) => {
    return (
        <TextInput style={inputStyles.textInput}
            placeholder="+ Add a task"
            placeholderTextColor= {theme.main}
            maxLength={20}
            keyboardAppearance="light"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}> 
        </TextInput>
    );
};

const inputStyles = StyleSheet.create({
    textInput: {
        fontSize: 25,
        width: Dimensions.get('window').width-20,
        height: 30,
        marginTop: 10,
        marginLeft: 3,
        paddingLeft: 15,
        paddingTop: 2,
        borderRadius: 10,
        backgroundColor: theme.itemBackground,
        color: theme.text,
    },
});

export default Input;
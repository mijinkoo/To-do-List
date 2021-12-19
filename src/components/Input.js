import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";


const Input = ({value, onChangeText, onSubmitEditing, onBlur, placeholder}) => {
    return (
        <TextInput style={inputStyles.textInput}
            placeholder={placeholder}
            placeholderTextColor= 'black'
            maxLength={20}
            keyboardAppearance="light"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur = {onBlur}> 
        </TextInput>
    );
};

const inputStyles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        width: Dimensions.get('window').width-100,
        height: 30,
        paddingLeft: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        color: 'black',
    },
});

export default Input;
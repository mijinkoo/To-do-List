import React from "react";
import { Dimensions, StyleSheet, TextInput } from "react-native";


const Input = ({value, onChangeText, onSubmitEditing, onBlur, placeholder}) => {
    return (
        <TextInput style={inputStyles.textInput}
            placeholder={placeholder}
            placeholderTextColor= '#fffff1'
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
        fontSize: 25,
        width: Dimensions.get('window').width-100,
        height: 30,
        //marginTop: 10,
        //marginLeft: 3,
        //paddingLeft: 15,
        //paddingTop: 2,
        borderRadius: 10,
        backgroundColor: '#fffff1',
        color: '#fffff1',
    },
});

export default Input;
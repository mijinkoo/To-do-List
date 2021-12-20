import React, {useState} from 'react'
import { View, Button, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styled from 'styled-components/native';

export default function DatePicker({setDate, item}) {
    
    const [text, onChangeText] = useState(item ? item.date.substring(0,4)+" / "+item.date.substring(4,6)+" / "+item.date.substring(6,8) : "Due date");
    
    const _toNumber = (string) => {
        switch(string){
            case "Jan": return "01";
            case "Feb": return "02";
            case "Mar": return "03";
            case "Apr": return "04";
            case "May": return "05";
            case "Jun": return "06";
            case "Jul": return "07";
            case "Aug": return "08";
            case "Sep": return "09";
            case "Oct": return "10";
            case "Nov": return "11";
            case "Dec": return "12";
        }
    }
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //const [isEditing, setEditing] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn(date.toString());
        const year = date.toString().substring(11,15)
        const month = _toNumber(date.toString().substring(4,7))
        const day  =date.toString().substring(8,10)
        const data = year+month+day
        onChangeText(year+" / "+month+" / "+day)
        setDate(""+year+month+day)
        hideDatePicker();
    };

    return (
        <Container>
            <TouchableOpacity onPress={showDatePicker}>
                <_Text
                    pointerEvents="none"
                    underlineColorAndroid="transparent"
                    editable={true}
                    value={text}
                >{text}</_Text>
                <DateTimePickerModal
                    //headerTextIOS={placeholder}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    isDarkModeEnabled={false}
                    textColor="black"
                />
            </TouchableOpacity>	
        </Container>	
  );
}

const Container = styled.View`
    background-color: ${props => props.theme.box};
    width: 100%;
    height: 40px;
    margin-top: 30px
    padding-left: 20px;
`;

const _Text = styled.Text`
    color: ${props => props.theme.boxContent};
    font-size: 20px;
    padding-top: 7px;
`;


const styles = StyleSheet.create({ 
    container: {
        width:Dimensions.get('window').width-100,
        height:40,
        backgroundColor: '#eeeeee',
        paddingLeft:20,
        marginTop: 50,
    },
    textInput: {
        fontSize: 25,
        color: 'black',
        height: 40, 
        //width: 200,        
    }
})
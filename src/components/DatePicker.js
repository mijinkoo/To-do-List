import React, {useState} from 'react'
import { View, Button, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { theme } from "../theme";

export default function DatePicker({setDate, item}) {
    
    const [text, onChangeText] = useState(item.date);
    
    const _toNumber = (string) => {
        switch(string){
            case "Jan": return 1;
            case "Feb": return 2;
            case "Mar": return 3;
            case "Apr": return 4;
            case "May": return 5;
            case "Jun": return 6;
            case "Jul": return 7;
            case "Aug": return 8;
            case "Sep": return 9;
            case "Oct": return 10;
            case "Nov": return 11;
            case "Dec": return 12;
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
        setDate(year+" / "+month+" / "+day)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    placeholder="Due date"
                    placeholderTextColor={theme.main}
                    underlineColorAndroid="transparent"
                    editable={true}
                    value={text}
                />
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
        </View>	
  );
}

const styles = StyleSheet.create({ 
    container: {
        //flex: 1,
        width:Dimensions.get('window').width-100,
        height:40,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#eeeeee',
        paddingLeft:10,
        marginTop: 50,
    },
    textInput: {
        fontSize: 25,
        color: theme.main,
        height: 40, 
        //width: 200,        
    }
})
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    box: {
        margin: 20,
    },
    datetext: {
        fontSize: 20,
        marginVertical: 10,
    },
    text: {
        fontSize: 16
    },
    memo: {
        borderBottomWidth: 1,
        fontSize: 16,
        marginTop: 10,
        color: 'blue',
    }
});

export const CalendarPickerScreen = ({ navigation }) => {

    const [date, setDate] = useState('');
    const [memo, setMemo] = useState('');

    async function date_change(d) {
        setDate(d.format('MMMM DD, YYYY'));

        var key = d.format('YYYYMMDD');
        var value = await AsyncStorage.getItem(key);
        var value_m = await AsyncStorage.getItem(key+'m');

        if(value !== null) {
            setMemo(value_m);
        } else {
            setMemo('');
        }
    }

    async function set_memo() {
        await AsyncStorage.setItem(date+'m', memo);
    }

    return(
        <View style={styles.container}>
            <CalendarPicker onDateChange={date_change}/>
            <View style={styles.box}>
                <Text style={styles.text}>{date}</Text>
            </View>
        </View>
    );
};
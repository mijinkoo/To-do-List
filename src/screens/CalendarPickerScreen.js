import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import { Home } from '../screens/Home';
import Task from '../components/Task';
import AppLoading from "expo-app-loading";
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const List = styled.View`
    width: ${({ width }) => width - 40}px;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    margin-left: 20;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    box: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 10,
    },
    datetext: {
        fontSize: 20,
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: '200',
    },
});

export const CalendarPickerScreen = ({ navigation }) => {

    const width = Dimensions.get('window').width;

    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState({});
    const [isReady, SetIsReady] = useState(false);

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    }

    async function date_change(d) {
        setDate(d.format('MMMM DD, YYYY'));

        var key = d.format('YYYYMMDD');
        var value = await AsyncStorage.getItem(key);
    }

    return isReady ? (
        <View style={styles.container}>
            <CalendarPicker onDateChange={date_change}/>
            <View style={styles.box}>
                <Text style={styles.text}>{date}</Text>
            </View>
            <List width={width}>
                {Object.values(tasks).reverse().map(item => (
                    <Task 
                        key={item.id} item={item}
                        toggleTask={_toggleTask}
                        calendarMode="true"
                    />
                    ))}
            </List>
        </View>
    ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish = {() => SetIsReady(true)}
            onError = {console.error}
        />
    );
};
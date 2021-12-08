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

    const [dueDate, setDueDate] = useState('');
    const [cmpDate, setCmpDate] = useState(''); // dueDate와 동일한 포맷의 선택한 날짜
    const [date, setDate] = useState('');       // 선택한 날짜
    const [tasks, setTasks] = useState({});
    const [isReady, SetIsReady] = useState(false);
    const [taskObject, setTaskObject] = useState({});

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
        const loadedTaskObject = await AsyncStorage.getItem('taskObject');
        setTaskObject(JSON.parse(loadedTaskObject || '{}'));
        //const due_date = await AsyncStorage.getItem('date');
        //setDueDate(due_date.format('YYYYMMDD'));
        console.log("loadTask");
    };

    // dueDate와 선택한 날짜가 같으면 true를 반환
    const [sameDate, setSameDate] = useState(false);
    const _cmpDate = id => {
        const currentTaskObject = Object.assign({}, taskObject);
        setDueDate((currentTaskObject[id]['date'].parseInt).format('YYYYMMDD'));
        ( dueDate === cmpDate ) ? setSameDate(true) : setSameDate(false);
        console.log("cmpdate");
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    }

    async function date_change(d) {
        setDate(d.format('MMMM DD, YYYY'));
        setCmpDate(d.format('YYYYMMDD'));
    }


    return isReady ? (
        <View style={styles.container}>
            <CalendarPicker onDateChange={date_change}/>
            <View style={styles.box}>
                <Text style={styles.text}>{date}</Text>
            </View>
            <View></View>
            <List width={width}>
                {Object.values(tasks).reverse().map(item => (
                    sameDate && 
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
            onFinish = {_cmpDate, () => SetIsReady(true)}
            onError = {console.error}
        />
    );
};
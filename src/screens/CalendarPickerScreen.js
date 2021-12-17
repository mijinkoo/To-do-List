import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import { Home } from '../screens/Home';
import Task from '../components/Task';
import AppLoading from "expo-app-loading";
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { theme } from '../theme';

const List = styled.ScrollView`
    width: ${({ width }) => width - 40}px;
    flex: 1;
    margin-left: 20;
`;
//align-items: center;
//justify-content: flex-start;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: 'white',
    },
    box: {
        margin: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datetext: {
        fontSize: 20,
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
    },
    sucess: {
        alignItems: 'flex-end',
    },
    emoji: {
        alignItems: 'center',
    },
});

export const CalendarPickerScreen = ({ navigation }) => {

    const width = Dimensions.get('window').width;

    const [cmpDate, setCmpDate] = useState(''); // dueDate와 동일한 포맷의 선택한 날짜
    const [date, setDate] = useState('');       // 선택한 날짜
    const [tasks, setTasks] = useState({});
    const [isReady, SetIsReady] = useState(false);

    const [success, setSuccess] = useState(0);
    
    const [emoji, setEmoji] = useState('');

    const _successRate = tasks => {
        var totalCount = 0;          // 선택한 날짜의 총 task 수 => 제대로 구해짐
        var completedCount = 0;      // 선택한 날짜의 completed task 수 => 제대로 안 구해짐**
        
        Object.values(tasks).map(item =>
            {
                if (item.date == cmpDate || item.date == "D-day") {
                    totalCount += 1;
                    if (item.completed) {
                        completedCount += 1;
                    }  
                }        
            }
        )
        if (totalCount == 0) {
            setSuccess(0);
        }
        else if (totalCount > 0) {
            setSuccess((completedCount/totalCount)*100);
        }
    }

    const _setEmoji = () => { //이거 왜 제대로 작동이 안 될까...? 렌더링이 너무 느린 건가...?
        //_successRate(tasks);

        if(success >= 80) {
            setEmoji('😍');
        } else if(success >= 60) {
            setEmoji('😚');
        } else if(success >= 40) {
            setEmoji('🙂');
        } else if(success >= 20) {
            setEmoji('🤔');
        } else if(success > 0){
            setEmoji('😔');
        }
    }

    useEffect(()=>{
        _successRate(tasks);
        //_setEmoji();
        //_saveItems(items);
    },[date])

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
            _successRate(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
        console.log('loadTask');
        //_successRate(tasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    }

    async function _dateChange(d) {
        setDate(d.format('YYYY / MM / DD'));
        setCmpDate(d.format('YYYYMMDD'));
        //_successRate(tasks);
    }

    return isReady ? (
        <View style={styles.container}>
            <CalendarPicker onDateChange={_dateChange}
                            selectedDayColor={theme.main} todayBackgroundColor={theme.main} todayBackgroundColor='yellow'/>
            <View style={styles.box}>
                <Text style={styles.text}>{date}</Text>
                {/* <Text style={[styles.text, styles.emoji]}>{emoji}</Text> */}
                <Text style={[styles.text, styles.success]}>Success {success}%</Text>
            </View>
            <View></View>
            <List width={width}>
                {Object.values(tasks).reverse().map(item => (
                    (item.date == cmpDate) ? (
                        <Task
                            key={item.id} item={item}
                            toggleTask={_toggleTask}
                            calendarMode="true"
                        />
                    ) : (
                        <></>
                    )                   
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
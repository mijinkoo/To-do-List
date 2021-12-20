import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPicker from 'react-native-calendar-picker';
import { Home } from '../screens/Home';
import Task from '../components/Task';
import AppLoading from "expo-app-loading";
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme';
import { darkTheme, lightTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';

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
        paddingTop: 50,
        //backgroundColor: theme.background,
    },
    box: {
        margin: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datetext: {
        fontSize:17,
        marginVertical: 10,
    },
    text: {
        fontSize: 17,
        fontWeight: '400',
        //color: theme.text,
    },
    success: {
        fontSize: 17,
        alignItems: 'flex-end',
    },
    emoji: {
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '400',
    },
});

export const CalendarPickerScreen = ({ navigation }) => {

    let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
    let time = {
      year: today.getFullYear(),  //현재 년
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현재 날짜
    };
    let cmpDateString = ""+time.year+time.month+time.date;
    let dateString = ""+time.year+" / "+time.month+" / "+time.date;

    const width = Dimensions.get('window').width;

    const [cmpDate, setCmpDate] = useState(cmpDateString); // dueDate와 동일한 포맷의 선택한 날짜
    const [date, setDate] = useState(dateString);       // 선택한 날짜
    const [tasks, setTasks] = useState({});
    const [taskList, setTaskList] = useState([]);
    const [isReady, SetIsReady] = useState(false);
    const [itemExist, setItemExist] = useState(false);
    const [success, setSuccess] = useState(0);
    
    const [emoji, setEmoji] = useState('');

    const _successRate = async tasks => {
        var totalCount = 0;          // 선택한 날짜의 총 task 수
        var completedCount = 0;      // 선택한 날짜의 completed task 수
        
        Object.values(tasks).map(item =>
            {
                if (item.date == cmpDate || item.date == "D-day") {
                    totalCount += 1;
                    setItemExist(true);
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

    const _setEmoji = async() => {
        //_successRate(tasks);

        if(success >= 80) {
            setEmoji('😍');
        } else if(success >= 60) {
            setEmoji('😚');
        } else if(success >= 40) {
            setEmoji('🙂');
        } else if(success >= 20) {
            setEmoji('🤔');
        } else if(success >= 0){
            setEmoji('😔');
        }
    }

    useEffect(()=>{
        setItemExist(false);
        _successRate(tasks);
        //_itemExist(tasks);
        _setEmoji();
    },[date])

    useEffect(()=>{
        _setEmoji();
    },[success])

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
        //_loadTheme();
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
        //_itemExist(tasks);
        //_successRate(tasks);
    }

    useEffect(()=>{
        _loadTasks();
        _successRate(tasks);
    },[tasks])

    //theme

    //const initialMode = useTheme();
    //const [ThemeMode, setThemeMode] = useState(initialMode)
    const ThemeMode = useTheme();
    const CurrentMode = ThemeMode[0] === 'light' ? 'light' : 'dark';


    return isReady ? (

            <View style={[styles.container, {backgroundColor: (CurrentMode=== 'light') ? lightTheme.screenBackground : darkTheme.screenBackground}]}>
            <CalendarPicker textStyle={{color: (CurrentMode=== 'light') ? lightTheme.calendarColor : darkTheme.calendarColor}}
                            onDateChange={_dateChange} //initialDate={new Date()}
                            selectedDayColor='#778bdd' todayBackgroundColor='yellow'
                            />
            <View style={styles.box}>
                <Text style={[styles.text, {color: (CurrentMode=== 'light') ? 'black' : 'white'}]}>{date}</Text>
                {itemExist ? (
                    <>
                    <Text style={[styles.emoji]}>{emoji}</Text>
                    <Text style={[styles.text, styles.success, {color: (CurrentMode=== 'light') ? 'black' : 'white'}]}>Success {success}%</Text>
                    </>
                ) : ( <>
                </> ) }
            </View>
            <View></View>
            <List width={width}>
                {Object.values(tasks).reverse().map(item => (
                    (item.date == cmpDate) ? (
                        <Task
                            key={item.id} item={item}
                            toggleTask={_toggleTask}
                            calendarMode={true} 
                            navigation={navigation}
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
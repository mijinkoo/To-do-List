import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { Home } from "./Home";
import { theme } from "../theme";
import { images } from "../image";
import Task from "../components/Task";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ViewStyles, textStyles, barStyles } from '../styles';
import { StatusBar, SafeAreaView, Text, Dimensions, ScrollView, Image, Pressable } from "react-native"
import { TodayInfo } from "../components/TodayInfo";

export const MonthlyCalendar = () => {

    const width = Dimensions.get('window').width;

    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    //Category Dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    //Select
    const [select, setSelect] = useState(false);

    const _selectTask = () => {
        setSelect((prev) => !prev);
    }

    //Sort
    const [sort, setSort] = useState(false);

    const _sortTask = () => {
        setSort((prev) => !prev);
    }

    //Load Data
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    useEffect(()=>{
        _loadTasks();
    },)

    return (
        <View>
            <Calendar/>
            <TodayInfo/>
            <View width={width-20} style={{zIndex:0,}}>
                {Object.values(tasks).reverse().map(item => (
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select}/>
                ))}
            </View>
        </View>
    );
};
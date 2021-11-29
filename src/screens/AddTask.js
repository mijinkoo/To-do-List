import React,{useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable } from "react-native"
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import { images } from "../image";
import { theme } from "../theme";
import { ViewStyles, textStyles, barStyles } from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddTask = () => {

    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const _addTask = () => {
        alert('Add:'+ newTask);
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        //setTasks({...tasks, ...newTaskObject});
        _saveTasks({...tasks, ...newTaskObject});
    };

    const _onBlur = () => {
        setNewTask('');
    }

    const _handleTextChange = text =>{
        setNewTask(text);
    }
    
    return (
       <View>
           <Input value={newTask} onChangeText={_handleTextChange} onSubmitEditing={_addTask} onBlur={_onBlur}/>
       </View>
    );
};

export default AddTask;
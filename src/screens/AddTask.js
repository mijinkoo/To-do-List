import React,{useEffect, useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, StyleSheet, TextInput } from "react-native"
import IconButton from "../components/IconButton";
import { images } from "../image";
import { theme } from "../theme";
import { ViewStyles, textStyles, barStyles } from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker";
import DropDownPicker from 'react-native-dropdown-picker';
import CategoryPicker from "../components/CategoryPicker";

export const AddTask = () => {

    // data to store in AsyncStorage
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');

    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const [isLoading, SetIsLoading] = useState(false);

    useEffect(()=>{
        _loadTasks();
        SetIsLoading(true);
    },[])
    
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    const _addTask = async() => {
        await _loadTasks();
        alert('Add:'+ category);
        //const ID = Date.now().toString();
        const ID = Object.keys(tasks).length.toString();
        const taskObject = {
            [ID]: {id: ID, title: title, date: date, category: category, comment: comment, completed: false},
        };
        setTitle('');
        _saveTasks({...tasks, ...taskObject});
    };
    
    const width = Dimensions.get('window').width

    return ( isLoading ?
        <SafeAreaView style={ViewStyles.container}>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>Add a task</Text>
            </View>
            <View style={{position:'absolute', top:100, height: 300,}}>
                <TextInput name="title" value={title} onChangeText={text => setTitle(text)} placeholder="  Title" placeholderTextColor= {theme.main}
                    maxLength={20} keyboardAppearance="light"style={[boxStyles.textInput,{height:40, marginBottom:50}]}>
                </TextInput>

                <CategoryPicker canModify="true" setCategory={setCategory}/>

                <DatePicker name="date" setDate={setDate}/>

                <TextInput name="comment" value={comment} onChangeText={text => setComment(text)} placeholder="  Comment" placeholderTextColor= {theme.main}
                    maxLength={20} keyboardAppearance="light"style={boxStyles.textInput}>
                </TextInput>

                <Pressable onPressOut={_addTask}>
                    <Text style={[boxStyles.textInput, {color:theme.main, paddingLeft:10}]}>Submit</Text>
                </Pressable>
            </View>
        </SafeAreaView>
       :
       <Text>Loading</Text>     
    );
};


const boxStyles = StyleSheet.create({
    textInput: {
        fontSize: 25,
        width: Dimensions.get('window').width-100,
        height: 40,
        //marginTop: 10,
        //marginLeft: 3,
        //paddingLeft: 15,
        //paddingTop: 2,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eeeeee',
    },
});

export default AddTask;
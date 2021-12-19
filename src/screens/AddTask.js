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
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

export const AddTask = ({navigation}) => {

    // data to store in AsyncStorage
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');

    const [tasks, setTasks] = useState({});

   /* async function _dateChange(d) {
        setDate(d.format('YYYYMMDD'));  
    }*/

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const [isLoading, SetIsLoading] = useState(false);
    
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    const _addTask = async() => {
        await _loadTasks();
        if(!date) {
            alert('Please choose the due date')
        }else{
        alert('Add:'+ title);
        //const ID = Date.now().toString();
        const ID = Object.keys(tasks).length.toString();
        const taskObject = {
            [ID]: {id: ID, title: title, date: date, category: category, comment: comment, completed: false, selected: false},
        };
        setTitle('');
        _saveTasks({...tasks, ...taskObject});
        await AsyncStorage.setItem('taskObject', JSON.stringify(taskObject));
        navigation.navigate("TODO List")
        }
    };
    
    const width = Dimensions.get('window').width

    return ( isLoading ?
        <SafeAreaView style={ViewStyles.container}>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>Add a task</Text>
            </View>
            <View style={{position:'absolute', top:100, height: 300,}}>
                <TextInput name="title" value={title} onChangeText={text => setTitle(text)} placeholder="  Title" placeholderTextColor= 'blue'
                    maxLength={20} keyboardAppearance="light"style={[boxStyles.textInput,{height:40, marginBottom:50}]}>
                </TextInput>

                <View style={{zIndex: 1}}>
                    <CategoryPicker canModify="true" item={''} setCategory={setCategory} style={{zIndex: 1}}/>
                </View>

                <DatePicker name="date" setDate={setDate} /*dateChange={_dateChange}*//>

                <TextInput name="comment" value={comment} onChangeText={text => setComment(text)} placeholder="  Comment" placeholderTextColor= 'blue'
                    maxLength={20} keyboardAppearance="light"style={boxStyles.textInput}>
                </TextInput>

                <Pressable onPress={_addTask} >
                    <Text style={[boxStyles.textInput, {color:'blue', paddingLeft:10}]}>Submit</Text>
                </Pressable>
            </View>
        </SafeAreaView>
       :
       <AppLoading
       startAsync = {_loadTasks}
       onFinish = {() => SetIsLoading(true)}
       onError = {console.error}
        />     
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
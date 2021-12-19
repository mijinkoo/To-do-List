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
import AppLoading from "expo-app-loading";

export const EditTask = ({route, navigation}) => {

    const {item} = route.params;

    // data to store in AsyncStorage
    const [title, setTitle] = useState(item.title);
    const [date, setDate] = useState(item.date);
    const [category, setCategory] = useState(item.category);
    const [comment, setComment] = useState(item.comment);

    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
            alert('Edit:'+ title);
        } catch (e) {
            console.error(e);
        }
    }

    const [isLoading, SetIsLoading] = useState(false);
    
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    const _editTask = async() => {
        await _loadTasks();
        alert('Edit:'+ title);
        const ID = item.id;
        const taskObject = {
            [ID]: {id: ID, title: title, date: date, category: category, comment: comment, completed: false},
        };
        setTitle('');
        _saveTasks({...tasks, ...taskObject});
        await AsyncStorage.setItem('taskObject', JSON.stringify(taskObject));
    };
    
    const width = Dimensions.get('window').width

    return ( isLoading ?
        <SafeAreaView style={ViewStyles.container}>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>Edit a task</Text>
            </View>
            <View style={{position:'absolute', top:100, height: 300,}}>
                <TextInput name="title" value={title} onChangeText={text => setTitle(text)} placeholder="  Title" placeholderTextColor= {theme.main}
                    maxLength={20} keyboardAppearance="light" style={[boxStyles.textInput,{height:40, marginBottom:50}]}>
                </TextInput>

                <View style={{zIndex: 1}}>
                    <CategoryPicker value={category} item={item} canModify="true" setCategory={setCategory} style={{zIndex: 1}}/>
                </View>

                <DatePicker name="date" item={item} setDate={setDate}/>

                <TextInput name="comment" value={comment} onChangeText={text => setComment(text)} placeholder="  Comment" placeholderTextColor= {theme.main}
                    maxLength={20} keyboardAppearance="light"style={boxStyles.textInput}>
                </TextInput>

                <Pressable onPress={_editTask} onPressOut={() => navigation.goBack()}>
                    <Text style={[boxStyles.textInput, {color:theme.main, paddingLeft:10}]}>Edit</Text>
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

export default EditTask;
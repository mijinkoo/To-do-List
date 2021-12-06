import React,{useEffect, useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, StyleSheet, TextInput } from "react-native"
import IconButton from "../components/IconButton";
import { images } from "../image";
import { theme } from "../theme";
import { ViewStyles, textStyles, barStyles } from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker";
import DropDownPicker from 'react-native-dropdown-picker';

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

    const [isloading, SetIsLoading] = useState(false);

    useEffect(()=>{
        _loadTasks();
        SetIsLoading(true);
    })
    
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    const _addTask = async() => {
        await _loadTasks();
        alert('Add:'+ title);
        const ID = Date.now().toString();
        const titleObject = {
            [ID]: {id: ID, title: title, date: date, category: category, comment: comment, completed: false},
        };
        setTitle('');
        //setTasks({...tasks, ...titleObject});
        _saveTasks({...tasks, ...titleObject});
    };

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'All', value: 'all'},
        {label: 'Study', value: 'study'},
        {label: 'Appointment', value: 'appointment'},
        {label: 'Project', value: 'project'}
    ]);
    
    return ( isloading ?
        <SafeAreaView style={ViewStyles.container}>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>Add a task</Text>
            </View>
            <View style={{alignItems:'center', alignContent:'flex-end'}}>
                <TextInput name="title" value={title} onChangeText={text => setTitle(text)} placeholder="  Title" placeholderTextColor= {theme.main}
                    maxLength={20} keyboardAppearance="light"style={[boxStyles.textInput,{height:40}]}>
                </TextInput>

                <DatePicker name="date" setDate={setDate}/>

                <DropDownPicker name="category" placeholder="Category" placeholderStyle={{fontSize: 13}} containerStyle={{width:110,}} listItemLabelStyle={{fontSize:13}} selectedItemContainerStyle={{backgroundColor:'#cdcdcd'}} showTickIcon={false}
                    open={open} value={category} items={items} setOpen={setOpen} setValue={setCategory} setItems={setItems}> 
                </DropDownPicker>

                <TextInput name="comment" value={comment} onChangeText={text => setComment(text)} placeholder="  Comment" placeholderTextColor= {theme.main}
                    maxLength={20} keyboardAppearance="light"style={[boxStyles.textInput,{height:40}]}>
                </TextInput>
            </View>
            <Pressable onPressOut={_addTask}>
                <Text style={{borderWidth:2, borderColor: "white", color:'white'}}>Submit</Text>
            </Pressable>
        </SafeAreaView>
       :
       <Text>Loading</Text>     
    );
};


const boxStyles = StyleSheet.create({
    textInput: {
        fontSize: 25,
        width: Dimensions.get('window').width-100,
        height: 30,
        //marginTop: 10,
        //marginLeft: 3,
        //paddingLeft: 15,
        //paddingTop: 2,
        //borderRadius: 10,
        backgroundColor: theme.itemBackground,
        color: theme.text,
    },
});

export default AddTask;
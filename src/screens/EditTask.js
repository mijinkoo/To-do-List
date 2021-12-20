import React,{useEffect, useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, StyleSheet, TextInput } from "react-native";
import { ViewStyles, textStyles, barStyles } from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker";
import CategoryPicker from "../components/CategoryPicker";
import AppLoading from "expo-app-loading";
import { Container, Header, TextField } from '../styles';

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
        const ID = item.id;
        const taskObject = {
            [ID]: {id: ID, title: title, date: date, category: category, comment: comment, completed: false},
        };
        _saveTasks({...tasks, ...taskObject});
        await AsyncStorage.setItem('taskObject', JSON.stringify(taskObject));
        navigation.navigate("TODO List")
    };
    
    const width = Dimensions.get('window').width

    return ( isLoading ?
        <Container>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Header>Edit a task</Header>
            </View>
            <View style={{marginTop: 20, width:'80%', alignItems:'center'}}>
                <TextField name="title" value={title} onChangeText={text => setTitle(text)} placeholder="Title" placeholderTextColor='#646672'
                    maxLength={20} keyboardAppearance="light">
                </TextField>

                <View style={{height: 30}}/>

                <CategoryPicker value={category} item={item} canModify="true" setCategory={setCategory} style={{zIndex: 1}}/>

                <DatePicker name="date" item={item} setDate={setDate}/>

                <TextField name="comment" value={comment} onChangeText={text => setComment(text)} placeholder="Comment" placeholderTextColor= '#646672'
                    maxLength={20} keyboardAppearance="light" style={{height:100}}>
                </TextField>

                <Pressable onPress={_editTask} style={{backgroundColor: '#1185b4', width:100, height: 40,marginTop: 50, paddingTop: 4, borderRadius:20}}>
                    <Text style={boxStyles.textInput}>Submit</Text>
                </Pressable>
            </View>
        </Container>
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
        textAlign:'center',
        textAlignVertical:'center',
        fontSize: 25,
        color: '#ffffff',
    },
});

export default EditTask;
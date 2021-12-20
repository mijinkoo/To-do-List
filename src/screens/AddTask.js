import React,{useState} from "react";
import { Text, View, Dimensions, Pressable, StyleSheet, TextInput } from "react-native"
import { textStyles, Container, Header } from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker";
import CategoryPicker from "../components/CategoryPicker";
import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

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
        const ID = Date.now().toString();
        //const ID = Object.keys(tasks).length.toString();
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

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    return ( isLoading ?
        <Container>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center',}}>
                <Header>Add a task</Header>
            </View>
            <View style={{marginTop: 20, width:'80%', alignItems:'center'}}>

                <TextField value={title} onChangeText={text => setTitle(text)} placeholder="Title" placeholderTextColor= '#646672'
                    maxLength={20} keyboardAppearance="light">
                </TextField>

                <View style={{height: 30}}/>

                <CategoryPicker canModify="true" setCategory={setCategory} setIsCategoryOpen={setIsCategoryOpen}/>
                


                <DatePicker setDate={setDate}/>

                <TextField value={comment} onChangeText={text => setComment(text)} placeholder="Comment" placeholderTextColor= '#646672'
                    maxLength={50} keyboardAppearance="light" style={{height:100}}>
                </TextField>

                <Pressable onPress={_addTask} style={{backgroundColor: '#1185b4', width:100, height: 40,marginTop: 50, paddingTop: 4, borderRadius:20}}>
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
        //backgroundColor: '#1185b4',
        color: '#ffffff',
    },
});

const TextField = styled.TextInput`
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.theme.box};
    fontSize: 20px;
    width: 100%;
    height: 40px;
    margin-top: 30px
    padding-left: 20px;
`;

export default AddTask;


//category picker height 설정이 문제
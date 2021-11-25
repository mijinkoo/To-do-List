import React,{useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable } from "react-native"
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import Search from "../components/Search";
import Task from "../components/Task";
import { images } from "../image";
import { theme } from "../theme";
import { ViewStyles, textStyles, barStyles } from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';

export const Home = () => {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({
        '1': {id: '1', text: "Todo item #1", completed: false},
        '2': {id: '2', text: "Todo item #2", completed: false}
    })

    const _addTask = () => {
        alert('Add:'+ newTask);
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: {id: ID, text: newTask, completed: false},
        };
        setNewTask('');
        setTasks({...tasks, ...newTaskObject});
    };

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    }

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    };

    const _onBlur = () => {
        setNewTask('');
    }

    const _handleTextChange = text =>{
        setNewTask(text);
    }

    //Category Dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'All', value: 'all'},
        {label: 'Study', value: 'study'},
        {label: 'Appointment', value: 'appointment'},
        {label: 'Project', value: 'project'}
    ]);


    return (
        <SafeAreaView style={ViewStyles.container}>
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>TODO List</Text>
                <Search></Search>
            </View>
            <View style={{flexDirection:'row',zindex:1, marginBottom:5, justifyContent:'space-between', }} width={width-20}>
                <DropDownPicker 
                    placeholder="Category" placeholderStyle={{fontSize: 13}} containerStyle={{width:110,}} listItemLabelStyle={{fontSize:13}} selectedItemContainerStyle={{backgroundColor:'#cdcdcd'}} showTickIcon={false}
                    open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems}
                />
                <View style={{flexDirection:'row'}}>
                    <Pressable style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                        <Image source={images.select} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                        <Text style={{color:theme.text, fontSize: 10}}>select</Text>
                    </Pressable>
                    <Pressable style={{ alignItems:'center',justifyContent:'center'}}>
                        <Image source={images.sort} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                        <Text style={{color:theme.text, fontSize: 10}}>sort</Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView width={width-20} style={{zindex:0}}>
                {Object.values(tasks).reverse().map(item => (
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask}/>
                ))}
                <View>
                    <Text style={{ color:theme.text,fontSize:20 ,borderColor:theme.text, borderTopWidth: 3, marginTop:15, paddingTop:10,}}>    Completed(0)</Text>
                    <Text></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
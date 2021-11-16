import React,{useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView } from "react-native"
import IconButton from "./components/IconButton";
import Input from "./components/Input";
import Task from "./components/Task";
import { images } from "./image";
import { ViewStyles, textStyles, barStyles } from './styles';


export default function App() {

    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({
        '1': {id: '1', text: "Todo item #1", completed: false},
        '2': {id: '2', text: "Todo item #2", completed: true}
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

    const _handleTextChange = text =>{
        setNewTask(text);
    }

    return (
        <SafeAreaView style={ViewStyles.container}>
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <Text style={textStyles.title}>TODO List</Text>
            <Input value={newTask} onChangeText={_handleTextChange} onSubmitEditing={_addTask}/>
            <ScrollView width={width-20}>
                {Object.values(tasks).reverse().map(item => (
                    <Task key={item.id} item={item} deleteTask={_deleteTask}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

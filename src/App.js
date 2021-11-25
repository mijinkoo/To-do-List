import React,{useState} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, ImageStore, Button } from "react-native"
import IconButton from "./components/IconButton";
import Input from "./components/Input";
import Search from "./components/Search";
import Task from "./components/Task";
import { images } from "./image";
import { theme } from "./theme";
import { ViewStyles, textStyles, barStyles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {

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


    return (
        <SafeAreaView style={ViewStyles.container} >
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>TODO List</Text>
                <Search></Search>
            </View>
            <View style={{flexDirection:'column', zIndex: 1, zindex: 1}}>
                <View style={{flexDirection:'row', marginBottom:5, justifyContent:'space-between', }} width={width-20}>
                    <DropDownPicker 
                        placeholder="Category" placeholderStyle={{fontSize: 13}} containerStyle={{width:110,}} listItemLabelStyle={{fontSize:13}} selectedItemContainerStyle={{backgroundColor:'#cdcdcd'}} showTickIcon={false}
                        open={open} value={value} items={items} setOpen={setOpen} setValue={setValue} setItems={setItems}
                    />
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        {select && 
                            <Pressable style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                                <Image source={images.selectAll} style={{tintColor: theme.text, width: 30, height: 30,}}></Image>
                                <Text style={{color:theme.text, fontSize: 8.5, paddingTop:2}}>Select All</Text>
                            </Pressable>
                        }
                        <Pressable onPressOut={_selectTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                            <Image source={images.select} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                            <Text style={{color:theme.text, fontSize: 10}}>Select</Text>
                        </Pressable>
                        <Pressable onPressOut={_sortTask} style={{ flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Image source={images.sort} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                            <Text style={{color:theme.text, fontSize: 10}}>Sort</Text>
                        </Pressable>                    
                    </View>
                </View>
                {sort && 
                            <View style={{position:'absolute', top:50, right:0, borderWidth:1, borderColor:'#ffffff', backgroundColor:theme.background}}>
                                <Pressable><Text style={{fontSize:15, color:'#ffffff', borderBottomWidth: 1, borderBottomColor:'#ffffff', padding:2}}> Sort by due date</Text></Pressable>
                                <Pressable><Text style={{fontSize:15, color:'#ffffff', padding:2}}> Sort by date added</Text></Pressable>
                            </View>
                }
            </View>
            <ScrollView width={width-20} style={{zIndex:0,}}>
                {Object.values(tasks).reverse().map(item => (
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select}/>
                ))}
                <View>
                    <Text style={{ color:theme.text,fontSize:20 ,borderColor:theme.text, borderTopWidth: 3, marginTop:15, paddingTop:10,}}>    Completed(0)</Text>
                    <Text></Text>
                </View>
            </ScrollView>
            <View style={{position:'absolute', bottom: 0,flexDirection:'row', justifyContent:'space-between', paddingBottom: 20}} width={width-60}>
                <Pressable style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:theme.text, padding:8, margin:0}}>
                    <Image source={images.calendar} style={{tintColor: theme.text, width: 40, height: 40,padding:0, margin:0}}/>
                </Pressable>
                <Pressable style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:theme.text, padding:8, margin:0}}>
                    <Image source={images.add} style={{tintColor: theme.text, width: 40, height: 40,padding:0, margin:0}}/>
                </Pressable>
            </View>
            {select &&
                <Text width={width} style={{position:'absolute', bottom: 0, textAlign:'center',textAlignVertical:'center',backgroundColor:'#2c2c2c', color:theme.text, fontSize:45, width:'100%', height:80, padding:0, margin:0}}>Delete</Text>
            }
        </SafeAreaView>
    );
};

//<Input value={newTask} onChangeText={_handleTextChange} onSubmitEditing={_addTask} onBlur={_onBlur}/>

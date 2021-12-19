import React,{useEffect, useState, Component} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable } from "react-native"
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import CategoryPicker from "../components/CategoryPicker";
import Search from "../components/Search";
import Task from "../components/Task";
import { images } from "../image";
import { theme } from "../theme";
import { ViewStyles, textStyles, barStyles } from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddTask from "./AddTask";

export const Home = ({ navigation }) => {

    const width = Dimensions.get('window').width;

    const [tasks, setTasks] = useState({});
    const [searchedtasks, setSearchedTasks] = useState([]);
    const [text, setText] = useState("");
    const [isReady, SetIsReady] = useState(false);

    const _saveTasks = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            console.error(e);
        }
    }

    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };
    
    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks(currentTasks);
    }

    const _toggleSelect = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['selected'] = !currentTasks[id]['selected'];
        _saveTasks(currentTasks);
    }

    const completed_false=(item)=>{
        if(item.completed===false) return item;
    }

    const completed_true=(item)=>{
        if(item.completed===true) return item;
    }

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        _saveTasks(currentTasks);
    };

    //Select
    const [select, setSelect] = useState(false);

    const _selectTask = () => {
        setSelect((prev) => !prev);
    }

    const _selectAllTask = () => {
        const currentTasks = Object.assign({}, tasks);
        for(id=0; id< Object.values(tasks).length; id++){
            currentTasks[id]['selected'] = !currentTasks[id]['selected'];
        }
        _saveTasks(currentTasks);
    }

    const _deleteSelectedTask = () => {
        const currentTasks = Object.assign({}, tasks);
        for(id=0; id< Object.values(tasks).length; id++){
            if(currentTasks[id]['selected'] === true) {
                delete currentTasks[id]
            }
        }
        _saveTasks(currentTasks);
    }
    //Sort
    const [sort, setSort] = useState(false); //sort 상자 열고 닫기

    const [isSortedByDueDate, SetIsSortedByDueDate] = useState(false); //default는 sort by added date, 버튼 누르면 sort by due date

    const _sortByDueDate =(a, b)=>{
        if(isSortedByDueDate === true){
            if (a.date < b.date) return -1;
            else if (a.date > b.date) return 1;
            else return 0;
        }
        else return null;
    }

    //category
    const [category, setCategory] = useState("All");

    const sortedByCategory =(item)=>{
        if(category === "All" | category === "Category") return item;
        else return item.category === category;
    }

    //Load Data
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    useEffect(()=>{
        const i = Object.values(tasks).filter(item =>(
            item.title.toLowerCase().includes(text.toLowerCase())||item.date.includes(text)
        ))
        setSearchedTasks(i);
    },[text])

    useEffect(()=>{
        _loadTasks();
    },[tasks])
    
    return isReady ? (
        <SafeAreaView style={ViewStyles.container} >
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>TODO List</Text>
                <Search  setText={setText} ></Search>
            </View>
            <View style={{flexDirection:'column', zIndex: 2}}>
                <View style={{flexDirection:'row', marginBottom:5, justifyContent:'space-between', height:40}} width={width-20}>
                    <CategoryPicker canModify="false" setCategory={setCategory}/>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        {select &&
                            <Pressable onPressOut={_selectAllTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                                <Image source={images.selectAll} style={{tintColor: theme.text, width: 30, height: 30,}}></Image>
                                <Text style={{color:theme.text, fontSize: 8.5, paddingTop:2}}>Select All</Text>
                            </Pressable>
                        
                        }
                        <Pressable onPressOut={_selectTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                            <Image source={images.select} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                            <Text style={{color:theme.text, fontSize: 10}}>Select</Text>
                        </Pressable>
                        <Pressable onPressOut={()=>setSort((prev) => !prev)} style={{ flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Image source={images.sort} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                            <Text style={{color:theme.text, fontSize: 10}}>Sort</Text>
                            {sort && 
                            <View style={{position:'absolute', top:50, right:0, width:150, height:50, borderWidth:1, borderColor:'#ffffff', backgroundColor:theme.background}}>
                                <Pressable onPressOut={()=> SetIsSortedByDueDate(true)}>
                                    <Text style={{fontSize:15, color:'#ffffff', borderBottomWidth: 1, borderBottomColor:'#ffffff', padding:2}}> Sort by due date</Text>
                                </Pressable>
                                <Pressable onPressOut={()=> SetIsSortedByDueDate(false)}>
                                    <Text style={{fontSize:15, color:'#ffffff', padding:2}}> Sort by added date</Text>
                                </Pressable>
                            </View>
                            }
                        </Pressable>                    
                    </View>
                </View>
            </View>

            <ScrollView width={width-20}>
            <Text width={width} style={{textAlign:"center",textAlignVertical:'auto', color:theme.text, fontSize:25,padding:5}}>----uncompleted----</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_false).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} toggleSelect={_toggleSelect} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            <Text width={width} style={{textAlign:"center",textAlignVertical:'auto', color:theme.text, fontSize:25,padding:5}}>----completed----</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_true).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} toggleSelect={_toggleSelect} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            </ScrollView>

            <View style={{position:'absolute', bottom: 0, flexDirection:'row', justifyContent:'space-between', paddingBottom: 20}} width={width-60}>
                <Pressable 
                    onPress={() => navigation.navigate('Add')}
                    style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:theme.text, padding:8, margin:0}}>
                    <Image source={images.add} style={{tintColor: theme.text, width: 40, height: 40,padding:0, margin:0}}/>
                </Pressable>
            </View>
            {select &&
            <Pressable onPressOut={_deleteSelectedTask} style={{position:'absolute', bottom: 0, textAlign:'center', backgroundColor:'#2c2c2c', width:'100%', height:80, padding:12, margin:0}}>
                <Text width={width} style={{ textAlign:'center', color:theme.text, fontSize:45 ,textAlignVertical:'center'}}>Delete</Text>
            </Pressable>
            }
        </SafeAreaView>) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish = {() => SetIsReady(true)}
            onError = {console.error}
        />
    );
}

/*
{ text ? 
                <ScrollView width={width-20}>
                    { sortedByDueDate ?
                    Object.values(searchedtasks).map((item)=>(
                            <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                    ))
                    :
                    Object.values(searchedtasks).sort(Fn).map(item => (
                        <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                    ))
                    }
                 </ScrollView>
                :
                <ScrollView width={width-20}>
                    { sortedByDueDate ?
                    Object.values(tasks).map((item)=>(
                            <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                    ))
                    :
                    Object.values(tasks).sort(Fn).map(item => (
                        <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                    ))
                    }
                </ScrollView>
            }*/
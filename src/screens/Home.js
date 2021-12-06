import React,{useEffect, useState} from "react";
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


export const Home = () => {

    const width = Dimensions.get('window').width;

    const [tasks, setTasks] = useState({});

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
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    }

    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        //setTasks(currentTasks);
        _saveTasks(currentTasks);
    };

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

    /*const _ChangeOrderUp = (item) =>{
        
        const id = item.id;
        const prev = (parseInt(id) - 1).toString();
        tasks[id].id = prev;
        tasks[prev].id = id;

        const result = Object.values(tasks).sort((a, b) => parseInt(a.id) - parseInt(b.id));
        _saveTasks(result);
        console.warn(tasks[id].id);
    };*/

    //Load Data
    const _loadTasks =  async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }

    useEffect(()=>{
        _loadTasks();
        //console.warn(Object.assign({}, tasks)[0].title)
    },[tasks])


    return isReady ? (
        <SafeAreaView style={ViewStyles.container} >
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>TODO List</Text>
                <Search></Search>
            </View>
            <View style={{flexDirection:'column', zIndex: 2}}>
                <View style={{flexDirection:'row', marginBottom:5, justifyContent:'space-between', height:40}} width={width-20}>
                    <CategoryPicker canModify="false" />
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
            <ScrollView width={width-20} style={{zIndex:0, }}>
                {Object.values(tasks).reverse().map(item => (
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select}/>
                ))}
                <View>
                    <Text style={{ color:theme.text,fontSize:20 ,borderColor:theme.text, borderTopWidth: 3, marginTop:15, paddingTop:10,}}>    Completed(0)</Text>
                    <Text></Text>
                </View>
            </ScrollView>
            <View style={{position:'absolute', bottom: 0, flexDirection:'row', justifyContent:'space-between', paddingBottom: 20}} width={width-60}>
                <Pressable style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:theme.text, padding:8, margin:0}}>
                    <Image source={images.add} style={{tintColor: theme.text, width: 40, height: 40,padding:0, margin:0}}/>
                </Pressable>
            </View>
            {select &&
                <Text width={width} style={{position:'absolute', bottom: 0, textAlign:'center',textAlignVertical:'center',backgroundColor:'#2c2c2c', color:theme.text, fontSize:45, width:'100%', height:80, padding:0, margin:0}}>Delete</Text>
            }
        </SafeAreaView>) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish = {() => SetIsReady(true)}
            onError = {console.error}
        />
    );
};

/*
<Pressable style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:theme.text, padding:8, margin:0}}>
    <Image source={images.calendar} style={{tintColor: theme.text, width: 40, height: 40,padding:0, margin:0}}/>
</Pressable>
*/
import React,{useEffect, useState, Component} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable } from "react-native"
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import CategoryPicker from "../components/CategoryPicker";
import Search from "../components/Search";
import Task from "../components/Task";
import { images } from "../image";
import { theme } from "../theme/theme";
import { ViewStyles, textStyles, barStyles } from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import DragSortableView from "../components/DragSortableView";
import DraggableFlatList from "react-native-draggable-flatlist";

export const Home = ({ navigation }) => {

    const width = Dimensions.get('window').width;

    const [tasks, setTasks] = useState({});
    const [searchedtasks, setSearchedTasks] = useState([]);
    const [text, setText] = useState("");
    const [isReady, SetIsReady] = useState(false);
    const [data, setData] = useState([]);

    const childrenHeight = 60;

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
        setData(Object.entries(tasks));
    }

    const renderItem = () => {
        return (
            Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(sortedByCategory).map((item)=>(
                <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
        ))
        )
    }

    useEffect(()=>{
        const i = Object.values(tasks).filter(item =>(
            item.title.toLowerCase().includes(text.toLowerCase()) //검색text, item text 모두 소문자로 바꿔서 대소문자 상관없이 검색 
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
                            <Pressable style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                                <Image source={images.selectAll} style={{tintColor: '#fffff1', width: 30, height: 30,}}></Image>
                                <Text style={{color:'#fffff1', fontSize: 8.5, paddingTop:2}}>Select All</Text>
                            </Pressable>
                        }
                        <Pressable onPressOut={_selectTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                            <Image source={images.select} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                            <Text style={{color:'#fffff1', fontSize: 10}}>Select</Text>
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
                <DragSortableView 
                    dataSource={data} renderItem={renderItem}
                    parentWidth={width-20} childrenHeight={childrenHeight} scaleStatus={'scaleY'}
                />
            </ScrollView>
            <View style={{position:'absolute', bottom: 0, flexDirection:'row', justifyContent:'space-between', paddingBottom: 20}} width={width-60}>
                <Pressable 
                    onPress={() => navigation.navigate('Add')}
                    style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:theme.text, padding:8, margin:0}}>
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
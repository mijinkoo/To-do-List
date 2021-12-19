<<<<<<< HEAD:src/screens/Home.js
import React,{useEffect, useState, Component, useContext} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable } from "react-native"
=======
import React,{useEffect, useState, Component} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, Switch } from "react-native"
>>>>>>> 7b313bc233a7cfb9bd59a60f04b9aa9a3cda718f:src/screens/Homejs
import IconButton from "../components/IconButton";
import Input from "../components/Input";
import CategoryPicker from "../components/CategoryPicker";
import Search from "../components/Search";
import Task from "../components/Task";
import { images } from "../image";
import { ViewStyles, textStyles, barStyles,  } from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddTask from "./AddTask";
<<<<<<< HEAD:src/screens/Home.js
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components/native";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";

=======
import { ThemeProvider } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../theme";
>>>>>>> 7b313bc233a7cfb9bd59a60f04b9aa9a3cda718f:src/screens/Homejs

export const Home = ({ navigation }) => {

    const width = Dimensions.get('window').width;

    const [ThemeMode, toggleTheme] = useTheme();

    const [tasks, setTasks] = useState({});
    const [searchedtasks, setSearchedTasks] = useState([]);
    const [text, setText] = useState("");
    const [isReady, setIsReady] = useState(false);

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
            item.title.toLowerCase().includes(text.toLowerCase())
        ))
        setSearchedTasks(i);
    },[text])

    useEffect(()=>{
        _loadTasks();
    },[tasks])

<<<<<<< HEAD
<<<<<<< HEAD:src/screens/Home.js
    const [darkMode, setDarkMode] = useState(false); 
    const _toggleTheme = () => {
        setDarkMode((prev)=> !prev);
        setThemeMode(darkMode ? 'light' : 'dark');
    }

    return isReady ? (
        <Container>
=======
=======
    useEffect(()=>{
        //_loadTheme();
        //_saveTheme(themeMode);
        
    },[isDark])

>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
   // themeProvider
   const [isDark, setIsDark] = useState(false);
   const [themeMode, setThemeMode] = useState(lightTheme);
  
   const _toggleSwitch = () => {
       
       if(themeMode == lightTheme){
           setThemeMode(darkTheme)
           //_saveTheme(themeMode)
       }
       else if(themeMode == darkTheme){
           setThemeMode(lightTheme)
           //_saveTheme(themeMode)
       }
       setIsDark(!isDark);
   }

   const _saveTheme = async themeMode => {
        try {
            await AsyncStorage.setItem('themeMode', JSON.stringify(themeMode));
            setThemeMode(themeMode);
        } catch (error) {
            
        }   
   }

   const _loadTheme = async () => {
       const loadedThemeMode = await AsyncStorage.getItem('themeMode');
       setThemeMode(JSON.parse(loadedThemeMode));
   }
    
    return isReady ? (
<<<<<<< HEAD
        <ThemeProvider theme={theme}>
            <SafeAreaView style={ViewStyles.container} >
>>>>>>> 7b313bc233a7cfb9bd59a60f04b9aa9a3cda718f:src/screens/Homejs
=======
        <ThemeProvider theme={themeMode}>
            <SafeAreaView style={[ViewStyles.container, {backgroundColor: themeMode.background}]} >
>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
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
<<<<<<< HEAD
                                <Image source={images.selectAll} style={{tintColor: '#fffff1', width: 30, height: 30,}}></Image>
                                <Text style={{color:'#fffff1', fontSize: 8.5, paddingTop:2}}>Select All</Text>
                            </Pressable>
                        }
                        <Pressable onPressOut={_selectTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                            <Image source={images.select} style={{tintColor: '#fffff1', width: 30, height: 30}}></Image>
                            <Text style={{color:'#fffff1', fontSize: 10}}>Select</Text>
                        </Pressable>
                        <Pressable onPressOut={()=>setSort((prev) => !prev)} style={{ flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Image source={images.sort} style={{tintColor: '#fffff1', width: 30, height: 30}}></Image>
                            <Text style={{color:'#fffff1', fontSize: 10}}>Sort</Text>
                            {sort && 
                            <View style={{position:'absolute', top:50, right:0, width:150, height:50, borderWidth:1, borderColor:'#ffffff', backgroundColor:'#fffff1'}}>
=======
                                <Image source={images.selectAll} style={{tintColor: themeMode.text, width: 30, height: 30,}}></Image>
                                <Text style={{color:themeMode.text, fontSize: 8.5, paddingTop:2}}>Select All</Text>
                            </Pressable>
                        }
                        <Pressable onPressOut={_selectTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                            <Image source={images.select} style={{tintColor: themeMode.text, width: 30, height: 30}}></Image>
                            <Text style={{color:themeMode.text, fontSize: 10}}>Select</Text>
                        </Pressable>
                        <Pressable onPressOut={()=>setSort((prev) => !prev)} style={{ flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Image source={images.sort} style={{tintColor: theme.text, width: 30, height: 30}}></Image>
                            <Text style={{color:themeMode.text, fontSize: 10}}>Sort</Text>
                            {sort && 
                            <View style={{position:'absolute', top:50, right:0, width:150, height:50, borderWidth:1, borderColor: themeMode.opposite, backgroundColor: themeMode.background}}>
>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
                                <Pressable onPressOut={()=> SetIsSortedByDueDate(true)}>
                                    <Text style={{fontSize:15, color: themeMode.text, borderBottomWidth: 1, borderBottomColor: themeMode.opposite, padding:2}}> Sort by due date</Text>
                                </Pressable>
                                <Pressable onPressOut={()=> SetIsSortedByDueDate(false)}>
                                    <Text style={{fontSize:15, color: themeMode.text, padding:2}}> Sort by added date</Text>
                                </Pressable>
                            </View>
                            }
                        </Pressable>                    
                    </View>
                </View>
            </View>

            <ScrollView width={width-20}>
<<<<<<< HEAD
            <Pressable onPressOut={_toggleTheme}>
            <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                DarkMode
            </ThemeToggle>
            <Text style={{width:50, color: 'red'}}> | {darkMode ? '🌚' :'🌞'}</Text>
            </Pressable>
            <View style={{padding: 5, paddingBottom: 10}}>
                <Text width={width} style={{color:'#474747', fontSize:16,padding:5}}>uncompleted</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_false).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            </View>
            <View style={{padding: 5}}>
                <Text width={width} style={{ color:'#474747', fontSize:16,padding:5}}>completed</Text>
=======
            <Text width={width} style={{textAlign:"center",textAlignVertical:'auto', color:themeMode.text, fontSize:25,padding:5}}>----uncompleted----</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_false).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            <Text width={width} style={{textAlign:"center",textAlignVertical:'auto', color: themeMode.text, fontSize:25,padding:5}}>----completed----</Text>
>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_true).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            </View>
            </ScrollView>

            <View style={{position:'absolute', bottom: -12, left:((width-64)/2), flexDirection:'row', justifyContent:'space-between', paddingBottom: 20 }}>
                <Pressable 
                    onPress={() => navigation.navigate('Add')}
<<<<<<< HEAD
                    style={{alignItems:'center', justifyContent:'center',backgroundColor: '#1185b4',borderWidth: 2, borderRadius:90 ,borderColor:'#1185b4',shadowColor:'#bfbfc1', shadowOffset:{width: 0, height: 6}, shadowOpacity: 0.7, shadowRadius: 2.7, padding:8, margin:0}}>
                    <Image source={images.add} style={{tintColor: '#ffffff', width: 40, height: 40,padding:0, margin:0}}/>
=======
                    style={{alignItems:'center', justifyContent:'center',borderWidth: 2, borderRadius:90 ,borderColor:themeMode.text, padding:8, margin:0}}>
                    <Image source={images.add} style={{tintColor: themeMode.text, width: 40, height: 40,padding:0, margin:0}}/>
>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
                </Pressable>
                <Switch value={isDark} onValueChange={_toggleSwitch}/>
            </View>
            
            {select &&
<<<<<<< HEAD
                <Text width={width} style={{position:'absolute', bottom: 0, textAlign:'center',textAlignVertical:'center',backgroundColor:'#2c2c2c', color:'#fffff1', fontSize:45, width:'100%', height:80, padding:0, margin:0}}>Delete</Text>
=======
                <Text width={width} style={{position:'absolute', bottom: 0, textAlign:'center',textAlignVertical:'center',backgroundColor:'#2c2c2c', color: themeMode.text, fontSize:45, width:'100%', height:80, padding:0, margin:0}}>Delete</Text>
>>>>>>> c64d434be328756b86e04f58c9cb16fb9d7bade6
            }
<<<<<<< HEAD:src/screens/Home.js
        </Container>) : (
=======
        </SafeAreaView>
        </ThemeProvider>
        ) : (
>>>>>>> 7b313bc233a7cfb9bd59a60f04b9aa9a3cda718f:src/screens/Homejs
        <AppLoading
            startAsync = {_loadTasks}
            onFinish = {() => setIsReady(true)}
            onError = {console.error}
        />
    );
}

const Container = styled.SafeAreaView`
    flex: 1;
    background: ${({theme})=> theme.background};
    align-items: center;
    justify-content: flex-start;
`;
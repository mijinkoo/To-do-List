import React,{useEffect, useState, Component} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, Switch } from "react-native"
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
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import styled from 'styled-components/native';
import { SuccessRate } from "../components/SuccessRate";

export const Home = ({ navigation }) => {

    const width = Dimensions.get('window').width;


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

   // themeProvider
   const [ThemeMode, toggleTheme] = useTheme();

    const [itemExist, setItemExist] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [success, setSuccess] = useState(0);
    
    const _setEmoji = () => {
        //_successRate(tasks);

        if(success >= 80) {
            setEmoji('😍');
        } else if(success >= 60) {
            setEmoji('😚');
        } else if(success >= 40) {
            setEmoji('🙂');
        } else if(success >= 20) {
            setEmoji('🤔');
        } else if(success >= 0){
            setEmoji('😔');
        }
    }

    const _successRate = tasks => {
        var totalCount = 0;          // 선택한 카테고리의 총 task 수
        var completedCount = 0;      // 선택한 카테고리의 completed task 수
        
        Object.values(tasks).map(item =>
            {
                if (item.category == category) {
                    totalCount += 1;
                    setItemExist(true);
                    if (item.completed) {
                        completedCount += 1;
                    }  
                }        
            }
        )
        if (totalCount == 0) {
            setSuccess(0);
        }
        else if (totalCount > 0) {
            setSuccess((completedCount/totalCount)*100);
        }
    }

    useEffect(()=>{
        setItemExist(false);
        _successRate(tasks);
    }, [category]);

    useEffect(()=>{
        _setEmoji();
    },[success])
    
    return isReady ? (
            <Container>
            <StatusBar barStyle="light-content" style={barStyles.statusbar}/>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>TODO List</Text>
                <Search  setText={setText} ></Search>
                {/*<Switch value={isDark} onValueChange={_toggleSwitch}/>*/}
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
                            <Image source={images.select} style={{tintColor: '#fffff1', width: 30, height: 30}}></Image>
                            <Text style={{color:'#fffff1', fontSize: 10}}>Select</Text>
                        </Pressable>
                        <Pressable onPressOut={()=>setSort((prev) => !prev)} style={{ flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Image source={images.sort} style={{tintColor: '#fffff1', width: 30, height: 30}}></Image>
                            <Text style={{color:'#fffff1', fontSize: 10}}>Sort</Text>
                            {sort && 
                            <View style={{position:'absolute', top:50, right:0, width:150, height:50, borderWidth:1, borderColor:'#ffffff', backgroundColor:'#fffff1'}}>
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

            <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                <Text>DarkMode</Text>
            </ThemeToggle>

            <ScrollView width={width-20}>
            <View style={{padding: 5, paddingBottom: 10}}>
                <Text width={width} style={{color:'#474747', fontSize:16,padding:5}}>uncompleted</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_false).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            </View>
            <View style={{padding: 5}}>
                <Text width={width} style={{ color:'#474747', fontSize:16,padding:5}}>completed</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_true).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode="false" navigation={navigation}/>
                ))}
            </View>
            <View style={{padding: 5}}>
                {itemExist ? (
                    <>
                    <Text>{emoji}</Text>
                    <Text>Success {success}%</Text>
                    </>
                ) : ( <>
                </> ) }
            </View>
            </ScrollView>

            <View style={{position:'absolute', bottom: -12, left:((width-64)/2), flexDirection:'row', justifyContent:'space-between', paddingBottom: 20 }}>
                <Pressable 
                    onPress={() => navigation.navigate('Add')}
                    style={{alignItems:'center', justifyContent:'center',backgroundColor: '#1185b4',borderWidth: 2, borderRadius:90 ,borderColor:'#1185b4',shadowColor:'#bfbfc1', shadowOffset:{width: 0, height: 6}, shadowOpacity: 0.7, shadowRadius: 2.7, padding:8, margin:0}}>
                    <Image source={images.add} style={{tintColor: '#ffffff', width: 40, height: 40,padding:0, margin:0}}/>
                </Pressable>
            </View>
            {select &&
                <Text width={width} style={{position:'absolute', bottom: 0, textAlign:'center',textAlignVertical:'center',backgroundColor:'#2c2c2c', color:'#fffff1', fontSize:45, width:'100%', height:80, padding:0, margin:0}}>Delete</Text>
            }
        </Container>
        ) : (
        <AppLoading
            startAsync = {_loadTasks}
            onFinish = {() => setIsReady(true)}
            onError = {console.error}
        />
    );
}

const Container = styled.SafeAreaView`
    flex: 1;
    background: ${props => props.theme.screenBackground};
    align-items: center;
    justify-content: flex-start;
`;
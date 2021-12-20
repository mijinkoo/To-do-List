import React,{useEffect, useState, Component} from "react";
import { StatusBar, Text, View, Dimensions, ScrollView, Image, Pressable,} from "react-native"
import CategoryPicker from "../components/CategoryPicker";
import Search from "../components/Search";
import Task from "../components/Task";
import { images } from "../image";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import styled from 'styled-components/native';
import { Container, Header } from "../styles";
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
        _successRate(currentTasks);
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
    const [isSelectedAll, SetIsSelectedAll] = useState(false);

    const _selectTask = () => {
        if(select){
            Object.values(tasks).forEach(function(item){
                item.selected = false;
            })
            SetIsSelectedAll(false);
            const currentTasks = Object.assign({}, tasks);
            _saveTasks(currentTasks);
        } 
        setSelect((prev) => !prev);
    }

    const _toggleSelect = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['selected'] = !currentTasks[id]['selected'];
        _saveTasks(currentTasks);
    }
    

    const _selectAllTask = () => {
        Object.values(tasks).forEach(function(item){
            item.selected = !isSelectedAll;
        })
        SetIsSelectedAll((prev)=> !prev);
        const currentTasks = Object.assign({}, tasks);
        _saveTasks(currentTasks);
    }


    const _deleteSelectedTask =() => {
        const currentTasks = Object.assign({}, tasks);
        Object.values(tasks).map(item => {
            if(item.selected === true) {
                _deleteTask(item.id)
            }
        })
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

   // themeProvider
   const [ThemeMode, toggleTheme] = useTheme();

   const CurrentMode = ThemeMode[0] === 'light' ? 'light' : 'dark';
   const textColor = CurrentMode === 'light' ? '#313131' : '#ffffff'

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
            <StatusBar hidden={true} />
            <View style={{flexDirection: 'row', width: '100%', height: 50 , }}>
                <View style={{alignItems:'center', justifyContent:'center', width:'100%'}}><Header>My Task</Header></View>
                <Search setText={setText} ></Search>
            </View>
            <View style={{flexDirection:'column', zIndex: 2}}>
                <View style={{flexDirection:'row', marginBottom:5, alignItems:'center',justifyContent:'space-between', height:30, marginTop: 5}} width={width-20}>
                    <CategoryPicker canModify="false" setCategory={setCategory} mini={true}/>
                    <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
                        <Text>DarkMode</Text>
                    </ThemeToggle>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        {select && 
                            <Pressable onPressOut={_selectAllTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10, paddingTop:2}}>
                                <Icon source={images.selectAll}></Icon>
                                <Text style={{color:'#868d95', fontSize: 10,}}>Select All</Text>
                            </Pressable>
                        }
                        <Pressable onPressOut={_selectTask} style={{ alignItems:'center',justifyContent:'center', paddingRight:10}}>
                            <Icon source={images.select}></Icon>
                            <Text style={{color:'#868d95', fontSize: 10}}>Select</Text>
                        </Pressable>
                        <Pressable onPressOut={()=>setSort((prev) => !prev)} style={{ flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <Icon source={images.sort}></Icon>
                            <Text style={{color:'#868d95', fontSize: 10}}>Sort</Text>
                            {sort && 
                            <View style={{position:'absolute', top:40, right:0, width:150, height:50}}>
                                <Pressable onPressOut={()=> SetIsSortedByDueDate(true)} style={{alignItems:'center'}}>
                                    <Text style={{width: 150, fontSize:15, color:'#646672', padding:3, backgroundColor:'#d4d6e2', borderWidth:1, borderColor:'#646672'}}> Sort by due date</Text>
                                </Pressable>
                                <Pressable onPressOut={()=> SetIsSortedByDueDate(false)}  style={{alignItems:'center'}}>
                                    <Text style={{width: 150, fontSize:15, color:'#646672', padding:3, backgroundColor:'#d4d6e2', borderWidth:1, borderColor:'#646672'}}> Sort by added date</Text>
                                </Pressable>
                            </View>
                            }
                        </Pressable>                    
                    </View>
                </View>
            </View>

            <ScrollView width={width-20}>
            <View style={{padding: 5, paddingBottom: 10}}>
                <Text width={width} style={{color:'#474747', fontSize:16,padding:5}}>uncompleted</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_false).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} toggleSelect={_toggleSelect} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode={false} navigation={navigation}/>
                ))}
            </View>
            <View style={{padding: 5}}>
                <Text width={width} style={{ color:'#474747', fontSize:16,padding:5}}>completed</Text>
                {Object.values(text? searchedtasks : tasks).sort(_sortByDueDate).filter(completed_true).filter(sortedByCategory).map((item)=>(
                    <Task key={item.id} item={item} toggleSelect={_toggleSelect} deleteTask={_deleteTask} toggleTask={_toggleTask} updateTask={_updateTask} select={select} calendarMode={false} navigation={navigation}/>
                ))}
            </View>
            <View style={{margin:10, marginTop: 20, alignItems: 'center'}}>
                {itemExist ? (
                    <>
                    <Text style={{fontSize: 30, fontWeight: '400'}}>{emoji}</Text>
                    {/**
                     <Text style={[{fontSize: 17, fontWeight: '400', alignItems: 'flex-end'}, {textColor: (CurrentMode == 'light') ? 'black' : 'white'}]}>Success {success}%</Text>

                     */}
                     </>
                ) : ( <>
                </> ) }
            </View>
            </ScrollView>

            <View style={{position:'absolute', bottom: -12, left:((width-64)/2), flexDirection:'row', justifyContent:'space-between', paddingBottom: 20 }}>
                <AddButton 
                    onPress={() => navigation.navigate('Add')}
                    style={{ borderRadius:90, shadowOffset:{width: 0, height: 6}, shadowRadius: 2.7 }}>
                    <Image source={images.add} style={{tintColor: '#ffffff', width: 40, height: 40,padding:0, margin:0}}/>
                </AddButton>
            </View>
            {select &&
            <Pressable onPressOut={_deleteSelectedTask} style={{position:'absolute', bottom: 0, textAlign:'center', backgroundColor:'#2c2c2c', width:'100%', height:70, paddingTop:10}}>
                <Text width={width} style={{ textAlign:'center', color:'#fffff1', fontSize:38 ,textAlignVertical:'center'}}>Delete</Text>
            </Pressable>
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


const Icon = styled.Image`
    tint-color: #868d95; 
    width: 30px;
    height: 30px;
`;

const AddButton = styled.Pressable`
    align-items: center;
    justify-content: center;
    background-color: #1185b4;
    border-width: 2px; 
    border-color: #1185b4;
    shadow-color:  ${props => props.theme.shadow}; 
    shadow-opacity: 0.7; 
    padding:8px;
`;
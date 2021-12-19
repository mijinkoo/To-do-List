import React,{useState, useEffect} from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import { Image } from "react-native";
import { images } from "../image";
import styled from 'styled-components/native';
import { ThemeProvider } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
/*import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";*/


const Task = ({item, deleteTask, toggleTask, updateTask, select, calendarMode, navigation}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(item.text);
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }
    const _onSubmitEditing = () => {
        if (isEditing) {
            const editedTask = Object.assign({}, item, {text});
            setIsEditing(false);
            updateTask(editedTask);
        }
    }

    const _onBlur = () => {
        if (isEditing) {
            setIsEditing(false);
            setText(item.text);
        }
    }

    const _handleUpdateSelect = () => {
        SetIsSelected((prev) => !prev)
    }

    //let today = (new Date()).format('YYYY / MM / DD'); // 현재 날짜 및 시간
    //const [todayDate, setTodayDate] = useState(today.format('YYYY / MM / DD'));
    let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
    let time = {
      year: today.getFullYear(),  //현재 년
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현재 날짜
    };
    let timestring = ""+time.year+time.month+time.date;

    // select
    const [isSelected, SetIsSelected] = useState(false);

    return (
            <Container onPressOut={() => select ? _handleUpdateSelect : navigation.navigate('Show', {item: item})}>
            {select ? (
                <></>
            ) : (
                <IconButton type={item.completed ? images.completed : images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
            )
            }
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center', width:'73%', paddingLeft:5}}>
                <_Text style={{textDecorationLine: (item.completed? 'line-through': 'none')}}>
                    {item.title}
                </_Text>          
                <_Text style={{color: ( timestring === item.date ) ? 'red' : '#424242' }}> 
                    {( timestring === item.date ) ? 'D-day' : item.date.substring(0,4)+" / "+item.date.substring(4,6)+" / "+item.date.substring(6,8)}
                </_Text>           
            </View>
            <View style={{position:'absolute', right:0,flexDirection:'row'}} calendarMode={calendarMode}>
                {calendarMode === "false" ? 
                    select ||
                        <>
                        {item.completed || (<IconButton type={images.update} onPressOut={_handleUpdateButtonPress
                        , () => select ? _handleUpdateSelect : navigation.navigate('Edit', {item: item})} />)}
                    <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} completed={item.completed}/>
                        </>
                 : 
                    <></>}
            </View>
        </Container>
        
    );
};

const Container = styled.Pressable`
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 65px;
    background: ${({theme}) => theme.taskBackground};
    border-radius: 5px;
    box-shadow: 0px 0px 3px ${({theme}) => theme.shadow};
    shadow-offset: {width: 0, height: 2};
    padding: 5px;
    margin-top: 10px;
    margin-left: 0px;
`;

const _Text = styled.Text`
    font-size: 15;
    color: #7d7d7d;
`;


Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func,
    toggleTask: PropTypes.func,
};

export default Task;
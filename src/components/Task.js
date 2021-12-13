import React,{useState} from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { theme } from "../theme";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import { Image } from "react-native";
import { images } from "../image";
import Input from "./Input";
import { NavigationContainer } from "@react-navigation/native";

const Task = ({item, deleteTask, toggleTask, updateTask, select, ChangeOrderUp, calendarMode, navigation}) => {
    
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

    const _ChangeOrderUp = () =>{
        ChangeOrderUp(item);
    };

    //let today = (new Date()).format('YYYY / MM / DD'); // 현재 날짜 및 시간
    //const [todayDate, setTodayDate] = useState(today.format('YYYY / MM / DD'));
    let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
    let time = {
      year: today.getFullYear(),  //현재 년도
      month: today.getMonth() + 1, // 현재 월
      date: today.getDate(), // 현제 날짜
    };
    let timestring = `${time.year} / ${time.month} / ${time.date}`;

    // select
    const [isSelected, SetIsSelected] = useState(false);

    return (
        <Pressable onPressOut={() => select ? _handleUpdateSelect : navigation.navigate('Show', {item: item})} style={[taskStyles.container, {backgroundColor: (select && isSelected) ? theme.main : theme.itemBackground}]}>
            {select ||
                (calendarMode === false) ? (
                <>
                <View style={{flexDirection:'column'}}>
                    <Pressable onPressOut={_ChangeOrderUp}><Image source={images.up} style={{tintColor: theme.text, width: 30, height: 30}}></Image></Pressable> 
                    <Pressable><Image source={images.down} style={{tintColor: theme.text, width: 30, height: 30}}></Image></Pressable>
                </View>
                <IconButton type={item.completed ? images.completed : images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
                </>
            ) : (
                <>
                <IconButton type={item.completed ? images.completed : images.uncompleted} id={item.id} onPressOut={toggleTask} completed={item.completed}/>
                </>
            )
            }
                {calendarMode === "false" ? (
                    <View>
                        <Text style={[taskStyles.contents, 
                            {color: (item.completed ? theme.done : theme.text)},
                            {textDecorationLine: (item.completed? 'line-through': 'none')}]}>
                            {item.title}
                        </Text>
                        {( timestring == item.date ) ? (
                            <Text style={{fontSize: 15, color: 'red', marginRight:5,}}>D-day</Text>
                           ) : (
                            <Text style={{fontSize: 15, color: theme.text, marginRight:5,}}>{item.date}</Text>
                            )}
                        <Text style={{fontSize: 15, color: theme.text, marginRight:5,}}>{item.category}</Text>
                        <Text style={{fontSize: 15, color: theme.text, marginRight:5,}}>{item.comment}</Text>
                    </View>
                ) : (
                    <View>
                        <Text style={[taskStyles.contents, 
                            {color: (item.completed ? theme.done : theme.text)},
                            {textDecorationLine: (item.completed? 'line-through': 'none')}]}>
                            {item.title}</Text>
                            {( timestring == item.date ) ? (
                                <Text style={{fontSize: 15, color: 'red', marginRight:5,}}>D-day</Text>
                            ) : (
                                <Text style={{fontSize: 15, color: theme.text, marginRight:5,}}>{item.date}</Text>
                            )}
                    </View>
                )
                }
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
        </Pressable>
    );
};

const taskStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        //height:60,
        //backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 5,
        marginTop: 3,
        marginLeft: 0,
    },

    contents: {
        flex: 1,
        fontSize: 24,
        color: theme.text,
        marginLeft: 5,
    }
});

Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func,
    toggleTask: PropTypes.func,
};

export default Task;
import React,{useEffect, useState, Component} from "react";
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, StyleSheet, TextInput } from "react-native"
import IconButton from "../components/IconButton";
import { images } from "../image";
import { ViewStyles, textStyles, barStyles } from '../styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "../components/DatePicker";
import DropDownPicker from 'react-native-dropdown-picker';
import CategoryPicker from "../components/CategoryPicker";
import { NavigationContainer } from "@react-navigation/native";

export const ShowTask = ({route, navigation}) => {

    const {item} = route.params;

    return (
        <SafeAreaView style={ViewStyles.container}>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Text style={textStyles.title}>Show a task</Text>
            </View>
            <View style={{flexDirection:'column'}}>
                <View style={[boxStyles.container, ]}>
                    <Text style={boxStyles.text}>{item.title}</Text>
                </View>
                <View style={[boxStyles.container, ]}>
                    <Text style={boxStyles.text}>{item.date.substring(0,4)+" / "+item.date.substring(4,6)+" / "+item.date.substring(6,8)}</Text>
                </View>
                <View style={[boxStyles.container, ]}>
                    <Text style={boxStyles.text}>{item.category}</Text>
                </View>
                <View style={[boxStyles.container, ]}>
                    <Text style={boxStyles.text}>{item.comment}</Text>
                </View>
            </View>
            <Pressable onPressOut={() => navigation.goBack()} style={{backgroundColor:'#eeeeee', marginTop:20, width:70, height:50, justifyContent:'center',alignItems:'center'}}>
                    <Text style={[boxStyles.text]}>Edit</Text>
            </Pressable>
        </SafeAreaView>)
};


const boxStyles = StyleSheet.create({
    container: {
        fontSize: 25,
        width: Dimensions.get('window').width-100,
        height: 40,
        //marginTop: 10,
        //marginLeft: 3,
        //paddingLeft: 15,
        //paddingTop: 2,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#eeeeee',
    },
    text: {
        color: '#fffff1',
        fontSize: 25,
    }
});

export default ShowTask;
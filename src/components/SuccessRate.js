import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { theme } from '../theme';
import { TextStyle } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        //backgroundColor: theme.background,
    },
    box: {
        margin: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datetext: {
        fontSize: 20,
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        //color: theme.text,
    },
    success: {
        alignItems: 'flex-end',
    },
    emoji: {
        alignItems: 'center',
        fontSize: 30,
        fontWeight: '400',
    },
});

export const SuccessRate = (tasks, category) => {

    //const [tasks, setTasks] = useState(tasks);
    const [success, setSuccess] = useState(0);
    const [itemExist, setItemExist] = useState(false);
    const [emoji, setEmoji] = useState('');
    
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
        _successRate(tasks);
    }, []);

    useEffect(()=>{
        _setEmoji();
    },[success])

    return (
        <View style={styles.box}>
                {itemExist ? (
                    <>
                    <Text style={[styles.emoji]}>{emoji}</Text>
                    <Text style={[styles.text, styles.success, {color: 'blue'}]}>Success {success}%</Text>
                    </>
                ) : ( <>
                </> ) }
        </View>
    )
}
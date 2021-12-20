import React,{ useState} from "react";
import { SafeAreaView, Text, View, Dimensions, Pressable, StyleSheet, TextInput } from "react-native"
import { ViewStyles, textStyles, barStyles } from '../styles';
import styled from "styled-components/native";
import { Container, Header } from '../styles';

export const ShowTask = ({route, navigation}) => {

    const {item} = route.params;

    return (
        <Container>
            <View style={{flexDirection: 'row', width: '100%' , justifyContent:'center'}}>
                <Header>Show a task</Header>
            </View>
            <View style={{marginTop: 20, width:'80%', alignItems:'center'}}>
                <TextField>
                    <_Text>{item.title}</_Text>
                </TextField>
                <TextField>
                    <_Text>{item.category}</_Text>
                </TextField>
                <TextField>
                    <_Text>{item.date.substring(0,4)+" / "+item.date.substring(4,6)+" / "+item.date.substring(6,8)}</_Text>
                </TextField>
                <TextField style={{height:100}}>
                    <_Text>{item.comment}</_Text>
                </TextField>
            </View>
            <Pressable onPressOut={()=> navigation.navigate('Edit', {item: item})} style={{backgroundColor: '#1185b4', width:100, height: 40,marginTop: 50, paddingTop: 4, borderRadius:20}}>
                    <Text style={[boxStyles.text]}>Edit</Text>
            </Pressable>
        </Container>)
};


const boxStyles = StyleSheet.create({
    text: {
        textAlign:'center',
        textAlignVertical:'center',
        fontSize: 25,
        color: '#ffffff',
    }
});

const TextField = styled.View`
    justify-content: center;
    background-color: ${props => props.theme.box};
    width: 100%;
    height: 40px;
    margin-top: 30px
    padding-left: 20px;
`;

const _Text = styled.Text`
    color: #646672;
    font-size: 20px;
`;

export default ShowTask;
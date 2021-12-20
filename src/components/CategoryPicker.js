import React,{useState, useEffect} from "react";
import { Pressable, StyleSheet, View, Image, Text, Dimensions, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from 'prop-types';
import Input from "./Input";
import { images } from "../image";
import IconButton from "./IconButton";
import Category from "./Category";
import AppLoading from "expo-app-loading";
import styled from 'styled-components/native';
import { CategoryContainer, smallPicker, bigPicker, CategoryEditor } from "../styles";

const CategoryPicker = ({canModify, setCategory, mini, item}) => {

    const [newValue, setNewValue] = useState('');
    const [label, setLabel] = useState(item ? item.category :'Category');

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState({
        '1': {id:'1', label: 'All', value: 'All', },
        '2': {id:'2', label: 'Study', value: 'Study', },
        '3': {id:'3', label: 'Appointment', value: 'Appointment',},
        '4': {id:'4', label: 'Project', value: 'Project', }
    });

    const _onPressOutCategoryPicker = () =>{
        setOpen((prev) => !prev);
        /*setIsCategoryOpen(open);*/
    }

    const _updateCategory = item => {
        const currentTasks = Object.assign({}, items);
        currentTasks[item.id] = item;
        _saveCategories(currentTasks);
    };

    const _deleteCategory = id => {
        const currentTasks = Object.assign({}, items);
        delete currentTasks[id];
        _saveCategories(currentTasks);
    };

    const _saveCategories = async items => {
        try {
            await AsyncStorage.setItem('categories', JSON.stringify(items));
            setItems(items);
        } catch (e) {
            console.error(e);
        }
    }

    const _addCategory = async() => {
        await _loadCategories();
        const ID = Date.now().toString();
        const categoryObject = {
            [ID]: {id: ID, label: newValue, value: newValue},
        };
        setAddCategory(false);
        setNewValue('');
        _saveCategories({...items, ...categoryObject});
    };

    const _loadCategories =  async () => {
        const loadedCategories = await AsyncStorage.getItem('categories');
        setItems(JSON.parse(loadedCategories || '{}'));
    }

    const [isLoading, SetIsLoading] = useState(false);

    const [addCategory, setAddCategory] = useState(false);
    
    const _onPressOutAdd = () =>{
        setAddCategory(true)
    }


    const _onBlur = () => {
        if (addCategory) {
            setAddCategory(false);
            setNewValue('');
        }
    }
    

    useEffect(()=>{
        if(setCategory){
            setCategory(label)
        }
        setOpen(false);
    },[label])

    useEffect(()=>{
        _loadCategories();
    },[items])

    const itemStyle = mini ? smallPicker.item : bigPicker.item;
    const textStyle = mini ? smallPicker.text : bigPicker.text;

    const height = (Object.values(items).length + 3) * (mini ? 30 : 40)

    return  isLoading ? (
        <View style={{width : mini ? 110 : '100%', zIndex:100, height: open ? height : mini ? 30 : 40}}>
            <CategoryContainer onPressOut={(_onPressOutCategoryPicker)} style={itemStyle}>
                <Text style={textStyle}>{label}</Text>
            </CategoryContainer>
        
            {open ? 
            <View style={{position:'absolute', top: mini ? 30: 40, width:'100%'}}>
                <CategoryContainer onPressOut={()=>setLabel("All")} style={itemStyle}>
                    <Text style={textStyle}>All</Text>
                </CategoryContainer>

                {Object.values(items).map(item =>(
                    <Category key={item.id} item={item} deleteCategory={_deleteCategory} updateCategory={_updateCategory} setLabel={setLabel} canModify={canModify} mini={mini}/>
                ))}
                {addCategory ?
                    <CategoryEditor value={newValue} autoFocus={true} onChangeText={value=>setNewValue(value)} onSubmitEditing={_addCategory} onBlur={_onBlur}/>
                    :
                    (canModify === "true") ? 
                        <CategoryContainer style={itemStyle} onPressOut={_onPressOutAdd} >
                            <Text style={textStyle}>Add</Text> 
                        </CategoryContainer>: <></> 
                } 
            </View>
            :
                <></>
            }
        </View>

    ): 
    <AppLoading
            startAsync = {_loadCategories}
            onFinish = {() => SetIsLoading(true)}
            onError = {console.error}
    />
};




export default CategoryPicker;
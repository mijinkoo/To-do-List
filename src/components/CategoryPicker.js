import React,{useState, useEffect} from "react";
import { Pressable, StyleSheet, View, Image, Text, Dimensions, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from 'prop-types';
import Input from "./Input";
import { images } from "../image";
import IconButton from "./IconButton";
import Category from "./Category";
import AppLoading from "expo-app-loading";

const CategoryPicker = ({canModify, setCategory, width, setIsCategoryOpen}) => {

    const _width = width ? width : null;
    const [newValue, setNewValue] = useState('');
    const [label, setLabel] = useState('Category');
    //const [isEditing, setEditing] = useState(false);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState({
        '1': {id:'1', label: 'All', value: 'All', },
        '2': {id:'2', label: 'Study', value: 'Study', },
        '3': {id:'3', label: 'Appointment', value: 'Appointment',},
        '4': {id:'4', label: 'Project', value: 'Project', }
    });

    const _onPressOutCategoryPicker = () =>{
        setOpen((prev) => !prev);
        setIsCategoryOpen(open);
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
        console.warn(categoryObject)
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

    return  isLoading ? (
        <View style={{width : _width ? _width : '100%' , position:'relative'}}>
            <Pressable style={pickerStyles.item} onPressOut={(_onPressOutCategoryPicker)}>
                <Text style={pickerStyles.text}>{label}</Text>
            </Pressable>
        
            {open ? 
            <View style={{position:'absolute', top:30, width:'100%'}}>
                <Pressable style={pickerStyles.item} onPressOut={()=>setLabel("All")}>
                    <Text style={pickerStyles.text}>All</Text>
                </Pressable>

                    {Object.values(items).map(item =>(
                        <Category key={item.id} item={item} deleteCategory={_deleteCategory} updateCategory={_updateCategory} setLabel={setLabel} canModify={canModify}/>
                    ))}
                    {addCategory ? 
                        <View style={pickerStyles.item}>
                            <TextInput value={newValue} onChangeText={value=>setNewValue(value)} onSubmitEditing={_addCategory} onBlur={_onBlur} style={{backgroundColor:'#3c5c5a', height: 40, width: 100}}/>
                        </View>
                        :
                        (canModify === "true") ? <Pressable style={pickerStyles.item} onPressOut={_onPressOutAdd} >
                            <Text style={pickerStyles.text}>Add</Text> 
                        </Pressable>: <></>  } 
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

const pickerStyles = StyleSheet.create({
    
    item: {
        backgroundColor: '#d4d6e2',
        color: '#fffff1',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        width: '100%',
        height: 30,
    },
    text: {
        color: '#fffff1',
        fontSize: 17,
    }
});

export default CategoryPicker;
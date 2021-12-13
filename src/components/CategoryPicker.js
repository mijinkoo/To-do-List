import React,{useState, useEffect} from "react";
import { Pressable, StyleSheet, View, Image, Text, Dimensions, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../theme";
import PropTypes from 'prop-types';
import Input from "./Input";
import { images } from "../image";
import IconButton from "./IconButton";
import Category from "./Category";

const CategoryPicker = ({canModify, setCategory}) => {

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
        setOpen((prev) => !prev)
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

    useEffect(()=>{
        _loadCategories();
        SetIsLoading(true);
    },[])

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
        <View >
            <Pressable style={pickerStyles.item} onPressOut={(_onPressOutCategoryPicker)}>
                <Text style={pickerStyles.text}>{label}</Text>
            </Pressable>
        
            {open ? 
            <View style={{position:'absolute', top:40, width:'100%'}}>
                    {Object.values(items).map(item =>(
                        <Category key={item.id} item={item} deleteCategory={_deleteCategory} updateCategory={_updateCategory} setLabel={setLabel} canModify={canModify}/>
                    ))}
                    {addCategory ? 
                        <View style={pickerStyles.item}>
                        <TextInput value={newValue} onChangeText={value=>setNewValue(value)} onSubmitEditing={_addCategory} onBlur={_onBlur} style={{backgroundColor:'#3c5c5a', height: 40,}}/>
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
    <Text>Loading</Text>
};

const pickerStyles = StyleSheet.create({
    
    item: {
        backgroundColor: '#eeeeee',
        color: theme.main,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        width: '100%',
        height: 40,
        paddingLeft:10
    },
    text: {
        color: theme.main,
        fontSize: 25,
    }
});

export default CategoryPicker;
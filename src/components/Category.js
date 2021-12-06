import React,{useEffect, useRef, useState,} from "react";
import { Pressable, StyleSheet, View, Image, Text, Dimensions, TextInput, } from "react-native";
import { images } from "../image";
import { theme } from "../theme";
import IconButton from "./IconButton";

const Category = ({item, deleteCategory, updateCategory, canModify, setLabel}) =>{

    const [value, setValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }

    const _onSubmitEditing = () => {
        if (isEditing) {
            const label = value;
            const editedCategory = Object.assign({}, item, {value}, {label});
            setIsEditing(false);
            updateCategory(editedCategory);
        }
    }

    const _onBlur = () => {
        if (isEditing) {
            setIsEditing(false);
            setText(item.label);
        }
    }

    const [selected, setSelected] = useState('');

    const mounted = useRef(false);

    useEffect(()=>{
        if (!mounted.current) {
            mounted.current = true;
          } else {
            setLabel(selected)
        }
    },[selected])

    return isEditing ?(
        <>
            <TextInput value={value} onChangeText={value=>setValue(value)} onSubmitEditing={_onSubmitEditing} onBlur={_onBlur}/>
            <Text style={{color: theme.main,}}>{isEditing}</Text>
        </>
        ):(
        <>
            <Pressable style={listStyles.item} onPressOut={()=>setSelected(item.label)}>
                <Text style={listStyles.text}>{item.label}</Text>
                {(canModify === "true") ?<>
                <IconButton type={images.update} id={item.id} onPressOut={_handleUpdateButtonPress}/>
                <IconButton type={images.delete} id={item.id} onPressOut={deleteCategory}/></>
                :
                <></>}
            </Pressable>
        </>
    )
}

const listStyles = StyleSheet.create({
    item: {
        backgroundColor: '#eeeeee',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        fontSize: 20,
        height: 50,
    },
    text: {
        color: theme.main,
        fontSize: 25,
    }
});

export default Category;
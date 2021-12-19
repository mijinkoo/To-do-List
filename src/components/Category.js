import React,{useEffect, useRef, useState,} from "react";
import { Pressable, StyleSheet, View, Image, Text, Dimensions, TextInput, } from "react-native";
import { images } from "../image";
import IconButton from "./IconButton";

const Category = ({item, deleteCategory, updateCategory, canModify, setLabel}) =>{

    const [value, setValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }

    const _onSubmitEditing = () => {
        if (isEditing) {
            const label = (value === "Category") ? All : value;
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
            <Text style={{color: '#fffff1',}}>{isEditing}</Text>
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
        backgroundColor: '#d4d6e2',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        height: 30,
    },
    text: {
        color: '#646672',
        fontSize: 17,
    }
});

export default Category;
import React,{useEffect, useRef, useState,} from "react";
import { Pressable, StyleSheet, View, Image, Text, Dimensions, TextInput, } from "react-native";
import { images } from "../image";
import IconButton from "./IconButton";
import { CategoryContainer, smallPicker, bigPicker, CategoryEditor } from "../styles";

const Category = ({item, deleteCategory, updateCategory, canModify, setLabel, mini}) =>{

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

    const itemStyle = mini ? smallPicker.item : bigPicker.item;
    const textStyle = mini ? smallPicker.text : bigPicker.text;

    return isEditing ?(
        <>
            <CategoryEditor value={value} autoFocus={true} onChangeText={value=>setValue(value)} onSubmitEditing={_onSubmitEditing} onBlur={_onBlur}/>
        </>
        ):(
        <>
            <CategoryContainer style={[itemStyle]} onPressOut={()=>setSelected(item.label)}>
                <Text style={textStyle}>{item.label}</Text>
                {(canModify === "true") ?
                    <View style={{flexDirection:'row'}}>
                        <IconButton type={images.update} id={item.id} onPressOut={_handleUpdateButtonPress}/>
                        <IconButton type={images.delete} id={item.id} onPressOut={deleteCategory}/>
                    </View> :<></>
                }
            </CategoryContainer>
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
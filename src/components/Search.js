import React, { useState } from "react";
import { Pressable, Image, StyleSheet, View, Dimensions } from "react-native";
import { images } from "../image";
import Input from "./Input";

const Search = ({setText}) => {

    const [search, setSearch] = useState(false);
    const [word, setWord] = useState("");

    const _onSearch = () =>{
        setSearch((prev) => !prev); //전 상태를 불러와서 false면 true, true면 false로 변경
    }

    const _onChangeSearchWord = word => {
        setWord(word);
    }
    
    const _onSubmitSearchword = (e) =>{
        setText(word);
    }

    const _onSearchClose=()=>{
        setSearch((prev) => !prev);
        setWord('');
        setText('');
    }

    return(
        <View style={searchStyles.container}>
            {search && 
                <View style={searchStyles.searchbar}>
                    <Pressable onPressOut={_onSearchClose}>
                        <Image source={images.close} style={searchStyles.icon}/>
                    </Pressable> 
                    <Input value={word} onChangeText={_onChangeSearchWord} onSubmitEditing={_onSubmitSearchword} placeholder={"Enter a search word"}/>
                    </View>
            }
            <Pressable onPressOut={_onSearch} style={{ position:'absolute',  right:0,}}>
                <Image source={images.search} style={searchStyles.searchicon}/>
            </Pressable>
        </View>
    );
};

const searchStyles = StyleSheet.create({
    container: {
        position:'absolute', top:-3, right:0,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#868d95',
        width: '100%',
        height: 65,
        marginRight: 5
    },

    searchbar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        color: 'black',
        width: '100%',
        height: 50,
        margin: 0,
        paddingLeft: 10,

    },

    icon: {
        tintColor: '#868d95',
        width: 35,
        height: 35,
    },

    searchicon: {
        tintColor: '#868d95',
        width: 35,
        height: 35,
    },
});

export default Search;
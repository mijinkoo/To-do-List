import React, { useState } from "react";
import { Pressable, Image, StyleSheet, View, Dimensions } from "react-native";
import { theme } from "../theme";
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

    return(
        <View style={searchStyles.container}>
            {search && 
                <View style={searchStyles.searchbar}>
                    <Pressable >
                        <Image source={images.close} style={searchStyles.icon}/>
                    </Pressable> 
                    <Input value={word} onChangeText={_onChangeSearchWord} onSubmitEditing={_onSubmitSearchword}/>
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
        position:'absolute', top:0, right:0,
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.main,
        width: '100%',
        height: 50,
        marginTop: 1.5,
    },

    searchbar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.background,
        borderRadius: 10,
        color: theme.main,
        width: '100%',
        height: 50,
        margin: 0,
        paddingLeft: 10,

    },

    icon: {
        tintColor: theme.text,
        width: 40,
        height: 40,
    },

    searchicon: {
        tintColor: theme.text,
        width: 40,
        height: 40,
    },
});

export default Search;
import React, { useState } from "react";
import { Pressable, Image, StyleSheet, View, Dimensions } from "react-native";
import { theme } from "../theme";
import { images } from "../image";
import Input from "./Input";

const Search = () => {

    const width = Dimensions.get('window').width;
    const [search, setSearch] = useState(false);
    const [text, setText] = useState("");

    const _onSearch = () =>{
        setSearch((prev) => !prev); //전 상태를 불러와서 false면 true, true면 false로 변경
    }

    return(
        <View style={searchStyles.container}>
            {search && 
                <View style={searchStyles.searchbar}>
                    <Pressable >
                        <Image source={images.close} style={searchStyles.icon}/>
                    </Pressable> 
                    <Input value={text} onChangeText={text=>setText(text)}/>
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
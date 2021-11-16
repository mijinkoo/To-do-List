import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "../theme";
import PropTypes from 'prop-types';
import IconButton from "./IconButton";
import { images } from "../image";

const Task = ({item, deleteTask}) => {
    return (
        <View style={taskStyles.container}>
            <IconButton type={images.uncompleted}/>
            <Text style={taskStyles.contents}>{item.text}</Text>
            <IconButton type={images.update}/>
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask}/>
        </View>
    )
}

const taskStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.itemBackground,
        borderRadius: 10,
        padding: 5,
        marginTop: 3,
        marginLeft: 0,
    },

    contents: {
        flex: 1,
        fontSize: 24,
        color: theme.text,
    }
});

Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default Task;
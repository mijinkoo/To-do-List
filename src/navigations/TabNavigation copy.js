import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { CalendarPickerScreen } from '../screens/CalendarPickerScreen';
import { theme } from '../theme';
import { ThemeProvider } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

const TabStyles = ({
    tabBar: {
        //backgroundColor: theme.background,
        //borderTopColor: theme.white, 
        borderTopwidth: 2,
    }
})

const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {


    return (
        <ThemeProvider theme={themeMode}>
            <Tab.Navigator screenOptions={{
                //tabBarActiveTintColor: theme.main,
                tabBarStyle: {
                    backgroundColor: 'blue'
                }
            }}>
                <Tab.Screen name="TODO List" component={Home}
                            options={{
                                headerShown: false,
                                tabBarIcon: props => TabIcon({ ...props, name: 'calendar-check'}),
                            }}/>
                <Tab.Screen name="Calendar" component={CalendarPickerScreen}
                            options={{
                                headerShown: false,
                                tabBarIcon: props => TabIcon({ ...props, name: 'calendar'}),
                            }}/>
            </Tab.Navigator>
        </ThemeProvider>
        
    );
};

export default TabNavigation;
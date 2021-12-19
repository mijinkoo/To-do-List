import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { CalendarPickerScreen } from '../screens/CalendarPickerScreen';
import { theme } from '../theme';

const TabStyles = ({
    tabBar: {
        backgroundColor: theme.background,
        borderTopColor: theme.white, 
        borderTopwidth: 2,
    }
})

const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{
            //tabBarActiveTintColor: theme.main,
            tabBarStyle: {
                backgroundColor: theme.background
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
    );
};
export default TabNavigation;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MonthlyCalendar } from '../screens/MonthlyCalendar';
import { Home } from '../screens/Home';
import {AddTask} from '../screens/AddTask';
import {MaterialCommunityIcons} from '@expo/vector-icons';


const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="TODO List" component={Home}
                        options={{
                            headerShown: false,
                            tabBarIcon: props => TabIcon({ ...props, name: 'calendar-check'}),
                        }}/>
            <Tab.Screen name="Calendar" component={MonthlyCalendar}
                        options={{
                            //headerShown: false,
                            tabBarIcon: props => TabIcon({ ...props, name: 'calendar'}),
                        }}/>
            <Tab.Screen name="AddTask" component={AddTask}
                        options={{
                            //headerShown: false,
                            tabBarIcon: props => TabIcon({ ...props, name: 'calendar'}),
                        }}/>
        </Tab.Navigator>
    );
};

export default TabNavigation;
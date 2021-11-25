import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Calendario } from '../screens/Calendario';
import { Add } from '../screens/AddTaskScreen';
import { Home } from '../screens/Home';
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
                            tabBarIcon: props => TabIcon({ ...props, name: 'home'}),
                        }}/>
            <Tab.Screen name="Add a task" component={Add}
                        options={{
                            tabBarIcon: props => TabIcon({ ...props, name: 'plus'}),
                        }}/>
            <Tab.Screen name="Calendar" component={Calendario}
                        options={{
                            tabBarIcon: props => TabIcon({ ...props, name: 'calendar'}),
                        }}/>
        </Tab.Navigator>
    );
};

export default TabNavigation;
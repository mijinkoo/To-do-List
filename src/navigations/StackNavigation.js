import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import AddTask from '../screens/AddTask';
import { NavigationContainer } from '@react-navigation/native';
import { CalendarPickerScreen } from '../screens/CalendarPickerScreen';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = "TODO" 
                component={TabNavigation}
                options={{headerShown: false}} />
            <Stack.Screen 
                name = "Add"
                component={AddTask} 
                options={{
                    headerShown: false, // 헤더 감추기
                    headerTitle:'Add a task',
                    headerBackTitleVisible: true,
                    headerBackTitle: 'TODO',
                    headerTitleStyle: {fontSize: 24},
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigation;
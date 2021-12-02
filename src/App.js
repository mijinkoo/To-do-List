import React from "react";
import TabNavigation from "./navigations/TabNavigation";
import StackNavigation from './navigations/StackNavigation';
import { NavigationContainer } from "@react-navigation/native";

function App() {
    return (
            <NavigationContainer>
                <StackNavigation/>
            </NavigationContainer>
    );
};

// <TabNavigation/>

export default App;
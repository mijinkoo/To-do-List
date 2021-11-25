import React from "react";
import TabNavigation from "./navigations/Tab";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
    return (
            <NavigationContainer>
                <TabNavigation/>
            </NavigationContainer>
    );
};
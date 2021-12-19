import React, { useEffect, useState } from "react";
import TabNavigation from "./navigations/TabNavigation";
import StackNavigation from './navigations/StackNavigation';
import { NavigationContainer } from "@react-navigation/native";
import { light, dark } from "./theme";
import { ThemeProvider } from "./context/ThemeContext";

function App() {

    const [themeMode, setThemeMode] = useState('light');

    return (
            <ThemeProvider>
                <NavigationContainer >
                    <StackNavigation/>
                </NavigationContainer>
            </ThemeProvider>
    )
};

export default App;
import React, { useEffect, useState } from "react";
import TabNavigation from "./navigations/TabNavigation";
import StackNavigation from './navigations/StackNavigation';
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/ThemeContext";
//import { GlobalStyle } from "./theme/GlobalStyle";

function App() {

    return (
        <ThemeProvider>
            <NavigationContainer >
                <StackNavigation/>
            </NavigationContainer>
        </ThemeProvider>
    )
};

export default App;
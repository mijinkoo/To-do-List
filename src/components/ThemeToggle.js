import React from 'react';
import { StatusBar, SafeAreaView, Text, View, Dimensions, ScrollView, Image, Pressable, Switch } from "react-native"
import styled from 'styled-components/native';

function ThemeToggle({ toggle, mode }) {
  return (
    <ToggleWrapper onPressOut={toggle} mode={mode}>
      <Text>{mode === 'dark' ? '🌑' : '☀️'}</Text>
    </ToggleWrapper>
  );
}

export default ThemeToggle;

const ToggleWrapper = styled.Pressable`
  position: relative;
  z-index: 999999;

  background-color: ${props => props.theme.background};
  border: ${props => props.theme.background};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  border-radius: 30px;
  margin-right: 35px;
`;

/*box-shadow: ${
    props => props.mode === 'dark' ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
    : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'
  }*/
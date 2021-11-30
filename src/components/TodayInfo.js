import React from "react";
import { View, Text } from "react-native";
import { CalendarStyles } from "../styles";

export const TodayInfo = () => {
    let now = new Date(); // 현재 날짜 및 시간
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    const week = ['SUN', 'MON', 'TUE', 'THU', 'FRI', 'SAT'];
    let dayOfWeek = week[now.getDay()];

    return (
        <View>
            <Text style={CalendarStyles.date}>
                {todayYear}/{todayMonth}/{todayDate}{" "}
                <Text style={CalendarStyles.day}>
                    {dayOfWeek}
                </Text>
            </Text>
        </View>
        
    )
};
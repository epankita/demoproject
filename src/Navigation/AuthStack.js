import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../constants/navigationStrings";
import {Login,Signup } from "../Screens";

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name={navigationStrings.LOGIN} component={Login} />
        <Stack.Screen name={navigationStrings.SIGNUP} component={Signup} />

      </Stack.Navigator>
    );
  }

import React, { useEffect,useState } from 'react';

import { LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
 import {Login,Home,Splash,Forgot,EditProduct } from "../Screens";
 import navigationStrings from "../constants/navigationStrings";
 import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack'
import MainStack from './MainStack'

 LogBox.ignoreAllLogs();
 const Stack = createStackNavigator();
export default function Routes() {
  const {user,setUser} =React.useContext(AuthContext)
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(user) {
    setUser(user);
    
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  return (
    <NavigationContainer >
        {user? MainStack(): AuthStack() }
    </NavigationContainer>
    // <NavigationContainer>
    //    <Stack.Navigator screenOptions={{headerShown: false}} >
    //     <Stack.Screen name={navigationStrings.SPLASH} component={Splash} />

    //     <Stack.Screen name={navigationStrings.HOME} component={Home} />
    //     <Stack.Screen name={navigationStrings.EDITPRODUCT} component={EditProduct} />

    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}


//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from './src/Navigation/Routes';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AuthProvider } from './src/Navigation/AuthProvider';

const App = () => {

useEffect(()=>{
  (async()=>{
    const userData = await getUserData()
    console.log("user data App.js",userData)
    if(!!userData){
      saveUserData(userData)
    }  
  })();
},[])


  return (
    <Provider store={store}>
      <AuthProvider>
      <Routes />
      <FlashMessage
        position="top"
      />
      </AuthProvider>
    </Provider>
  );
};

export default App;

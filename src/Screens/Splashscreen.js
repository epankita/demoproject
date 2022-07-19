import React, { useState, useEffect } from 'react';
import {  View, StyleSheet, Image, StatusBar } from 'react-native';
import colors from "../styles/colors";
// import AsyncStorage from '@react-native-community/async-storage';

const Splashscreen = props => {
  let [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
         props.navigation.navigate(
         'Home'
        )
      //       AsyncStorage.getItem('user_id').then(value =>
      //   props.navigation.navigate(
      //    'Loginscreen'
      //   )
      // );
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {
          <StatusBar backgroundColor={colors.themeColor} barStyle="light-content"/>
      }
      <Image
        source={require('../assets/images/logo.png')}
        style={{ resizeMode: 'center'}}
      />
          </View>
  );
};
export default Splashscreen;

const styles = StyleSheet.create({
  container: {
      backgroundColor: "white",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
  },
});
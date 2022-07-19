import React, { useContext, useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import navigationStrings from "../constants/navigationStrings";
import { Home, EditProduct,SaveProduct } from "../Screens";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../Navigation/AuthProvider';

const Stack = createStackNavigator();

export default function MainStack() {
  const { logout, user } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName={Home} screenOptions={{ headerShown: true }} >
      <Stack.Screen name={navigationStrings.HOME} component={Home} options={{
        title: 'Product', headerRight: () => (
          <FontAwesome
          style={{marginRight:4}}
            onPress={() => logout()}
            name="sign-out"
            size={25}
            color="blue"
          />
        ),
      }} />
      <Stack.Screen name={navigationStrings.EDITPRODUCT} component={EditProduct} options={{ title: 'Edit Product' }} />
      <Stack.Screen name={navigationStrings.SAVEPRODUCT} component={SaveProduct} options={{ title: 'Save Product' }} />

    </Stack.Navigator>
  );
}

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CartScreen from '../screens/CartScreen';
import SavedItemsScreen from '../screens/SavedItemsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cart">
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="SavedItemsScreen" component={SavedItemsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

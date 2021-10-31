import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import About from '../screens/About';
import Score from '../screens/Score';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './Navigate';

const Stack = createStackNavigator();


export const RootNavigator = () => {
	return (
		<NavigationContainer ref={navigationRef}>
	<Stack.Navigator initialRouteName={'Home'}>
		<Stack.Screen name={'Home'} component={Home} />
		<Stack.Screen name={'About'} component={About} />
		<Stack.Screen name={'Score'} component={Score} />
	</Stack.Navigator>
	</NavigationContainer>
	);
};
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { RootNavigator } from './navigators/RootNavigator';

const App = () => {

  return (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
  )
    };

export default App;

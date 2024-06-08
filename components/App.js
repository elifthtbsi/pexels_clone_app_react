import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Favorites from './Favorites'; // Favoriler komponentini import et
import TabLayout from './TabLayout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favorites" component={Favorites} /> {/* Favoriler sayfası */}
        <Stack.Screen name="Tabs" component={TabLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

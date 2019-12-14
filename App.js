import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import Logo from './src/components/Logo';

const AppNavigator = createStackNavigator(
  {
    Home,
    Detail,
  },
  {
    defaultNavigationOptions: {
      headerTitle: () => <Logo />,
    },
  },
);

export default createAppContainer(AppNavigator);

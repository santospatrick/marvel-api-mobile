import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import Logo from './src/components/Logo';
import WebPage from './src/pages/WebPage';

const AppNavigator = createStackNavigator(
  {
    Home,
    Detail,
    WebPage,
  },
  {
    defaultNavigationOptions: {
      headerTitle: () => <Logo />,
      headerStyle: {
        borderBottomWidth: 0,
      },
    },
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
  },
);

export default createAppContainer(AppNavigator);

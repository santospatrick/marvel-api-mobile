import React from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const WebPage = ({ navigation }) => {
  const link = navigation.getParam('link');
  return (
    <WebView source={{ uri: link }} style={{ flex: 1 }} startInLoadingState />
  );
};

export default WebPage;

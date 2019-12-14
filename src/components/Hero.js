import React from 'react';
import { View, Text } from 'react-native';

const Hero = ({ item }) => {
  return (
    <View>
      <Text>Legal: {item.name}</Text>
    </View>
  );
};

export default Hero;

import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

const IconButton = ({ children, style, icon = '', ...rest }) => {
  return (
    <RectButton
      style={[
        {
          borderRadius: 6,
          height: 80,
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        },
        style,
      ]}
      {...rest}
    >
      <Icon name={icon} color="#e71a24" size={24} />
      <Text style={{ color: '#e71a24ff', marginTop: 5 }}>{children}</Text>
    </RectButton>
  );
};

export default IconButton;

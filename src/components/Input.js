import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Input = props => {
  return (
    <View
      style={{
        backgroundColor: '#e71a24',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 20,
      }}
    >
      <Icon name="search1" size={18} color="#fff" />
      <TextInput
        style={{
          marginLeft: 10,
          height: 40,
          flex: 1,
          color: '#fff',
        }}
        autoCorrect={false}
        placeholder="Busque por um herói"
        placeholderTextColor="#fff"
        returnKeyType="search"
        {...props}
      />
    </View>
  );
};

export default Input;

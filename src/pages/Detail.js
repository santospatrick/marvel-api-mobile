import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ActivityIndicator } from 'react-native';
import char from './3dman.json';
import { FlatList } from 'react-native-gesture-handler';
import IconButton from '../components/IconButton.js';
import api from '../services/api.js';

const actions = [
  { icon: 'contacts', label: 'Perfil' },
  { icon: 'barschart', label: 'Wiki' },
  { icon: 'book', label: 'Comics' },
];

const Detail = ({ navigation }) => {
  const [character, setCharacter] = useState(char);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = navigation.getParam('id');
    async function loadCharacter() {
      const response = await api.get(`/v1/public/characters/${id}`);
      const [char] = response.data.data.results;
      setCharacter(char);
      setLoading(false);
    }

    // loadCharacter();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="red" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }}
        style={{ flex: 1 }}
      >
        <FlatList
          data={character.urls}
          numColumns={3}
          contentContainerStyle={{
            flex: 1,
            padding: 5,
            paddingBottom: 20,
            justifyContent: 'flex-end',
          }}
          keyExtractor={item => item.url}
          renderItem={({ item, index }) => (
            <IconButton
              icon={actions[index].icon}
              onPress={() => navigation.navigate('WebPage', { link: item.url })}
            >
              {actions[index].label}
            </IconButton>
          )}
        />
      </ImageBackground>
    </View>
  );
};

export default Detail;

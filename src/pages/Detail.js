import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ActivityIndicator, Text } from 'react-native';
import char from './3dman.json';
import IconButton from '../components/IconButton.js';
import api from '../services/api.js';

const Detail = ({ navigation }) => {
  const [character, setCharacter] = useState(char);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = navigation.getParam('id');
    async function loadCharacter() {
      const response = await api.get(`/v1/public/characters/${id}`);
      const [char] = response.data.data.results;
      setCharacter(char);
      setLoading(false);
    }

    loadCharacter();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="red" />
      </View>
    );
  }

  const [detail, wiki, comics] = character.urls;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }}
        resizeMode="cover"
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: 25,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: 15,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {character.name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="contacts"
              onPress={() =>
                navigation.navigate('WebPage', { link: detail.url })
              }
            >
              Perfil
            </IconButton>
            <IconButton
              icon="barschart"
              style={{ marginHorizontal: 20 }}
              onPress={() => navigation.navigate('WebPage', { link: wiki.url })}
            >
              Wiki
            </IconButton>
            <IconButton
              icon="book"
              onPress={() =>
                navigation.navigate('WebPage', { link: comics.url })
              }
            >
              Comics
            </IconButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Detail;

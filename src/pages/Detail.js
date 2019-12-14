import React, { useState } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import char from './3dman.json';
import { FlatList } from 'react-native-gesture-handler';
import IconButton from '../components/IconButton.js';

const actions = [
  { icon: 'contacts', label: 'Perfil' },
  { icon: 'barschart', label: 'Wiki' },
  { icon: 'book', label: 'Comics' },
];

const Detail = ({ navigation }) => {
  const [character, setCharacter] = useState(char);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        }}
        style={{
          height: 320,
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          data={character.urls}
          numColumns={3}
          contentContainerStyle={{
            flex: 1,
            padding: 5,
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
      </ScrollView>
    </View>
  );
};

export default Detail;

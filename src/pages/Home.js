import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import api from '../services/api';
import { TouchableHighlight } from 'react-native-gesture-handler';
import characters from './characters.json';
import Hero from '../components/Hero';
import Input from '../components/Input';

const Home = ({ navigation }) => {
  const [list, setList] = useState(characters);

  useEffect(() => {
    async function loadCharacters() {
      const response = await api.get('/v1/public/characters', {
        params: {
          limit: 4,
        },
      });

      setList(response.data.data.results);
    }

    // loadCharacters();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Input />
      <FlatList
        style={{ paddingTop: 20 }}
        data={list}
        renderItem={({ item }) => <Hero item={item} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default Home;

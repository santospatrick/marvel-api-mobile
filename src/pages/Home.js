import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import api from '../services/api';
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
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Input />
      <FlatList
        style={{ paddingTop: 15 }}
        data={list}
        renderItem={({ item }) => <Hero navigation={navigation} item={item} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default Home;

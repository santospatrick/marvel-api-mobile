import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import api from '../services/api';
import Hero from '../components/Hero';
import Input from '../components/Input';

const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadCharacters() {
    const response = await api.get('/v1/public/characters', {
      params: {
        limit: 4,
      },
    });

    setList(response.data.data.results);
    setLoading(false);
  }

  function onRefresh() {
    setList([]);
    setLoading(true);
    loadCharacters();
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Input />
      <FlatList
        style={{ paddingTop: 15 }}
        data={list}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        renderItem={({ item }) => <Hero navigation={navigation} item={item} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default Home;

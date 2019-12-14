import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import api from '../services/api';
import Hero from '../components/Hero';
import Input from '../components/Input';

const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  async function loadCharacters() {
    const params = {
      limit: 4,
    };

    if (search) {
      params.name = search;
    }

    const response = await api.get('/v1/public/characters', { params });

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
      <Input
        onChangeText={setSearch}
        value={search}
        onSubmitEditing={loadCharacters}
      />
      <FlatList
        style={{ paddingTop: 15 }}
        data={list}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        renderItem={({ item }) => <Hero navigation={navigation} item={item} />}
        keyExtractor={item => String(item.id)}
        ListEmptyComponent={() => {
          if (loading) return null;
          return (
            <Text
              style={{
                marginHorizontal: 20,
                textAlign: 'center',
                fontSize: 12,
                color: '#333',
              }}
            >
              Nenhum resultado encontrado
            </Text>
          );
        }}
      />
    </View>
  );
};

export default Home;

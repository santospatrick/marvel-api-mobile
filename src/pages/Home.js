import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { View, FlatList, Text } from 'react-native';
import api from '../services/api';
import Hero from '../components/Hero';
import Input from '../components/Input';

const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  async function loadCharacters(reset = false) {
    if (loading) return;

    setLoading(true);
    const newPage = reset ? 1 : page + 1;

    const params = {
      limit: 4,
      offset: (newPage - 1) * 4,
    };

    if (search) {
      params.name = search;
    }

    const response = await api.get('/v1/public/characters', { params });

    setPage(newPage);
    setList(
      reset
        ? response.data.data.results
        : [...list, ...response.data.data.results],
    );
    setLoading(false);
  }

  function onRefresh() {
    setList([]);
    loadCharacters(true);
  }

  function onEndReached() {
    if (loading) return;
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
        onSubmitEditing={() => loadCharacters(true)}
      />
      <FlatList
        style={{ paddingTop: 15 }}
        data={list}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        renderItem={({ item }) => <Hero navigation={navigation} item={item} />}
        keyExtractor={item => String(item.id)}
        onEndReached={debounce(onEndReached, 500)}
        onEndReachedThreshold={0}
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

import React, { useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import api from '../services/api';
import Hero from '../components/Hero';
import Input from '../components/Input';

const PER_PAGE = 4;

const Home = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const flatListRef = useRef(null);

  async function loadCharacters(reset = false) {
    if (loading) return;

    setLoading(true);

    if (!reset) {
      setLoadingMore(true);
    }

    const newPage = reset ? 1 : page + 1;

    const params = {
      limit: PER_PAGE,
      offset: (newPage - 1) * PER_PAGE,
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
    setLoadingMore(false);
  }

  function onRefresh() {
    setList([]);
    loadCharacters(true);
  }

  function onEndReached() {
    if (loading || list.length < PER_PAGE) return;
    loadCharacters();
  }

  useEffect(() => {
    loadCharacters(true);
  }, []);

  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Input
        onChangeText={setSearch}
        value={search}
        onFocus={() => {
          flatListRef.current.scrollToIndex({ index: 0, animated: true });
        }}
        onSubmitEditing={() => loadCharacters(true)}
      />
      <FlatList
        style={{ paddingTop: 15 }}
        data={list}
        ref={flatListRef}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        renderItem={({ item }) => <Hero navigation={navigation} item={item} />}
        keyExtractor={item => String(item.id)}
        onEndReached={debounce(onEndReached, 500)}
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          if (!loadingMore) return null;
          return (
            <ActivityIndicator
              style={{ marginTop: 10, marginBottom: 30 }}
              size={24}
              color="red"
            />
          );
        }}
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

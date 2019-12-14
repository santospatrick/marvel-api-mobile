import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import api from './src/services/api';

const App = () => {
  const [list, setList] = useState([]);

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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Image
        style={{ height: 40 }}
        resizeMode="contain"
        source={require('./src/images/logo.png')}
      />
      <Text>Marvel</Text>
      {list.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </SafeAreaView>
  );
};

export default App;

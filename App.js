import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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

    loadCharacters();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {list.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
      <Text>Marvel</Text>
    </View>
  );
};

export default App;

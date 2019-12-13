import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import api from './src/services/api';

const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function loadCharacters() {
      const response = await api.get('/v1/public/comics');
      setList(response.data.data.list);
    }

    // loadCharacters();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Marvel</Text>
    </View>
  );
};

export default App;

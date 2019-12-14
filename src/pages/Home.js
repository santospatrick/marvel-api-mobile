import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Text>Marvel</Text>
      {list.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
      <TouchableHighlight
        onPress={() => navigation.navigate('Detail')}
        underlayColor="transparent"
      >
        <Text>Página de detalhe</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Home;

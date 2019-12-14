import React from 'react';
import { View, Text, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const Hero = ({ item, navigation }) => {
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.2,
      }}
    >
      <RectButton
        style={{
          borderRadius: 20,
          backgroundColor: '#fff',
          marginHorizontal: 20,
          flexDirection: 'row',
          marginBottom: 15,
          elevation: 5,
        }}
        onPress={() => navigation.navigate('Detail', { id: item.id })}
      >
        <Image
          style={{
            height: 150,
            width: 100,
            backgroundColor: '#ccc',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          resizeMode="cover"
          source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
        />
        <View style={{ padding: 10, flex: 1, justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 2 }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 10, color: 'rgba(0,0,0,.6)' }}>
              {item.comics.items.length} quadrinhos |{' '}
              {item.stories.items.length} histórias
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, marginVertical: 5 }} numberOfLines={3}>
              {item.description
                ? item.description
                : 'Personagem ainda não tem descrição'}
            </Text>
          </View>
          <Text
            style={{
              color: '#e71a24',
            }}
          >
            Ver mais
          </Text>
        </View>
      </RectButton>
    </View>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabTwoScreen = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage', error);
    }
  };

  const removeFromFavorites = async (imageUrl: string) => {
    try {
      const updatedFavorites = favorites.filter((item) => item !== imageUrl);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavorites));
      Alert.alert('Success', 'Photo removed from favorites');
    } catch (error) {
      console.error('Error removing photo from favorites', error);
    }
  };

  const renderFavoriteItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => removeFromFavorites(item)}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {favorites.length === 0 && (
        <Text style={styles.message}>No favorites yet</Text>
      )}

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b0b6e3',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  message: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  flatList: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default TabTwoScreen;

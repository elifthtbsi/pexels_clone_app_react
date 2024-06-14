import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PEXELS_API_KEY = 'XxfVKnIPRMGUsiObkSBRh99tbO6xPEtDbtOWq4733lxsfCfRIh7eersO'; // Pexels API anahtarınızı buraya ekleyin

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const searchPhotos = async (query: string) => {
    const apiUrl = 'https://api.pexels.com/v1/search';

    try {
      setIsSearching(true);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query: query,
          per_page: 52,
        },
      });

      const photos = response.data.photos;
      const urls = photos.map((photo: any) => photo.src.large);

      setPhotoUrls(urls);
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching data from Pexels API', error);
      setIsSearching(false);
    }
  };

  const downloadPhoto = async (url: string) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}${url.split('/').pop()}`;
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri
      );

      const downloadResult = await downloadResumable.downloadAsync();
      const uri = downloadResult?.uri;

      if (uri) {
        await MediaLibrary.createAssetAsync(uri);
        alert('Photo downloaded successfully!');
      } else {
        alert('Failed to download photo');
      }
    } catch (error) {
      console.error('Error downloading photo', error);
    }
  };

  const addToFavorites = async (url: string) => {
    try {
      let favorites = await AsyncStorage.getItem('@favorites');
      favorites = favorites ? JSON.parse(favorites) : [];
      if (favorites.includes(url)) {
        Alert.alert('Info', 'This photo is already in favorites');
        return;
      }
      favorites.push(url);
      await AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
      Alert.alert('Success', 'Photo added to favorites');
    } catch (error) {
      console.error('Error adding photo to favorites', error);
    }
  };

  const openModal = (url: string) => {
    setSelectedPhoto(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalVisible(false);
  };

  const renderPhotoItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.photoContainer} onPress={() => openModal(item)}>
      <Image source={{ uri: item }} style={styles.photo} />
      <TouchableOpacity style={styles.addButton} onPress={() => addToFavorites(item)}>
        <Text style={styles.addButtonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search for free photos"
        onSubmitEditing={() => searchPhotos(searchTerm)}
      />

      {isSearching ? (
        <Text style={styles.message}>Searching...</Text>
      ) : (
        <Text style={styles.message}>{photoUrls.length === 0 ? 'Type something to search' : ''}</Text>
      )}

      <FlatList
        data={photoUrls}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPhoto && (
              <Image source={{ uri: selectedPhoto }} style={styles.modalImage} />
            )}
            <TouchableOpacity style={[styles.button, styles.downloadButton]} onPress={() => downloadPhoto(selectedPhoto!)}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#b0b6e3',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 8,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  message: {
    marginBottom: 16,
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  flatList: {
    flexGrow: 1,
  },
  photoContainer: {
    flex: 1,
    margin: 8,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: 'purple',
  },
  closeButton: {
    backgroundColor: 'black',
  },
});

export default SearchPage;

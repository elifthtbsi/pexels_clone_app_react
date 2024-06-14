import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

const PEXELS_API_KEY = 'XxfVKnIPRMGUsiObkSBRh99tbO6xPEtDbtOWq4733lxsfCfRIh7eersO'; // Pexels API anahtarınızı buraya ekleyin

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const searchPhotos = async (query) => {
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
      const urls = photos.map(photo => photo.src.large);

      setPhotoUrls(urls);
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching data from Pexels API', error);
      setIsSearching(false);
    }
  };

  const downloadPhoto = async (url) => {
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

      const { uri } = await downloadResumable.downloadAsync();
      await MediaLibrary.createAssetAsync(uri);

      alert('Photo downloaded successfully!');
    } catch (error) {
      console.error('Error downloading photo', error);
    }
  };

  const openModal = (url) => {
    setSelectedPhoto(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalVisible(false);
  };

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
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
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
            <Button title="Download" onPress={() => downloadPhoto(selectedPhoto)} />
            <Button title="Close" onPress={closeModal} />
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
  },
  message: {
    marginVertical: 30,
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
  image: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default App;

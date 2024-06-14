// PhotoDetailPage.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const PhotoDetailPage = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default PhotoDetailPage;
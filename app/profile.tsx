import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Text, View } from '@/components/Themed';

const ProfileScreen = () => {
  const username = "username: elif";
  const password = "password: 12345";
  const profileImageUrl = "data:image/jpeg;base64,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"; 

  const handleAboutPress = () => {
    Linking.openURL("https://www.pexels.com/tr-tr/");
  };

  const handleLogoutPress = () => {
    console.log("User logged out");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.password}>{password}</Text>


      <TouchableOpacity style={styles.button} onPress={handleLogoutPress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAboutPress}>
        <Text style={styles.buttonText}>Hakkında</Text>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b0b6e3',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    marginBottom: 20,
  },
  password: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProfileScreen;

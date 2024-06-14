import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = () => {
    // Handle login logic here
    console.log('username:', username);
    console.log('password:', password);
  };

  const handleSignUp = () => {
    // Navigate to Sign Up screen
    navigation.navigate('SignUpScreen'); // Ensure 'SignUpScreen' matches your actual route name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pexels</Text>

      <View style={{ height: 20 }} />

      <Text style={styles.paragraph}>
        The best free stock photos, royalty free images & videos shared by creators.
      </Text>

      <View style={{ height: 20 }} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Add spacing */}
      <View style={{ height: 20 }} />

      {/* Add Sign Up link */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  form: {
    width: '80%',
    backgroundColor: '#b0b6e3',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
  },
});

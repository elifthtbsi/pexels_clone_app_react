import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Kullanıcı adı ve şifreyi kullanarak giriş yapma işlemi burada yapılabilir
    console.log('username:', username);
    console.log('password:', password);
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

      {/* Boşluk */}
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

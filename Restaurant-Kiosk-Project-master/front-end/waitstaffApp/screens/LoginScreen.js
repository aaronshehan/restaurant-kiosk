import React, {memo, useState} from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Button from '../components/Button';
import {theme} from '../constants/theme';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _onLoginPressed = () => {

    if (email === '') return alert('Enter Email');
    if (password === '') return alert('Enter Password');

    firestore()
      .collection('Employees')
      .where('email', '==', email)
      .get()
      .then(snap => {
        if (snap.empty) {
          return alert('Invalid Email or Password');
        } else {
          snap.forEach(doc => {
            const user = doc.data();
            if (user.password !== password) {
              return alert('Invalid Email or Password');
            } else {
              AsyncStorage.setItem(
                'user',
                JSON.stringify({name: user.name, id: doc.id}),
              );
              navigation.navigate('Dashboard');
            }
          });
        }
      })
      .catch(err => console.log(err.message));
  };

  return (
    <Background>
      <Header>Welcome Back.</Header>
      <TextInput
        label="Email"
        value={email.value}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        label="Password"
        value={password.value}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.surface,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(LoginScreen);

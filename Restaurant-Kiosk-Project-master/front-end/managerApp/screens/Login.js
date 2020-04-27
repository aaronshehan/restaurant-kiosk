import React, {memo, useState} from 'react';
import {StyleSheet, View, Button, Text, ActivityIndicator, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
              navigation.navigate('Home');
            }
          });
        }
      })
      .catch(err => console.log(err.message));
    };

    return (
      <View style={styles.background}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          value={email.value}
          onChangeText={text => setEmail( text )}
        />

        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          value={password.value}
          onChangeText={text => setPassword( text )}
        />

        <TouchableOpacity style={styles.buttonContainer}
          title="LOGIN"
          onPress={_onLoginPressed}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.buttonContainer}
           title="REGISTER"
           onPress={() => navigation.navigate('SignUp')}>
           <Text style={styles.buttonText}>
             Register
           </Text>
         </TouchableOpacity>
       </View>
    )
};

const styles = StyleSheet.create({

    background: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 100,
    },

    container: {
        flex: 1,
        backgroundColor: '#3518db'
    },

    textInput: {
        width: 500,
        margin: 5,
        height: 60,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },

    buttonContainer: {
        margin: 15,
        height: 80,
        width: 200,
        backgroundColor: '#2940b9',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },


    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 30
    }
});

export default memo(LoginScreen);
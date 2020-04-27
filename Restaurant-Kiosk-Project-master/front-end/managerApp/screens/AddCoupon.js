import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addNewCoupon} from './metrics/revenue';

const newCoupon = ({navigation}) => {

    const [code, setCode] = useState('');
    const [percentOff, setPercentOff] = useState('');

    const _onNewCouponPressed = () => {

            const newCoupon = {
                code: code,
                percentOff: Number(percentOff),
            }

            addNewCoupon(newCoupon);
    }


        return (
            <View style={styles.container}>

                <TextInput
                placeholder="Code"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setCode(val)}
                value={code}
                />

                <TextInput
                placeholder="Percent off"
                placeholderTextColor='rgba(255,255,255,0.7)'
                style={styles.input}
                onChangeText={(val) => setPercentOff(val)}
                value={percentOff}
                />

                <Button
                style={styles.addPosition}
                title="Add New Coupon" onPress = {_onNewCouponPressed}>
                </Button>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            padding: 20
        },
        input: {
            height: 60,
            backgroundColor: 'gray',
            marginBottom: 10,
            color: 'white',
            paddingHorizontal: 10
        },

    })

    export default newCoupon;
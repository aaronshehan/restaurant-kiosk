import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Background from '../components/Background';
import {theme} from '../constants/theme';
import Dot from '../components/Dot';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';
import firestore from '@react-native-firebase/firestore';

const OrdersScreen = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let waitStaff = await AsyncStorage.getItem('user');
    waitStaff = JSON.parse(waitStaff);
    firestore()
      .collection('Orders')
      .where('waitstaff', '==', waitStaff.id)
      .onSnapshot(snap => {
        let temp = [];
        console.log('orders', snap.size);
        snap.forEach(doc => {
          temp.push({...{id: doc.id}, ...doc.data()});
        });
        setOrders(temp);
      });
  };

  const updateOrder = id => {
    console.log(id);
    firestore()
      .collection('Orders')
      .doc(id)
      .update({completionStatus: false})
      .catch(err => console.log(err));
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          paddingLeft: 30,
          paddingRight: 30,
        }}>
        {orders &&
          orders.map((order, indx) => (
            <OrderCard key={indx} order={order} onDotPress={updateOrder} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;

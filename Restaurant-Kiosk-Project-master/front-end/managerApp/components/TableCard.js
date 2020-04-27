import React from 'react';
import {View, Text, Image} from 'react-native';

const TableCard = ({number, showNotification}) => {
  return (
    <View
      style={{
        height: 150,
        marginTop: 20,
        marginLeft: 25,
        width: 100,
      }}>
      <View
        style={{
          height: 100,
          width: 100,
          padding: 3,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'grey',
          backgroundColor: 'white',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        </View>
      </View>
      <Text style={{padding: 5, fontSize: 16, fontWeight: 'bold'}}>
        Table {number}
      </Text>
    </View>
  );
};
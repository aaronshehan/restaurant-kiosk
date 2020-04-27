import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {theme} from '../constants/theme';
import Dot from './Dot';
const TableCard = ({number, showNotification, onDotPress}) => {
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
        <TouchableOpacity onPress={onDotPress}>
          <Dot
            color={showNotification ? theme.colors.secondary : 'transparent'}
          />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/table_icon.png')}
            style={{height: 64, width: 64}}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={{padding: 5, fontSize: 16, fontWeight: 'bold'}}>
        Table {number}
      </Text>
    </View>
  );
};

export default TableCard;

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from './Header';
import Dot from './Dot';
const OrderCard = ({order, onDotPress}) => {
  const {tableNumber, orderedItems, completionStatus, id} = order;
  const color = completionStatus ? 'green' : '';
  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 50,
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
        }}>
        <Header>Table {tableNumber}</Header>
        <TouchableOpacity
          disabled={!completionStatus}
          onPress={() => onDotPress(id)}>
          <Dot color={color} />
        </TouchableOpacity>
      </View>
      {orderedItems &&
        orderedItems.map((item, index) => (
          <ItemRow key={index} item={item} index={index} />
        ))}
    </View>
  );
};

export default OrderCard;

const ItemRow = ({index, item}) => (
  <View
    key={index}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 30,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center',
    }}>
    <Text style={{fontSize: 16}}>
      {index + 1}. {item}
    </Text>
    {/* <Text style={{fontSize: 16, textAlign: 'right'}}>QTY:{item.quantity}</Text> */}
  </View>
);

import { React, Component } from 'react'
import { StyleSheet } from 'react-native'
export default StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 10,
    borderColor: 'white',
    backgroundColor: 'gray',
    textAlign: 'center'
  },

  textOrders: {
    color: 'black',
    fontSize: 20,
    borderRadius: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  container2: {
    flex: 1,
    paddingTop: 40
  },

  background: {
    width: '100%',
    height: '100%'
  },

  modalBackground: {
    opacity: 0.8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'aqua'
  }
})

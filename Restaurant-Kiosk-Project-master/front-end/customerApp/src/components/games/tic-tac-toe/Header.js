import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import LeftArrow from '../../../assets/header/left-arrow.png';

export default class Header extends Component {
  constructor(props) {
    super(props)
  }
  
  backToGames = () => {
    this.props.navigation.state.params.showGamesOverlay()
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style = {styles.arrowBackground}
          onPress = {() => this.backToGames()}
        >
            <Image source = {LeftArrow}/>
        </TouchableHighlight>

        <Text style={styles.title}>
          Tic Tac Toe
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  arrowBackground: {
    marginTop: 3,
    marginBottom: 3,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black'
  }
})

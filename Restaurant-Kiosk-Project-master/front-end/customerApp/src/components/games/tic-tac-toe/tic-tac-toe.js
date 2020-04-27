import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Header from './Header'
import GameBoard from './GameBoard'

export default class TicTacToe extends Component {
  constructor(props) {
    super(props)
    this.state={ gameStarted: false }
  }

  startGame() {
    this.setState({ gameStarted: true })
  }

  render() {
    const { gameStarted } = this.state
    return (
      <View style={styles.container}>
        <Header navigation = {this.props.navigation}/>
        {
          gameStarted ? (
            <GameBoard />
          ) : (
            <View>
              <Text style={styles.welcome}>
                Welcome to the game!
              </Text>
              <TouchableOpacity onPress={() => this.startGame()}>
                <Text style={styles.instructions}>
                  Touch here to start
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    marginTop: 50,
  },
  instructions: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
  },
})

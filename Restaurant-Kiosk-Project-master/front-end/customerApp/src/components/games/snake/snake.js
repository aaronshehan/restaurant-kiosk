import React, { Component } from "react";
import { AppRegistry, StyleSheet, StatusBar, View, Alert, Button, TouchableOpacity, TouchableHighlight, Image } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Head } from "./head";
import { Food } from "./food";
import { Tail } from "./tail";
import { GameLoop } from "./systems";
import Constants from './Constants';
import LeftArrow from '../../../assets/header/left-arrow.png'

export default class Snake extends Component {
    constructor(props) {
        super(props);
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.engine = null;
        this.state = {
            running: true
        }
    }

    randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onEvent = (e) => {
        if (e.type === "game-over"){
            this.setState({
                running: false
            });
            Alert.alert("Game Over");
        }
    }

    reset = () => {
        this.engine.swap({
            head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
            food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
            tail: { size: 20, elements: [], renderer: <Tail /> }
        });
        this.setState({
            running: true
        });
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

                <GameEngine
                    ref={(ref) => { this.engine = ref; }}
                    style={[{ width: this.boardSize, height: this.boardSize, backgroundColor: '#ffffff', flex: null }]}
                    systems={[ GameLoop ]}
                    entities={{
                        head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
                        food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
                        tail: { size: 20, elements: [], renderer: <Tail /> }
                    }}
                    running={this.state.running}
                    onEvent={this.onEvent}>

                    <StatusBar hidden={true} />

                </GameEngine>

                <Button title="New Game" onPress={this.reset} />

                <View style={styles.controls}>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                        <View style={[styles.control, { backgroundColor: null}]} />
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" })}}>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.controlRow}>
                        <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" })} }>
                            <View style={styles.control} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controls: {
        width: 300,
        height: 300,
        flexDirection: 'column',
    },
    controlRow: {
        height: 100,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    control: {
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    },
    arrowBackground: {
        alignSelf: 'flex-start',
        marginTop: 3,
        marginBottom: 3,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'black'
      }
});

AppRegistry.registerComponent("Snake", () => Snake);

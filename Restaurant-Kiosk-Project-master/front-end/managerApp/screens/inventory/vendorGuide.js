import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';


export default class AddRemove extends Component {

    render()
    {
        return (
            <View style={styles.container}>
                <Text>
                    EXAMPLE TEXT
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'gray',
        marginBottom: 10,
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 16
    },

})
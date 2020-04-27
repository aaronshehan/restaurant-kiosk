import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableHighlight, ScrollView } from 'react-native';

/*This function is a scrollView element that will use a list to pull employee hour information
  and give the manager the ability to approve the hours.
*/




export default function ApproveTimes ({ navigation }) {
        return (
            <View style={styles.background}>

                <ScrollView style= {styles.scrollView}>
                    <View style={styles.employeeContainer}>

                        <Text style={styles.menuText}>
                            Employee 1: 45 hours
                        </Text>

                        <TouchableHighlight style={styles.approveTimes}
                         onPress={() => alert('Times approved')}>
                            <Text style={styles.menuText}>
                                ApproveTimes
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.employeeContainer}>

                        <Text style={styles.menuText}>
                            Employee 2: 22 hours
                        </Text>

                        <TouchableHighlight style={styles.approveTimes}
                         onPress={() => alert('Times approved')}>
                            <Text style={styles.menuText}>
                                ApproveTimes
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.employeeContainer}>

                        <Text style={styles.menuText}>
                            Employee 3: 30 hours
                        </Text>


                        <TouchableHighlight style={styles.approveTimes}
                         onPress={() => alert('Times approved')}>
                            <Text style={styles.menuText}>
                                ApproveTimes
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        )
    }

const styles = StyleSheet.create({

    approveTimes: {
        height: 40,
        width: 400,
        backgroundColor: '#3498db',
        alignItems: 'center',
    },

    background: {
            flex: 1,
            backgroundColor: '#3498db',
        },

    menuText: {
        fontSize: 21,
        color: '#ffffff',
    },

    employeeContainer:
    {
        backgroundColor: '#3333ff',
        height: 150,
        width: 800,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 30,
        padding: 10
    },

    employeeContainerText:
    {
        fontSize: 24,
        color: '#ffffff',

    },

    scrollView:
    {
        paddingLeft: 200,
        backgroundColor: '#ffffff',

    },
})
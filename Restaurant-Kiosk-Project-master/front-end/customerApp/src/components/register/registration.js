import React, { Component } from 'react';
import {View, Image, Text, TextInput, TouchableOpacity, Button} from 'react-native';
import {addCustomer, loginAsGuest} from '../../customers';
import { createOrder } from '../../orders';
import { connect } from 'react-redux';
import { setCustomerID } from '../../store/actions/customer_actions';
import { setOrderID } from '../../store/actions/order_actions';
import UserIcon from '../../assets/registration/user_icon.png';
import LoginButton from '../../assets/registration/login_button.png';
import RegisterButton from '../../assets/registration/register_button.png';
import validator from 'validator';
import styles from './styles.js';

class Registration extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
        this.textStyleEmail = styles.textInput
        this.textStylePass = styles.textInput
    }

    updateFirstName = (text) => {
        this.setState({ firstName: text })
    }

    updateLastName = (text) => {
        this.setState({ lastName: text })
    }

    updateEmail = (text) => {
        this.setState({ email: text })
    }

    // Checks if correct email format
    validEmail = (emailText) => {
        if(validator.isEmail(emailText)){
            this.textStyleEmail = styles.textInput
        } else {
            this.textStyleEmail = styles.textInputErr
            this.setState({ emailDialog: true })
        }
    }

    validPassword = (passwordText) => {
        if(passwordText.length >= 6) {
            this.textStylePass = styles.textInput
        } else {
            this.textStylePass = styles.textInputErr
            this.setState({ passwordDialog: true })
        }
    }

    updatePassword = (text) => {
        this.setState({ password: text })
    }

    registerCustomer = async () => {
        let customer = {name: this.state.firstName, email: this.state.email, password: this.state.password}

        if (this.state.firstName.length == 0) {
            alert("Need first name");
        } else if (this.state.password.length < 6) {
            alert("Need password with length > 6");
        } else {
            customer = await addCustomer(customer);

            if (customer.id.length > 0) {
                alert("Registered successfully");
                let orderID = await createOrder(customer.id, global.tableNumber);

                if (orderID == false) {
                    alert('Could not create orderID. Try registering again.');
                } else {
                    this.props.setOrderID(orderID)
                    this.props.setCustomerID(customer.id)

                    this.props.navigation.navigate('Load', {
                        loginSuccessful: true
                    })
                }       
            } else {
                alert("Registration has failed: " + customer);
            }
        }
    }

    loginGuest = async () => {
        let customer;
    
        customer = await loginAsGuest();
        
        if (customer.id.length > 0) {
            let orderID = await createOrder(customer.id);

            if (orderID == false) {
                alert('Could not create orderID. Try logging in again.');
            } else {
                this.props.setOrderID(orderID)
                this.props.setCustomerID(customer.id)    

                this.props.navigation.navigate('Load', {
                    loginSuccessful: true
                })
            }
        } else {
            alert("Login has failed");
        }
        // this.props.navigation.navigate('Load', {
        //     loginSuccessful: true
        // })
    }
    

    render() {
        return (
            <View style = {styles.container}>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <Button
                        title = "Continue As Guest"
                        color = 'orange'
                        onPress = {() => {this.loginGuest()}}
                    />
                    <View style = {{flex: 1, alignSelf: 'flex-end'}}>
                        <Text style = {{
                            alignSelf: 'flex-end', 
                            fontSize: 50, 
                            fontWeight: 'bold'
                        }}>
                            Returning User?
                        </Text>
                    
                        <TouchableOpacity
                            style = {{alignSelf: 'flex-end'}}
                            onPress = {() => { this.props.navigation.navigate('Login') }}
                        >
                            <Image source = {LoginButton}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source = {UserIcon}/>
                <View style = {styles.textFields}>
                    <Text style = {styles.textFieldLabel}>First Name</Text>
                    <View style = {styles.textField}>
                        <TextInput
                            style = {styles.textInput}
                            autoCorrect = {false}
                            returnKeyType = {"next"}
                            onChangeText = {this.updateFirstName}
                            onSubmitEditing = {() => { this.secondTextInput.focus() }}
                            blurOnSubmit = {false}
                        />
                    </View>
                    <Text style = {styles.textFieldLabel}>Last Name</Text>
                    <View style = {styles.textField}>
                        <TextInput 
                            style = {styles.textInput}
                            autoCorrect = {false}
                            ref = {(input) => { this.secondTextInput = input }}
                            returnKeyType = {"next"}
                            onChangeText = {this.updateLastName}
                            onSubmitEditing = {() => { this.thirdTextInput.focus() }}
                            blurOnSubmit = {false}
                        />
                    </View>
                    <Text style = {styles.textFieldLabel}>Email Address</Text>
                    <View style = {styles.textField}>
                        <TextInput 
                            style = {this.textStyleEmail}
                            autoCorrect = {false}
                            autoCapitalize = {'none'}
                            ref = {(input) => { this.thirdTextInput = input }}
                            returnKeyType = { "next" }
                            keyboardType = { 'email-address' }
                            textContentType = { 'emailAddress' }
                            onChangeText = {this.updateEmail}
                            onSubmitEditing = {({ nativeEvent }) => { this.validEmail(nativeEvent.text); this.fourthTextInput.focus();  }}
                            blurOnSubmit = {false}
                        />
                    </View>
                    <Text style = {styles.textFieldLabel}>Password</Text>
                    <View style = {styles.textField}>
                        <TextInput 
                            style = {this.textStylePass}
                            autoCorrect = {false}
                            secureTextEntry = {true}
                            autoCapitalize = {'none'}
                            placeholder = {"6 or more characters"}
                            ref = {(input) => { this.fourthTextInput = input }}
                            onChangeText = {this.updatePassword}
                            onSubmitEditing = {({ nativeEvent }) => { this.validPassword(nativeEvent.text) }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style = {{alignSelf: 'center'}}
                    onPress = {() => { this.registerCustomer() }}
                >
                    <Image source = {RegisterButton}/>
                </TouchableOpacity>
            </View> 
        )
    }
};

const mapStateToProps = (state) => ({
    orderID: state.ordReducer.orderID,
    customerId: state.custReducer.customerID
})

export default connect(mapStateToProps, {setOrderID, setCustomerID})(Registration);
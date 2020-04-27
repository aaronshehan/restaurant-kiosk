import React, { Component } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import UserIcon from '../../../assets/registration/user_icon.png';
import LeftArrow from '../../../assets/header/left-arrow.png';
import RegisterButton from '../../../assets/registration/register_button.png';
import validator from 'validator';
import {login} from '../../../customers';
import { connect } from 'react-redux';
import { setCustomerID } from '../../../store/actions/customer_actions';
import { setOrderID } from '../../../store/actions/order_actions';
import {createOrder} from '../../../orders';
import styles from './styles.js';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
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

    loginCustomer = async () => {
        let customer;
    
        if (this.state.password.length < 6) {
            alert("Need password with length > 6");
        } else {
            customer = await login(this.state.email, this.state.password);

            if (customer.password.length > 0) {
                let orderID = await createOrder(customer.id, global.tableNumber);

                if (orderID === false) {
                    alert('Could not create orderID. Try logging in again.');
                } else {
                    this.props.setOrderID(orderID)
                    this.props.setCustomerID(customer.id)

                    this.props.navigation.navigate('Load', {
                        loginSuccessful: true
                    })
                }
            } else {
                alert("Login has failed: " + customer);
            }
        }
    }

    render() {
        return (
            <View style = {styles.container}>
                <TouchableOpacity
                        style = {styles.arrowBackground}
                        onPress = {() => this.props.navigation.goBack()}
                    >
                        <Image source = {LeftArrow}/>
                </TouchableOpacity>
                <Image source = {UserIcon}/>
                <Text style = {{
                    fontSize: 50, 
                    fontWeight: 'bold'
                    }}>
                        Login
                </Text>
                <View style = {styles.textFields}>
                    <Text style = {styles.textFieldLabel}>Email Address</Text>
                    <View style = {styles.textField}>
                        <TextInput 
                            style = {this.textStyleEmail}
                            autoCorrect = {false}
                            autoCapitalize = {'none'}
                            returnKeyType = { "next" }
                            keyboardType = { 'email-address' }
                            textContentType = { 'emailAddress' }
                            onChangeText = {this.updateEmail}
                            onSubmitEditing = {({ nativeEvent }) => { this.validEmail(nativeEvent.text); this.secondTextInput.focus();  }}
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
                            ref = {(input) => { this.secondTextInput = input }}
                            onChangeText = {this.updatePassword}
                            onSubmitEditing = {({ nativeEvent }) => { this.validPassword(nativeEvent.text) }}
                        />
                    </View>
                    <TouchableOpacity
                    style = {{alignSelf: 'center', paddingTop: 30}}
                    onPress = {() => { this.loginCustomer() }}
                    >
                    <Image source = {RegisterButton}/>
                    </TouchableOpacity>
                </View>
            </View> 
        )
    }
};

const mapStateToProps = (state) => ({
    orderID: state.ordReducer.orderID,
    customerId: state.custReducer.customerID
})

export default connect(mapStateToProps, {setOrderID, setCustomerID})(Login);
import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton, ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
import Overlay from 'react-native-modal-overlay';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';
import LeftArrow from  '../../../assets/header/left-arrow.png';
import LoginIcon from '../../../assets/header/login.png';
import WaiterIcon from '../../../assets/header/waiter.png';
import DrinkIcon from '../../../assets/header/drink.png';
import GameIcon from '../../../assets/header/joystick.png';
import CartIcon from '../../../assets/header/shopping-cart.png';
import RightArrow from '../../../assets/header/right-arrow.png';
import { callServer } from '../../../callServer';
import styles from './styles.js';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverDialog: false,
            serverCalled: false,
            gamesOverlay: false,
            showLeftArrow: false,
            showRightArrow: true,
            kidModeDialog: false,
            pinDialog: false,
            pinNumber: '',
            pinNumberCheck: '',
            pinDialogCheck: false,
            kidModeEnabled: false
        }

        this.loginSuccessful = this.props.navigation.getParam('loginSuccessful');
    }
    pinInput = React.createRef();
    pinInput2 = React.createRef();

    // TODO:: Gamesoverlay to true when coming back from games

    renderLoginIcon = () => {
        if (!this.loginSuccessful) {
            return (
                <TouchableHighlight
                    style = {styles.arrowBackground}
                    onPress = {() => { this.props.navigation.navigate('Register') }}
                >
                    <Image source = {LoginIcon}/>
                </TouchableHighlight>
            )
        } else {
            return null
        }
    }

    renderLeftArrow = () => {
        if (this.state.showLeftArrow) {
            return (
                <TouchableHighlight
                    style = {styles.arrowBackground}
                    onPress = {() => this.scrollLeft()}
                >
                    <Image source = {LeftArrow}/>
                </TouchableHighlight>
            )
        }
    }

    renderRightArrow = () => {
        if (this.state.showRightArrow == true) {
            return (
                <TouchableHighlight
                    style = {styles.arrowBackground}
                    onPress = {() => this.scrollRight()}
                >
                    <Image source = {RightArrow}/>
                </TouchableHighlight>
            )
        }
    }

    scrollRight = () => {
        global.scroll.scrollToEnd({animated: true})

        this.setState({
            showRightArrow: false,
            showLeftArrow: true
        })
    }

    scrollLeft = () => {
        global.scroll.scrollTo({x: 0, y: 0, animated: true});

        this.setState({
            showLeftArrow: false,
            showRightArrow: true
        })
    }

    alertServer = async () => {
        let callServerSuc;

        callServerSuc = await callServer(global.tableNumber);

        if (callServerSuc == true) {
            this.setState({
                serverDialog: false,
                serverCalled: true
            })
        } else {
            this.setState({ serverDialog: false })
            alert('Server could not be called. Try again.')
        }
    }

    goToGames = () => {
        this.setState({ kidModeDialog: true })
    }

    goToCart = () => {
        let allItems = [];
        let buyingItems = [];

        allItems = this.props.appetizers.concat(this.props.beverages, this.props.entrees, this.props.desserts, this.props.fiveDollarMeals)

        for (var i = 0; i < allItems.length; i++) {
            if (allItems[i].quantity > 0) {
                for (var j = 0; j < allItems[i].quantity; j++) {
                    buyingItems.push(allItems[i])
                }
            }
        }

        if (buyingItems.length === 0) {
            alert('Shopping Cart is empty. Use \'+\' and \'-\' to order items')
        } else {
            this.props.navigation.navigate('Pay', {
                items: buyingItems,
                navigation: this.props.navigation
            })
        }
    }

    goToGame1 = () => {
        this.setState({ gamesOverlay: false })
        this.props.navigation.navigate('TicTacToe', { showGamesOverlay: this.displayGamesOverlay.bind(this)})
    }

    goToGame2 = () => {
        this.setState({ gamesOverlay: false })
        this.props.navigation.navigate('Snake', { showGamesOverlay: this.displayGamesOverlay.bind(this)})
    }

    submitPin = () => {
        this.setState({
            pinDialog: false,
            gamesOverlay: true,
            kidModeEnabled: true
        })
    }

    submitPinCheck = () => {
        if (this.state.pinNumberCheck === this.state.pinNumber.slice(0, 3)) {
            this.setState({ 
                pinDialogCheck: false,
                pinNumberCheck: '',
                kidModeEnabled: false
            })
        } else {
            this.setState({
                gamesOverlay: true,
                pinDialogCheck: false
            })
        }
    }

    displayGamesOverlay = () => {
        this.setState({ gamesOverlay: true })
    }

    displayPinDialog = () => {
        this.setState({
            kidModeDialog: false,
            pinDialog: true,
            pinNumber: '',
            pinDialogCheck: ''
        })
    }

    dismissServerDialog = () => {
        this.setState({
            serverDialog: false,
            serverCalled: false
        })
    }

    dismissKidModeDialog = () => {
        this.setState({ 
            kidModeDialog: false,
            gamesOverlay: true 
        })
    }

    dismissPinDialog = () => {
        this.setState({ 
            pinDialog: false,
            pinNumberCheck: '',
            gamesOverlay: true
         })
    }

    onClose = () => {
        if (this.state.kidModeEnabled) {
            this.setState({
                gamesOverlay: false,
                pinDialogCheck: true
            })
        } else {
            this.setState({
                drinkOverlay: false,
                gamesOverlay: false
            })
        }
    }

    render() {
        const pinNumber = this.state.pinNumber
        const pinNumberCheck = this.state.pinNumberCheck

        return (
            <View style = {styles.header}>
                {this.renderLoginIcon()}

                {this.renderLeftArrow()}

                <TouchableHighlight 
                    style = {styles.buttonBackground}
                    onPress = {() => this.setState({serverDialog: true})}
                >
                    <Image source = {WaiterIcon}/>
                </TouchableHighlight>

                <TouchableHighlight 
                    style = {styles.buttonBackground}
                    onPress = {() => this.setState({serverDialog: true})}
                >
                    <Image source = {DrinkIcon}/>
                </TouchableHighlight>

                <TouchableHighlight 
                    style = {styles.buttonBackground}
                    onPress = {() => this.goToGames()}
                >
                    <Image source = {GameIcon}/>
                </TouchableHighlight>

                <TouchableHighlight 
                    style = {styles.buttonBackground}
                    onPress = {() => this.goToCart()}
                >
                    <Image source = {CartIcon}/>
                </TouchableHighlight>
                
                <View style = {styles.rightIcons}>
                    {this.renderRightArrow()}
                </View>













                {/* Overlays Here */}
                <Overlay
                    visible = {this.state.gamesOverlay}
                    childrenWrapperStyle = {{width: 600, height: 800, alignSelf: 'center'}}
                    onClose = {this.onClose}
                    closeOnTouchOutside = {true}
                    animationType = {'zoomIn'}
                >
                    <Text style = {{fontSize: 50, fontWeight: 'bold', color: 'aqua'}}>Games</Text>

                    <View style = {{paddingTop: 50}}/>

                    <TouchableHighlight 
                        style = {styles.arrowBackground, {backgroundColor: 'aqua'}}
                        onPress = {() => this.goToGame1()}
                    >
                        <Text style = {{fontSize: 36, fontWeight: 'bold'}}>Tic-Tac-Toe</Text>
                    </TouchableHighlight>

                    <View style = {{paddingTop: 100}}/>

                    <TouchableHighlight 
                        style = {styles.arrowBackground, {backgroundColor: 'aqua'}}
                        onPress = {() => this.goToGame2()}
                    >
                        <Text style = {{fontSize: 36, fontWeight: 'bold'}}>Snake</Text>
                    </TouchableHighlight>
                </Overlay>

                {/* Dialog Boxes Here */}
                <Dialog
                    visible = {this.state.serverDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Call Server"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "REQUEST SERVER"
                                onPress = {this.alertServer}
                            />
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissServerDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {{fontWeight: 'bold', fontSize: 20}}>Would you like to request a server to come to your table?</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.serverCalled}
                    dialogAnimation = {new ScaleAnimation()}
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissServerDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {{fontWeight: 'bold', fontSize: 25}}>A server has been called.</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.kidModeDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "KID MODE"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "ENABLE"
                                onPress = {this.displayPinDialog}
                            />
                            <DialogButton
                                text = "NO"
                                onPress = {this.dismissKidModeDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {{fontWeight: 'bold', fontSize: 20}}>Would you like to enable KID MODE (Can only stay in game area, locked by a 4-digit PIN number)</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.pinDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "4-Digit PIN"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissPinDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <SmoothPinCodeInput
                            ref = {this.pinInput}
                            autoFocus = {true}
                            value = {pinNumber}
                            keyboardType = 'number-pad'
                            restrictToNumbers = {true}
                            onTextChange={pinNumber => this.setState({ pinNumber })}
                            onFulfill = {this.submitPin}
                        />
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.pinDialogCheck}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "4-Digit PIN"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissPinDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <SmoothPinCodeInput         // TODO:: Only submitting 3/4 of the pin
                            ref = {this.pinInput2}
                            autoFocus = {true}
                            value = {pinNumberCheck}
                            keyboardType = 'number-pad'
                            restrictToNumbers = {true}
                            onTextChange = {pinNumberCheck => this.setState({ pinNumberCheck })}
                            onFulfill = {this.submitPinCheck}
                        />
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
};

const mapStateToProps = (state) => ({
    appetizers:         state.menReducer.appetizers,
    beverages:          state.menReducer.beverages,
    entrees:            state.menReducer.entrees,
    desserts:           state.menReducer.desserts,
    fiveDollarMeals:    state.menReducer.fiveDollarMeals
})

export default connect(mapStateToProps)(Header);
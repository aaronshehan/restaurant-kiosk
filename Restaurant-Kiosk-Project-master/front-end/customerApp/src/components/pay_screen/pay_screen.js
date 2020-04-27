import React, { Component } from 'react';
import { View, Text, ImageBackground, FlatList, TouchableHighlight, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import Dialog, { DialogContent, DialogFooter, DialogButton, ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
import Background from '../../assets/background.jpeg';
//import Cancel from '../../assets/pay_screen/cancel.png';
//import UnCancel from '../../assets/pay_screen/uncanceled.png';
import LeftArrow from '../../assets/header/left-arrow.png';
import PayButton from '../../assets/pay_screen/dollar.png';
import { connect } from 'react-redux';
import { confirmOrder } from '../../orders';
import { addTransaction } from '../../transactions';
import { validateCoupon } from '../../coupon';
import {getQuestionDocs, addQuestionDoc} from '../../question';
import styles from './styles';

class PayScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //canceled: false,
            tenPercentPressed: false,
            fifteenPercentPressed: false,
            twentyPercentPressed: true,
            customPressed: false,
            couponDialog: false,
            couponSuccessDialog: false,
            splitBillDialog: false,
            howToPayDialog: false,
            creditCardDialog: false,
            serverCalledDialog: false,
            receiptDialog: false,
            successDialog: false,
            questionsDialog: false
        };
        this.buyingItems = this.props.navigation.getParam('items');
        this.questionsDoc = {
            orderID: this.props.orderID,
            questions: [
                'How was your experience at our restaurant?', 
                'How was our service?', 
                'How was the quality of our food?'
            ],
            reviews: [
                'N/A',
                'N/A',
                'N/A'
            ]
        }
        this.navigation = this.props.navigation.getParam('navigation');
        this.tipPercent = '20%'
        this.tipAmount = null
        this.numPeople = 1;
        this.peoplePaid = 0;
        this.total = 0;
        this.tax = 0;
        this.totalWithTax = 0;
        this.couponCode = null;
        this.percentOff = 0;
        this.discount = 0;
        this.totalWithTip = 0;
        this.waitStaffID = null;
        this.randomNum = Math.floor(Math.random() * 5) + 1;
        //this.blackText = styles.blackText
    }

    // displayIngredients() {
    //     return (
    //         this.buyingItems.map((item, index) => 
    //         <TouchableHighlight 
    //             underlayColor = 'transparent'
    //             onPress = {() => this.uncancel()}
    //         >
    //                             <Image source = {Cancel}/>
    //                     </TouchableHighlight>
    //         )
    //     )
    // }

    // showCorrectX() {
    //     if (this.state.canceled) {
    //         return (
    //             <TouchableHighlight 
    //                 underlayColor = 'transparent'
    //                 onPress = {() => this.uncancel()}
    //             >
    //                     <Image source = {Cancel}/>
    //             </TouchableHighlight>
    //         )
    //     } else {
    //         return (
    //             <TouchableHighlight
    //                 underlayColor = 'transparent'
    //                 onPress = {() => this.cancel()}
    //             >
    //                     <Image source = {UnCancel}/>
    //             </TouchableHighlight>
    //         )
    //     }
    // }

    // cancel() {
    //     alert('This item has been canceled and will not be a part of your total cost')
    //     this.setState({ canceled: true })
    // }

    // uncancel() {
    //     alert('This item has been sucessfully brought back')
    //     this.setState({ canceled: false })
    // }

    updateRequests = (index) => text => {
        //console.log(this.buyingItems)
        //console.log(index, text)
        this.buyingItems[index].requests = text

        //console.log(this.buyingItems[0].requests)
    }

    updateReview = (index) => text => {
        this.questionsDoc.reviews[index] = text
    }

    pressTenPercent = () => {
        this.setState({
            fifteenPercentPressed: false,
            twentyPercentPressed: false,
            customPressed: false,
            tenPercentPressed: true
        }),

        this.tipPercent = '10%'
    }

    pressFifteenPercent = () => {
        this.setState({
            fifteenPercentPressed: true,
            twentyPercentPressed: false,
            customPressed: false,
            tenPercentPressed: false
        }),

        this.tipPercent = '15%'
    }

    pressTwentyPercent = () => {
        this.setState({
            twentyPercentPressed: true,
            fifteenPercentPressed: false,
            customPressed: false,
            tenPercentPressed: false
        })

        this.tipPercent = '20%'
    }

    updateTip = text => {
        this.setState({
            tenPercentPressed: false,
            fifteenPercentPressed: false,
            twentyPercentPressed: false,
            customPressed: true
        })

        this.tipAmount = text 
    }

    updateCouponCode = (text) => { this.couponCode = text }

    updateNumPeople = (text) => {
        let people = parseInt(text, 10)
        
        if (people < 1) {
            alert("Number of people can not go below 1")
        } else {
            this.numPeople = people
        }
    }

    tryCouponCode = async (couponCode) => {
        let success = await validateCoupon(couponCode)

        if (success === false) {
            alert("Code: \"" + couponCode + "\" was invalid")
        } else {
            this.percentOff = success;

            this.setState({
                couponDialog: false,
                couponSuccessDialog: true
            })
        }
    }

    initiatePay = async () => {
        let success = await confirmOrder(this.props.orderID, this.props.customerID, global.tableNumber, this.buyingItems)

        if (success != false) {
            var i;
            this.total = 0
            this.waitStaffID = success

            for (i = 0; i < this.buyingItems.length; i++) {
                this.total += this.buyingItems[i].price
            }
            this.total = this.total.toFixed(2)

            this.tax = (.08)*(this.total);
            this.tax = this.tax.toFixed(2)

            this.totalWithTax = +this.total + +this.tax
            this.totalWithTax = this.totalWithTax.toFixed(2)

            this.setState({ receiptDialog: true })
        } else {
            alert("Failed to confirm the order and/or the ingredients. Try again")
        }
    }

    renderReceipt() {
        return (
            this.buyingItems.map((item, index) => 
                <Text
                    style = {styles.receiptText}
                    key = {index}
                >
                    Item {index}-{item.name}{"\t\t\t"}${item.price}
                </Text>
            )
        )
    }

    renderCoupon() {
        if (this.percentOff === 0) {
            return (
                <Text style = {styles.receiptText}>Total with Tax: ${this.totalWithTax}{'\n'}</Text>
            )
        } else {
            this.totalWithTax = (this.total)*(parseFloat(this.percentOff) / 100.0) + +(.08)*(this.total)
            this.totalWithTax = this.totalWithTax.toFixed(2)

            this.discount = (this.total)*(parseFloat(this.percentOff) / 100.0)
            this.discount = this.discount.toFixed(2)

            return (
                <Text style = {styles.receiptText}>
                    Coupons: {this.percentOff}% from coupon code: "{this.couponCode}"
                    {"\n\n"}
                    New total: ${this.totalWithTax}{'\n'}
                </Text>
            )
        }
    }

    renderSplit() {
        if (this.numPeople === 1) {
            return (
                null
            )
        } else {
            return (
                <Text styles = {styles.receiptText}>
                    {/* {"\n"} */}
                    Number of ways to split check: {this.numPeople}{"\n"}
                    New total: ${(this.totalWithTip / this.numPeople).toFixed(2)} each
                </Text>
            )
        }
    }

    renderTipButtons() {
        return (
            <View>
                <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.receiptText}>Tip amount:{"\t"}</Text>

                    <Button
                        buttonStyle = {[
                            styles.notPressed,
                            this.state.tenPercentPressed ? {backgroundColor: 'black'} : {}
                        ]}
                        title = '10%'
                        titleStyle = {{color: 'blue'}}
                        onPress = {() => this.pressTenPercent()}
                    />

                    <Button
                        buttonStyle = {[
                            styles.notPressed,
                            this.state.fifteenPercentPressed ? {backgroundColor: 'black'} : {}
                        ]}
                        title = '15%'
                        titleStyle = {{color: 'blue'}}
                        onPress = {() => this.pressFifteenPercent()}
                    />

                    <Button
                        buttonStyle = {[
                            styles.notPressed,
                            this.state.twentyPercentPressed ? {backgroundColor: 'black'} : {}
                        ]}
                        title = '20%'
                        titleStyle = {{color: 'blue'}}
                        onPress = {() => this.pressTwentyPercent()}
                    />

                    <View style = {[
                        styles.notPressed,
                        this.state.customPressed ? {backgroundColor: 'black'} : {}
                    ]}>
                        <TextInput
                            style = {{fontSize: 15, color: 'blue', lineHeight: 15}}
                            placeholder = "Custom $ amount"
                            onChangeText = {this.updateTip}
                        />
                    </View>
                </View>
            
                {this.renderTotalWithTip()}
            </View>
        )
    }

    renderTotalWithTip = () => {
        if (!this.state.customPressed) {
            this.tipAmount = (this.totalWithTax * (parseFloat(this.tipPercent) / 100)).toFixed(2)
            this.totalWithTip = (+this.totalWithTax + +this.tipAmount).toFixed(2)
        } else {
            this.tipAmount = (parseFloat(this.tipAmount)).toFixed(2)
            this.totalWithTip = (+this.totalWithTax + +this.tipAmount).toFixed(2)
        }

        return (
            <Text style = {styles.receiptText}>Tip amount: ${this.tipAmount}{"\n"}
                New total with tip: ${this.totalWithTip}
            </Text>
        )
    }

    payWithCard = async () => {
        let amountDueCheck = (+this.total + +this.tipAmount + +this.tax - this.discount) / this.numPeople

        let transaction = {
            amountDue: amountDueCheck.toFixed(2),
            tax: (this.tax / this.numPeople).toFixed(2),
            discount: (this.discount / this.numPeople).toFixed(2),
            orderTotal: (this.total / this.numPeople).toFixed(2),
            paymentMethod: "Credit Card",
            tips: (this.tipAmount / this.numPeople).toFixed(2),
            waitstaff: this.waitStaffID
        }

        let success = await addTransaction(transaction)

        if (success === false) {
            alert('Transaction failed. Try again')
        } else {
            this.setState({
                creditCardDialog: false,
                successDialog: true
            })
        }
    }

    payWithCash = async () => {
        let amountDueCheck = (+this.total + +this.tipAmount + +this.tax - this.discount) / this.numPeople

        let transaction = {
            amountDue: amountDueCheck.toFixed(2),
            tax: (this.tax / this.numPeople).toFixed(2),
            discount: (this.discount / this.numPeople).toFixed(2),
            orderTotal: (this.total / this.numPeople).toFixed(2),
            paymentMethod: "Credit Card",
            tips: (this.tipAmount / this.numPeople).toFixed(2),
            waitstaff: this.waitStaffID
        }

        let success = await addTransaction(transaction)

        if (success === false) {
            alert('Transaction failed. Try again')
        } else {
            this.setState({
                howToPayDialog: false,
                successDialog: true
            })
        }
    }

    pressButtonOne = () => {
        if (1 === this.randomNum) {
            alert('You have won a free dessert!')
        } else {
            alert('You have not won a free dessert')
        }

        this.setState({ successDialog: false })
        ++this.peoplePaid
        
        if (this.peoplePaid === this.numPeople) {
            this.setState({ questionsDialog: true })
        } else {
            this.setState({ howToPayDialog: true })
        }
    }

    pressButtonTwo = () => {
        if (2 === this.randomNum) {
            alert('You have won a free dessert!')
        } else {
            alert('You have not won a free dessert')
        }

        this.setState({ successDialog: false })
        ++this.peoplePaid
        
        if (this.peoplePaid === this.numPeople) {
            this.setState({ questionsDialog: true })
        } else {
            this.setState({ howToPayDialog: true })
        }
    }

    pressButtonThree = () => {
        if (3 === this.randomNum) {
            alert('You have won a free dessert!')
        } else {
            alert('You have not won a free dessert')
        }

        this.setState({ successDialog: false })
        ++this.peoplePaid
        
        if (this.peoplePaid === this.numPeople) {
            this.setState({ questionsDialog: true })
        } else {
            this.setState({ howToPayDialog: true })
        }
    }

    pressButtonFour = () => {
        if (4 === this.randomNum) {
            alert('You have won a free dessert!')
        } else {
            alert('You have not won a free dessert')
        }

        this.setState({ successDialog: false })
        ++this.peoplePaid
        
        if (this.peoplePaid === this.numPeople) {
            this.setState({ questionsDialog: true })
        } else {
            this.setState({ howToPayDialog: true })
        }
    }

    pressButtonFive() {
        if (5 === this.randomNum) {
            alert('You have won a free dessert!')
        } else {
            alert('You have not won a free dessert')
        }

        this.setState({ successDialog: false })
        ++this.peoplePaid
        
        if (this.peoplePaid === this.numPeople) {
            this.setState({ questionsDialog: true })
        } else {
            this.setState({ howToPayDialog: true })
        }
    }

    submitQuestions = async () => {
        let check = await addQuestionDoc(this.questionsDoc);
        if (check === false) {
            console.log("Error adding reviews to database")
        }

        this.setState({ questionsDialog: false })
        this.props.navigation.navigate('Load')
    }

    displayCouponDialog = () => {
        this.setState({
            receiptDialog: false,
            couponDialog: true
        })
    }

    displayHowToPayDialog = () => {
        var i;

        for(i = 0; i < this.numPeople; i++) {
            if (i === 0) {
                this.setState({ receiptDialog: false })
                
                this.setState({ howToPayDialog: true })
            } else {
                this.setState({ howToPayDialog: false })

                this.setState({ howToPayDialog: true })
            }
        }
    }

    displayCreditCardDialog = () => {
        this.setState({
            splitBillDialog: false,
            howToPayDialog: false,
            creditCardDialog: true
        })
    }

    displaySplitBillDialog = () => {
        this.setState({
            receiptDialog: false,
            splitBillDialog: true
        })
    }

    displayQuestionsDialog = () => {
        this.setState({
            successDialog: false,
            questionsDialog: true
        })
    }

    dismissReceiptDialog = () => {
        this.setState({ receiptDialog: false })
    }

    dismissCouponDialog = () => {
        this.setState({ 
            couponDialog: false,
            receiptDialog: true 
        })
    }

    dismissCouponSuccessDialog = () => {
        this.setState({
            couponSuccessDialog: false,
            receiptDialog: true
        })
    }

    backToReceiptDialog = () => {
        this.setState({
            splitBillDialog: false,
            receiptDialog: true
        })
    }

    dismissSplitBillDialog = () => {
        this.setState({ splitBillDialog: false })
    }

    dismissHowToPayDialog = () => {
        this.setState({ howToPayDialog: false })
    }

    dismissCreditCardDialog = () => {
        this.setState({ creditCardDialog: false })
    }

    dismissServerCalledDialog = () => {
        this.setState({ serverCalledDialog: false })
    }

    render() {
        return (
            <ImageBackground
                source = {Background}
                style = {styles.container}
            >
                <View style = {styles.cart}>
                   <Text style = {styles.shoppingCartText}>Shopping Cart (Scrollable)</Text>

                   <FlatList
                        data = {this.buyingItems}
                        keyExtractor = {(item, index) => index.toString()}
                        renderItem = {({item, index}) => (
                            <View style = {styles.itemContainer}>
                                <Text style = {{fontSize: 25, color: 'black', fontWeight: 'bold'}}>{item.name} - ${item.price}</Text>

                                <Image
                                    style = {{height: 110, width: 250}}
                                    resizeMethod = 'scale'
                                    resizeMode = 'contain'
                                    source = {{uri: item.uri}}
                                />

                                {/* <View style = {{width: 400, height: 147, backgroundColor: 'white', borderWidth: 2, borderColor: 'black'}}>
                                    <Text style = {{fontSize: 20, color: 'black', fontWeight: 'bold'}}>Ingredients: (Click any you do not want)</Text>

                                    {this.displayIngredients}
                                </View> */}

                                <View style = {{width: 1100, height: 147, backgroundColor: 'yellow', alignSelf: 'center', borderWidth: 2, borderColor: 'black', marginLeft: 10}}>
                                    <TextInput 
                                        style = {{fontSize: 20, color: 'black', fontWeight: 'bold', lineHeight: 20}}
                                        multiline = {true}
                                        placeholder = "Special Requests (or ingredients to add)"
                                        onChangeText = {this.updateRequests(index)}
                                    />
                                </View>

                                {/* <View style = {{alignContent: 'flex-end'}}>
                                    {this.showCorrectX()}
                                </View> */}
                            </View>
                        )}
                    />
                </View>
                
                <View style = {{height: 165, width: '100%', flex: 1, flexDirection: 'row'}}>
                    <TouchableHighlight
                        style = {styles.arrowBackground}
                        onPress = {() => this.props.navigation.goBack()}
                    >
                        <Image source = {LeftArrow}/>
                    </TouchableHighlight>

                    <View style = {styles.rightIcons}>
                        <TouchableHighlight
                            style = {styles.buttonBackground}
                            onPress = {() => this.initiatePay()}
                        >
                            <Image source = {PayButton}/>
                        </TouchableHighlight>
                    </View>
                </View>






                {/* Dialog Boxes Here */}
                <Dialog
                    visible = {this.state.receiptDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = {"Receipt: Order ID-" + this.props.orderID}/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "PAY"
                                onPress = {this.displayHowToPayDialog} 
                            />
                            <DialogButton
                                text = "COUPONS"
                                onPress = {this.displayCouponDialog}
                            />
                            <DialogButton
                                text = "SPLIT THE BILL"
                                onPress = {this.displaySplitBillDialog}
                            />
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissReceiptDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        {this.renderReceipt()}

                        <Text style = {styles.receiptText}>
                            {"\n"}
                            Total:{"\t\t\t\t"}${this.total}{"\n"}
                            Tax (8%):{"\t"}${this.tax}{"\n"}
                            {"\n"}
                        </Text>

                        {this.renderCoupon()}

                        {this.renderTipButtons()}

                        {this.renderSplit()}

                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.couponDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Coupons"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "TRY CODE"
                                onPress = {() => this.tryCouponCode(this.couponCode)} 
                            />
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissCouponDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {styles.receiptText}>Try coupon code: </Text>

                        <TextInput style = {styles.receiptText}
                            style = {{fontSize: 20, color: 'black', fontWeight: 'bold', lineHeight: 20}}
                            placeholder = "Input coupon code"
                            onChangeText = {this.updateCouponCode}
                        />

                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.couponSuccessDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Success!"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "BACK TO RECEIPT"
                                onPress = {this.dismissCouponSuccessDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {styles.receiptText}>Success! {this.percentOff}% off of your meal</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.splitBillDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Split Bill"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "CONTINUE"
                                onPress = {this.backToReceiptDialog} 
                            />
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissSplitBillDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {styles.receiptText}>How many ways do you want to split the check?</Text>
                            <TextInput style = {styles.receiptText}
                                style = {{fontSize: 20, color: 'black', fontWeight: 'bold', lineHeight: 20}}
                                placeholder = "1"
                                onChangeText = {this.updateNumPeople}
                            />
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.howToPayDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Payment Method"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "CREDIT CARD"
                                onPress = {this.displayCreditCardDialog}
                            />
                            <DialogButton
                                text = "CASH"
                                onPress = {this.payWithCash}
                            />
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissHowToPayDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
                            How will you be paying today?
                            Your total is ${(this.totalWithTip / this.numPeople).toFixed(2)}
                        </Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.creditCardDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Credit Card"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "SWIPE"
                                onPress = {this.payWithCard}
                            />
                            <DialogButton
                                text = "DISMISS"
                                onPress = {this.dismissCreditCardDialog}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Your total is: ${(this.totalWithTip / this.numPeople).toFixed(2)}</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.successDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Free DESSERT (Order has been receieved by the kitchen)"/>
                    }
                >
                    <DialogContent>
                        <View>
                            <View style = {{flexDirection: 'row'}}>
                                <Text style = {styles.receiptText}>Pick a number 1-5, if you guess the right one, you will get a FREE DESSERT!{"\t"}</Text>

                                <Button
                                    buttonStyle = {styles.notPressed}
                                    title = '1'
                                    titleStyle = {{color: 'blue'}}
                                    onPress = {() => this.pressButtonOne()}
                                />

                                <Button
                                    buttonStyle = {styles.notPressed}
                                    title = '2'
                                    titleStyle = {{color: 'blue'}}
                                    onPress = {() => this.pressButtonTwo()}
                                />

                                <Button
                                    buttonStyle = {styles.notPressed}
                                    title = '3'
                                    titleStyle = {{color: 'blue'}}
                                    onPress = {() => this.pressButtonThree()}
                                />

                                <Button
                                    buttonStyle = {styles.notPressed}
                                    title = '4'
                                    titleStyle = {{color: 'blue'}}
                                    onPress = {() => this.pressButtonFour()}
                                />

                                <Button
                                    buttonStyle = {styles.notPressed}
                                    title = '5'
                                    titleStyle = {{color: 'blue'}}
                                    onPress = {() => this.pressButtonFive()}
                                />
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible = {this.state.questionsDialog}
                    dialogAnimation = {new ScaleAnimation()}
                    dialogTitle = {
                        <DialogTitle title = "Survey"/>
                    }
                    footer = {
                        <DialogFooter>
                            <DialogButton
                                text = "SUBMIT"
                                onPress = {this.submitQuestions}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <View>
                            <Text style = {styles.receiptText}>{this.questionsDoc.questions[0]}</Text>
                            <View style = {{width: 300, height: 50, backgroundColor: 'grey', alignSelf: 'center', borderWidth: 2, borderColor: 'black', marginLeft: 10}}>
                                <TextInput 
                                    style = {{fontSize: 20, color: 'black', fontWeight: 'bold', lineHeight: 20}}
                                    multiline = {true}
                                    placeholder = {this.questionsDoc.reviews[0]}
                                    onChangeText = {this.updateReview(0)}
                                />
                            </View>

                            <Text style = {styles.receiptText}>{this.questionsDoc.questions[1]}</Text>
                            <View style = {{width: 300, height: 50, backgroundColor: 'grey', alignSelf: 'center', borderWidth: 2, borderColor: 'black', marginLeft: 10}}>
                                <TextInput 
                                    style = {{fontSize: 20, color: 'black', fontWeight: 'bold', lineHeight: 20}}
                                    multiline = {true}
                                    placeholder = {this.questionsDoc.reviews[1]}
                                    onChangeText = {this.updateReview(1)}
                                />
                            </View>

                            <Text style = {styles.receiptText}>{this.questionsDoc.questions[2]}</Text>
                            <View style = {{width: 300, height: 50, backgroundColor: 'grey', alignSelf: 'center', borderWidth: 2, borderColor: 'black', marginLeft: 10}}>
                                <TextInput 
                                    style = {{fontSize: 20, color: 'black', fontWeight: 'bold', lineHeight: 20}}
                                    multiline = {true}
                                    placeholder = {this.questionsDoc.reviews[2]}
                                    onChangeText = {this.updateReview(2)}
                                />
                            </View>
                                 
                        </View>
                    </DialogContent>
                </Dialog>
                
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => ({
    orderID: state.ordReducer.orderID,
    customerID: state.custReducer.customerID
})

export default connect(mapStateToProps, {})(PayScreen);
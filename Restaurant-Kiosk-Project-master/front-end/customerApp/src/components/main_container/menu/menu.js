import React, { Component } from 'react';
import {View, Image, FlatList, Text, TouchableHighlight, ImageBackground} from 'react-native';
import Dialog, {DialogContent, DialogFooter, DialogButton, ScaleAnimation, DialogTitle} from 'react-native-popup-dialog';
import Overlay from 'react-native-modal-overlay';
import { connect } from 'react-redux';
import {setAppetizers, setBeverages, setDesserts, setEntrees, setFiveDollarMeals} from '../../../store/actions/menu_actions';
import GreenPlus from '../../../assets/menu/green-plus.png';
import RedMinus from '../../../assets/menu/red-minus.png';
import InfoIcon from '../../../assets/menu/Info-Icon.png';
import ChiliPeper from '../../../assets/menu/pepper.png';
import styles from './styles.js';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.menuList,
            infoDialog: false,
            drinkOverlay: false
        };
        this.type = null;
        this.index = 0;
    }

    componentDidMount() {
        this.type = this.state.items[0].type
    }

    updateArray = () => {
        if (this.type === 'appetizer') {
            this.props.setAppetizers(this.state.items)
        } else if (this.type === 'beverage') {
            this.props.setBeverages(this.state.items)
        } else if (this.type === 'entree') {
            this.props.setEntrees(this.state.items)
        } else if (this.type === 'dessert') {
            this.props.setDesserts(this.state.items)
        } else if (this.type === 'five dollar') {
            this.props.setFiveDollarMeals(this.state.items)
        } else {
            alert('monkaS')
        }
    }

    incrementQty = (name) => {
        let newItems = [...this.state.items]

        var i;
        for(i = 0; i < newItems.length; ++i) {
            if(newItems[i].name === name) {
                ++newItems[i].quantity;
                break;
            }
        }

        if (this.type === 'five dollar') {
            this.setState({ drinkOverlay: true })
        } else {
            this.setState({items: newItems});
            this.updateArray()
        }
    }

    incrementQtyDrink = (name) => {
        let beverages = [...this.props.beverages]
        
        var i;
        for(i = 0; i < beverages.length; ++i) {
            if(beverages[i].name === name) {
                ++beverages[i].quantity;
                break;
            }
        }
        beverages[i].price = 0

        let newItems = [...this.state.items]
        newItems.drink = beverages[i];

        this.setState({
            items: newItems,
            drinkOverlay: false
        })
        
        this.updateArray();
    }

    decrementQty = (name) => {
        let newItems = [...this.state.items];

        var i;
        for(i = 0; i < newItems.length; ++i) {
            if(newItems[i].name === name) {
                if (newItems[i].quantity == 0) {
                    alert("Can not go below 0");
                    break;
                }
                
                --newItems[i].quantity;
                break;
            }
        }

        this.setState({items: newItems});
        this.updateArray(this.type)
    }

    displayInfoOverlay = (name) => {
        let newItems = [...this.state.items];

        var i;
        for(i = 0; i < newItems.length; ++i) {
            if(newItems[i].name === name) {
                this.index = i
                break;
            }
        }

        this.setState({ infoDialog: true })
    }

    renderInfo = () => {
        return (
            <Text style = {styles.infoText}>
                Common allergens:{'\t\t'}{this.state.items[this.index].allergens.join(', ')}{'\n'}
                Calories:{'\t\t'}{this.state.items[this.index].calories}{'\n'}
                Ingredients:{'\t\t'}{this.state.items[this.index].ingredients.join(', ')}{'\n'}
                Price:{'\t\t'}${this.state.items[this.index].price}{'\n'}
            </Text>
        )
    }

    renderPeper = (name) => {
        let newItems = [...this.state.items];

        var i;
        let found = false;

        for (i = 0; i < newItems.length; ++i) {
            if (newItems[i].name === name) {
                if (newItems[i].popular === true) {
                    found = true;
                    break;
                }
                
                break;
            }
        }

        if (found) {
            return (
                <Image
                    style = {{height: 64, width: 64}}
                    source = {ChiliPeper}
                />
            )
        } else {
            return (
                null
            )
        }
    }

    dismissInfoDialog = () => {
        this.setState({ infoDialog: false })
    }

    render() {
        return (
            <>
            <FlatList
                data = {this.props.menuList}
                renderItem = {({item}) => (
                    <View style = {styles.container}>
                        <View style = {{flex: 1}}>
                            <Text style = {styles.itemName}>{item.name} - ${item.price}</Text>
                            
                            <ImageBackground
                                style = {{height: 116, width: 150}}
                                source = {{uri: item.uri}}
                            >

                            <View style = {{flex: 1}}>
                                {this.renderPeper(item.name)}
                                
                                <TouchableHighlight
                                    style = {{alignSelf: 'flex-end'}}
                                    underlayColor = 'transparent'
                                    onPress = {() => this.displayInfoOverlay(item.name)}
                                >
                                    <Image source = {InfoIcon}/>
                                </TouchableHighlight>
                            </View>

                            </ImageBackground>
                        </View>
    
                        <View style = {{flex: 10, alignItems: 'flex-end'}}>
                            <Text style = {{fontSize: 45, marginRight: 55}}>{item.quantity}</Text>
                            
                            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <TouchableHighlight
                                    underlayColor = 'transparent'
                                    onPress = {() => this.incrementQty(item.name)}

                                >
                                    <Image 
                                        source = {GreenPlus}
                                        style = {{height: 64, width: 64}}
                                    />
                                </TouchableHighlight>
                    
                                <TouchableHighlight
                                    underlayColor = 'transparent'
                                    onPress = {() => this.decrementQty(item.name)}
                                    style = {{marginRight: 5}}
                                >
                                    <Image source = {RedMinus}/>
                                </TouchableHighlight>
                            </View>
                        </View>

                        
                    </View>
                )}
                keyExtractor = {(item, index) => index.toString()}
            />






            {/* Overlays Here */}
            <Overlay
                visible = {this.state.drinkOverlay}
                childrenWrapperStyle = {{width: 600, height: 800, alignSelf: 'center', backgroundColor: 'black'}}
                animationType = {'zoomIn'}
            >
                <Text style = {{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: 'white', 
                    alignSelf: 'center'
                }}>
                    Choose a drink for your meal
                </Text>
                <FlatList
                    data = {this.props.beverages}
                    renderItem = {({item}) => (
                        <View style = {styles.container}>
                            <View style = {{flex: 1}}>
                                <Text style = {styles.itemName}>{item.name}</Text>

                                <ImageBackground
                                    style = {{height: 116, width: 150}}
                                    source = {{uri: item.uri}}
                                >

                                {this.renderPeper(item.name)}

                                </ImageBackground>
                            </View>
                    
                            <View style = {{flex: 10, alignItems: 'flex-end'}}>
                                <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <TouchableHighlight
                                        underlayColor = 'transparent'
                                        onPress = {() => this.incrementQtyDrink(item.name)}

                                    >
                                        <Image 
                                            source = {GreenPlus}
                                            style = {{height: 64, width: 64}}
                                        />
                                    </TouchableHighlight>
                                </View>
                            </View>


                        </View>
                    )}
                    keyExtractor = {(item, index) => index.toString()}
                />
            </Overlay>

            {/* Dialog Boxes Here */}
            <Dialog
                visible = {this.state.infoDialog}
                dialogAnimation = {new ScaleAnimation()}
                dialogTitle = {
                    <DialogTitle title = {'Item Information'}/>
                }
                footer = {
                    <DialogFooter>
                        <DialogButton
                            text = "DISMISS"
                            onPress = {this.dismissInfoDialog}
                        />
                    </DialogFooter>
                }
            >
                <DialogContent>
                    {this.renderInfo()}
                </DialogContent>
            </Dialog>
        </>
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

export default connect(mapStateToProps, {setAppetizers, setBeverages, setEntrees, setDesserts, setFiveDollarMeals})(Menu);
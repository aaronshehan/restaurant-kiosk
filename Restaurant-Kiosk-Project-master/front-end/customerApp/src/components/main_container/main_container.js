import React, { Component } from 'react';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Background from '../../assets/background.jpeg';
import Header from './header/header';   // Header of different buttons
import Menu from './menu/menu';
import styles from './styles';

class MainContainer extends Component {
    render() {
        return (
            <ImageBackground
                source = {Background}
                style = {styles.container}
            >
                {/* Header */}
                <View style = {styles.headerContainer}>
                    <Header navigation = {this.props.navigation}/>
                </View>
        
                <Text style = {styles.menuText}>Menu:</Text>
        
                <ScrollView
                    ref = {ref => {global.scroll = ref}}
                    horizontal = {true}
                >
                    {/* Menu */}
                    <View style = {styles.menuContainer}>
                            {/* Beverages */}
                            <View style = {styles.firstMenu}>
                                {/* A list of items with a name, picture, and "+" and "-" buttons */}
                                <Text style = {styles.menuText}>Drinks</Text>
                                <Menu menuList = {this.props.beverages}/>
                            </View>

                            {/* Appetizers */}
                            <View style = {styles.menu}>
                                {/* A list of items with a name, picture, and "+" and "-" buttons */}
                                <Text style = {styles.menuText}>Appetizers</Text>
                                <Menu menuList = {this.props.appetizers}/>
                            </View>

                            {/* Entrees */}
                            <View style = {styles.menu}>
                                {/* A list of items with a name, picture, and "+" and "-" buttons */}
                                <Text style = {styles.menuText}>Entrees</Text>
                                <Menu menuList = {this.props.entrees}/>
                            </View>

                            {/* $5 Meals */}
                            <View style = {styles.menu}>
                                {/* A list of items with a name, picture, and "+" and "-" buttons */}
                                <Text style = {styles.menuText}>$5 Meals (With a drink)</Text>
                                <Menu menuList = {this.props.fiveDollarMeals}/>
                            </View>

                            {/* Desserts */}
                            <View style = {styles.lastMenu}>
                                {/* A list of items with a name, picture, and "+" and "-" buttons */}
                                <Text style = {styles.menuText}>Desserts</Text>
                                <Menu menuList = {this.props.desserts}/>
                            </View>
  
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => ({
    beverages:          state.menReducer.beverages,
    appetizers:         state.menReducer.appetizers,
    entrees:            state.menReducer.entrees,
    fiveDollarMeals:    state.menReducer.fiveDollarMeals,
    desserts:           state.menReducer.desserts,
})

export default connect(mapStateToProps)(MainContainer);
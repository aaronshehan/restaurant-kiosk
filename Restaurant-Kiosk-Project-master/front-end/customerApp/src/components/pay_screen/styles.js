import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    cart: {
        height: '85%',
        width: '100%',
        borderWidth: 5
    },
    shoppingCartText: {
        backgroundColor: 'black', 
        color: 'white', 
        fontSize: 25, 
        width: '100%'
    },
    itemContainer: {
        flex: 1,
        flexWrap: 'wrap',
        height: 150,
        width: '100%',
        borderWidth: 2,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    buttonBackground: {
        marginTop: 3,
        marginBottom: 3,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'green',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'black'
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
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'black'
    },
    rightIcons: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    receiptText: {
        color:'black',  
        fontWeight: 'bold', 
        fontSize: 15
    },
    blackText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },
    redText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'red'
    },
    notPressed: {
        backgroundColor: 'transparent',
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5
    },
    pressed: {
        backgroundColor: 'black'
    }
});
import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    headerContainer: {
        width: Dimensions.get('window').width,
        height: 120,
        borderWidth: 5
    },
    menuText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black', 
        alignSelf: 'center'
    },
    menuContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 10, 
        marginLeft: 40,
        marginRight: 40
    },
    firstMenu: {
        height: 600, 
        width: 325, 
        borderWidth: 5,
        marginRight: 25,
        borderColor: 'black',
        backgroundColor: 'black' 
    },
    menu: {
        height: 600, 
        width: 325, 
        borderWidth: 5,
        marginLeft: 50,
        marginRight: 50,
        borderColor: 'black',
        backgroundColor: 'black'
    },
    lastMenu: {
        height: 600, 
        width: 325, 
        borderWidth: 5,
        marginLeft: 75,
        borderColor: 'black',
        backgroundColor: 'black'
    },
    menuText: {
        fontSize: 28, 
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});
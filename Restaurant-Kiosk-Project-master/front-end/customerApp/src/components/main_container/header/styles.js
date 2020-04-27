import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header:{
        flex: 1,
        flexDirection: 'row'
    },
    general: {
        flexDirection: 'row',
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
        backgroundColor: 'black',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'black'
    },
    rightIcons: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    arrowBackground: {
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
});
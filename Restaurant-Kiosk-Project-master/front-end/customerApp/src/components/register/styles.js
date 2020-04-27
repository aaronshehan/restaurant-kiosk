import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    textFields: {
        height: '50%',
        width: '80%',
        justifyContent: 'space-around'
    },
    textField: {
        height: '12%',
        width: '100%',
        backgroundColor: 'white'
    },
    textFieldLabel: {
        fontSize: 25,
        fontFamily: "CamphorW01-Bold",
        color: 'black'
    },
    textInput: {
        fontSize: 25,
        color: 'black',
        lineHeight: 25
    },
    textInputErr: {
        fontSize: 25,
        lineHeight: 25,
        borderWidth: 2,
        color: 'black',
        borderColor: 'red'
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
});
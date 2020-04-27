import React from 'react'
import { View, Text } from 'react-native'

const Dot = ({color}) => {    
    return (
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 7.5,
            borderWidth: 1,
            borderColor: color ? 'transparent' : 'black',
            backgroundColor: color ? color: 'transparent',
          }}
        />
    )
}

export default Dot

import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

const Background = ({ children, justifyContent = 'center' }) => (  
    <KeyboardAvoidingView style={[styles.container, {justifyContent: justifyContent}]} behavior="height">
      {children}
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center'    
  },
});

export default memo(Background);
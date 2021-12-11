import React from 'react';
import {View, Text, StyleSheet}  from 'react-native';

const TextoLogin = ({children}) => {
    return (
        <View>
            <Text style={styles.container}>{children}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
    flex: 1, 
    fontSize: 30, 
    color: '#3aa6ffb2',
        justifyContent: 'center',
    alignItems: 'center',
    }
});

export default TextoLogin;
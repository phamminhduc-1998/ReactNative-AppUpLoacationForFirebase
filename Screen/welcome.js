import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function welcome({ navigation }) {

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('main', {})}>
                <Image style={{ width: 100, height: 100 }} source={{ uri: "https://www.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" }} ></Image>
            </TouchableOpacity>
            <Text>REACT NATIVE</Text>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

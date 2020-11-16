import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import * as Location from 'expo-location';
import * as firebase from 'firebase';

export default function main({ navigation }) {
    const [id, setId] = useState();
    const [longintude, setLongintude] = useState('');//Kinh độ
    const [latitude, setLatitude] = useState(''); //Vỹ độ
    const [arr, setArr] = useState([]);

    let getGPS = () => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            // setLocation(location);
            setLatitude(location.coords.latitude);
            setLongintude(location.coords.longitude);
        })();
    }


    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDhztHjOqqPgTN2Pzx-9vsx-9fzQy7xPtw",
        authDomain: "fir-democode-13af4.firebaseapp.com",
        databaseURL: "https://fir-democode-13af4.firebaseio.com",
        projectId: "fir-democode-13af4",
        storageBucket: "fir-democode-13af4.appspot.com",
        messagingSenderId: "797507222176",
        appId: "1:797507222176:web:1ea9498de2c3c9b0c4a7c5",
        measurementId: "G-71Z5ZL2FV3"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }



    //Them du lieu vao Realtime Database
    function storeNewStudent(id, longintude, latitude) {
        firebase.database().ref('students/' + id).set({
            Longintude: longintude,
            Latitude: latitude
        }, function (error) {
            if (error) {
                // The write failed...
                alert('Loi')
            } else {
                // Data saved successfully!
                alert('Thanh cong!!!')
            }
        });
    }




    //Hiển thị danh sách dữ liệu
    //Array Students sẽ được trả về trong biến snapshot. Mn sử dụng biến này truyền dữ liệu vào FlatList để hiển thị thông tin lên màn hình
    const readUserData = () => {
        firebase.database().ref('students/').on('value', function (snapshot) {

            // console.log(arr)
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.id,
                    longintude: childData.Longintude,
                    latitude: childData.Latitude,

                });
            });
            setArr(array)
            console.log(arr);
        });
    }




    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="ĐỊA DANH"
                onChangeText={
                    (text) => {
                        setId(text)
                    }
                }></TextInput>
            <Text>Vỹ độ : {latitude} : Kinh độ : {longintude}</Text>
            <Button title="GET GPS" onPress={() => {
                getGPS();
            }} />
            <Button title="CAP NHAT" onPress={() => {
                storeNewStudent(id, longintude, latitude);
            }} />
            <Button title='HIEN THI' onPress={() => {
                readUserData();
            }}
            />
            <FlatList style={{ flex: 1, }}
                data={arr}
                renderItem={({ item }) => (

                    <View key={`item_${item.id}`} style={{ borderWidth: 1, margin: 8, width: 250, borderRadius: 5, }}>
                        <Text>{item.longintude}</Text>
                        <Text>{item.latitude}</Text>

                    </View>

                )}
            />
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
    textInput: {

        width: `80%`,
        borderWidth: 1,
        borderColor: "cyan",
        borderRadius: 5,
        padding: 10,
        margin: 10,


    }
});

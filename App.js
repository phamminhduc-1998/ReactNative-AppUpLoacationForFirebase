import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//đối tượng dùng để chứa các createStackNavigator
import { NavigationContainer } from '@react-navigation/native';
//đối tượng dùng để khai báo array các màn hình
import { createStackNavigator } from '@react-navigation/stack'
import welcome from "./Screen/welcome";
import main from "./Screen/main"


//createStackNavigator là đối tượng dùng để quản lý chuyển đổi màn hình cơ bản nhất trong gói Navigation
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name="welcome" //tên của màn hình, giá trị này dùng để định danh cho màn hình đó
          component={welcome} //tham chiếu tới file .js màn hình đó
          options={{ title: 'Welcome' }}//khai báo 1 số thông tin cho màn hình đó như tiêu đề, nút back, actionBar ….
        />
        <Stack.Screen
          name="main"
          component={main}
          options={{ title: 'main' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View, TextInput} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';





function WelcomeScreen({ navigation }) {
  const [userId, setUserId] = useState('This is your user ID');
  const [password, setPassword] = useState('This is your password');
  const [isloggedin, setIsloggedin] = useState('False');



  function requestOTP(userId){

    let fetchUrl = 'http://54.158.192.252/employee/email_service/email/' + userId

    fetch(fetchUrl, {
      method: 'GET', //Request Type
    
    })



  }


  
  const verifyOTP = (password) => {

        
    var data = {"OTP":password}
    
    let verifyUrl = 'http://54.158.192.252/employee/OTP/'+ userId+'/'
    var dataToSend = JSON.stringify(data)

    fetch(verifyUrl, {
      method: 'POST', //Request Type
      
      body: dataToSend,
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 200){
        alert("OTP is right")
        navigation.navigate('Logged In')
      } else if (response.status === 400){

        alert("OTP is wrong! Please try again!")

      }
      
    })
   
    .catch((error) => {
      alert(error);
    });

  }

  const save = async () => {
    try {
      await AsyncStorage.setItem('MyUserid', userId);
      alert('User ID saved')
    } catch (err) {
      alert(err);
    }
  }

  const load = async () => {
    try {

      let userId = await AsyncStorage.getItem('MyUserid');
      


      
      if (userId !== null) {
        setUserId(userId);

      }
    } catch (err) {
      alert(err);
    }
  }
  return (

      
    
    <ImageBackground 
    style={styles.background}
    source= {require('../assets/bkImage.jpeg')} 
    >


      <View style={styles.container}> 


        <Text>       Please enter your User ID to get OTP:</Text>

        <TextInput
          style = {styles.input}
          placeholder = 'User ID'
          onChangeText={(_userId) => setUserId(_userId)} />


        <TextInput
          style = {styles.input}
          placeholder = 'One-time-password'
          onChangeText={(_psaaword) => setPassword(_psaaword)} />
       </View>

       <View style={styles.buttonStyle}> 
       <Button
          title="Save User ID"
          color = 'blue'
          onPress={() => save()}
        />
      <Button
      
        color='green'
        title="Request One-time-password"
        onPress={() => {
        requestOTP(userId)
        alert('OTP Requested, please check your email.')
      }}
    />
        <Button
          title="Log In"
          //onPress={() => verifyOTP(password)}
          onPress={() => verifyOTP(password)}    
        />
       

       </View>
       
         

       
    </ImageBackground>
      
  


  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end'

  },
  loginButton: {
    width: '100%',
    height: 70,
    backgroundColor : '#fc5c65',


  },

  requestPasscodeButton: {
    width: '100%',
    height: 150,
    backgroundColor : '#5ecdc4',

  },
  buttonStyle:{
    flex:1,
    //backgroundColor: '#fff',
    //alignItem: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,

  },

  container:{
    flex:1,
    //backgroundColor: '#fff',
    //alignItem: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,

  },

  input:{
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    padding: 8,
    margin: 20,
    width:'85%',
    textAlign: 'center',
  

  },
});

export default WelcomeScreen;
import React, { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground, StyleSheet, Text, View, Button, TextInput, SliderComponent } from 'react-native';

import moment from 'moment';

import Constants from 'expo-constants';
import * as Location from 'expo-location';




function ClockoutScreen({ navigation }) {
  
  const [clockintime, setClockintime] = useState('This is your clock in time');
  const [clockoutcode, setClockoutcode] = useState('Enter your code to blank');
  const [clockouttime, setClockouttime] = useState('Click SAVE CLOCK OUT TIME');
  // for location use
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coutlatitude, setCoutlatitude] = useState(null);
  const [coutlongitude, setCoutlongitude] = useState(null);


function saveClockouttime () {
    setClockouttime(moment().format('LLL'));
    alert('Saved! Please click Add Notes and Tasks performed to continue');

  }

  const save = async () => {
    try {
      
      await AsyncStorage.setItem('MyClockoutcode', clockoutcode);
      await AsyncStorage.setItem('MyClockouttime', clockouttime);
      await AsyncStorage.setItem('MyClockoutlocation', text);
      await AsyncStorage.setItem('MyClockoutla', coutlatitude);
      await AsyncStorage.setItem('MyClockoutlo', coutlongitude);
      
      alert('Time, code and location submitted')
    } catch (err) {
      alert(err);
    }
    
  }

  const getLocation = async() =>{

    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setCoutlatitude(String(location.coords.latitude));
    setCoutlongitude(String(location.coords.longitude));


  }

  const load = async () => {
    try {

      let clockintime = await AsyncStorage.getItem('MyClockintime');
      //let clockouttime = await AsyncStorage.getItem('MyClockouttime');
      //let clockoutcode = await AsyncStorage.getItem('MyClockoutcode');
      
      if (true) {  
        setClockintime(clockintime);
        //setClockouttime(clockouttime);
        //setClockoutcode(clockoutcode);
      }
    } catch (err) {
      alert(err);
    }
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = text = 'latitude:' + coutlatitude +'  '+ 'longtitude :' + coutlongitude;
  }

  async function allTasks(){

    await save();
    await navigation.navigate('Notes');


  }
  useEffect(() => {

    getLocation();
    
    load();
    
  },[]);

  return (
    
    <ImageBackground 
    style={styles.background}
    source= {require('../assets/bkImage.jpeg')} 
    >

      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>

      <View style={styles.container}> 

    

        <Text>Enter One-time Code from MedLink:</Text>


        <TextInput
        style = {styles.input}
        placeholder = 'Enter Passcode'
        maxLength={6}
        onChangeText={(_code) => setClockoutcode(_code)} />

        </View>

      




      <View style={styles.container}> 

        <Text>Your Clock in time is :{clockintime}</Text>

        <Text>Your Clock out time is :{clockouttime}</Text>
        <Text>Your Clock out code is :{clockoutcode}</Text>

  

      </View>

  

      <View >
        <Button
          title="Save Clock out time"
          color = 'green'
          onPress={() => {
            saveClockouttime()
          }}
        />

       </View>

       <View >
         <Button
          title="Add Notes and Tasks performed"
          onPress={() => allTasks()}
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

  buttonsStyle:{
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center',

  },
  container:{
    flex:1,
    //backgroundColor: '#fff',
    //alignItem: 'center',
    justifyContent: 'center',

  },

  input:{
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    padding: 8,
    margin: 10,
    width:400,


  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },



  
});

export default ClockoutScreen;
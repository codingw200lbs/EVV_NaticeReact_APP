import React from 'react';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, ImageBackground, StyleSheet, Text, View } from 'react-native';

import moment from 'moment';

import Constants from 'expo-constants';
import * as Location from 'expo-location';








function ClockinScreen({ navigation }) {
  // f
  const [clockincode, setClockincode] = useState(null);
  const [clockintime, setClockintime] = useState(null);
  const [officeid, setClockinofficeid] = useState(null);
  const [clientid, setClockinclientid] = useState(null);
  const [cinlatitude, setCinlatitude] = useState(null);
  const [cinlongitude, setCinlongitude] = useState(null);
  // for location use
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const save = async () => {
    try {

      await AsyncStorage.setItem('MyClockincode', clockincode);
      await AsyncStorage.setItem('MyClockintime', clockintime);
      //await AsyncStorage.setItem('MyClockinlocation', cinlongitude);
      await AsyncStorage.setItem('MyOfficeid', officeid);
      await AsyncStorage.setItem('MyClientid', clientid);
      await AsyncStorage.setItem('MyClockinla', cinlatitude);
      await AsyncStorage.setItem('MyClockinlo', cinlongitude);

      alert('Code and IDs saved!');

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
    setCinlatitude(String(location.coords.latitude));
    setCinlongitude(String(location.coords.longitude));



  }
  const load = async () => {
    try {
        let code = await AsyncStorage.getItem('MyClockincode');

       

      
      if (true) {
        setClockincode(clockincode);

      }
    } catch (err) {
      alert(err);
    }
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    //text = JSON.stringify(location);
    //var latitude = location.coords.latitude;
    //var longitude = location.coords.longitude;

    text = 'latitude:' + cinlatitude +'  '+ 'longtitude :' + cinlongitude;
  }


  var evvData = { "time_stamp": clockintime, "client_id": clientid, "latitude": cinlatitude, "longitude": cinlongitude, "office_id": officeid, "one_time_password": clockincode }

  const postDataToEvvServer = (evvData) => {
    //POST json
    var dataToSend = JSON.stringify(evvData);
    //making data to send on server
    
   
    
    //POST request
    fetch('http://ec2-52-23-212-121.compute-1.amazonaws.com:8080/evv/clock-in', {
      method: 'POST', //Request Type
      body: dataToSend, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status===200){

          alert('Clock in succeed!');
          navigation.navigate('Clock Out');
          
        }else{
          alert('Please check all your inputs again!');
        }
      
      })
     
 
      //If response is not in json then in error
      .catch((error) => {
        alert(error);
      });
  };
 
  
  

  useEffect(() => {
    getLocation();
    load();
    // important: to get the clock in time
    setClockintime(moment().format('LLL'));
  },[]);




  
  return (

    
    <ImageBackground 
    style={styles.background}
    source= {require('../assets/bkImage.jpeg')} 
    >

    <View style={styles.container}>

      <Text>Your clockintime:{clockintime}</Text>

      <Text>Your Office ID:{officeid} Your Clint ID:{clientid}</Text>
    
      <Text>Your clock in code:{clockincode}</Text>

    


    

    

    <Text>Enter One-time Code from MedLink:</Text>


    <TextInput
    style = {styles.input}
    placeholder = 'Enter Passcode'
    //keyboardType ={'numeric'}
    maxLength={6}
    onChangeText={(_code) => setClockincode(_code)} />

    <Text>Enter Office ID:</Text>


    <TextInput
    style = {styles.input}
    placeholder = 'Enter Office ID'
    //keyboardType ={'numeric'}
    maxLength={6}
    onChangeText={(_officeid) => setClockinofficeid(_officeid)} />

    <Text>Enter Client ID:</Text>


    <TextInput
    style = {styles.input}
    placeholder = 'Enter Client ID'
    //keyboardType ={'numeric'}
    maxLength={6}
    onChangeText={(_clientid) => setClockinclientid(_clientid)} />

    </View>


    

      <View >
        <Button
          title="Save code and IDs"
          color = 'green'
          onPress={() => save()}
        />

       </View>

      <View >
      <Button
          title="Clock In"

          onPress={() => {

            postDataToEvvServer(evvData)
            
            
            }
        
        }
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


export default ClockinScreen;

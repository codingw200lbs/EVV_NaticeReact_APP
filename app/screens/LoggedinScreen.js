import AsyncStorage from '@react-native-async-storage/async-storage';
import React,  { useState, useEffect }  from 'react';

import { ImageBackground, StyleSheet, Text, View, Button, TextInput, AsyncStorageStatic, } from 'react-native';


//test

function LoggedinScreen({ navigation }) {

  const [userId, setUserId] = useState('This is your user ID');


  const save = async () => {
    try {
      await AsyncStorage.setItem('MyNotes', notes);
      await AsyncStorage.setItem('MyTasks', tasks);
      alert('Tasks and Notes saved!');
    } catch (err) {
      alert(err);
    }
  }

  const load = async () => {
    try {

      let userId = await AsyncStorage.getItem('MyUserid')
      
      if (true) {
        setUserId(userId)
      }
    } catch (err) {
      alert(err);
    }
  }
  let user_firstname = 'Weiquan';
  useEffect(() => {
    load();
  },[]);
  
  return (
    
    <ImageBackground 
    style={styles.background}
    source= {require('../assets/bkImage.jpeg')} 
    >
     

      <View style={styles.container}> 
        <Text style={styles.container}>Hello! {user_firstname} {"\n"} {"\n"}{"\n"}Your User ID is: {userId}</Text>
        
        

      </View>



       <View >
        <Button
          title="History"
          color = 'green'
          
          onPress={() =>{

            alert('There is no history right now')


          }
        
        }
        />
       </View>
       <View >
       <Button
          title="Start A New Clock In"
          onPress={() => navigation.navigate('Clock In')}
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
    fontSize: 30,
    //backgroundColor: '#fff',
   // alignItem: 'center',
    justifyContent: 'center',

  },

  input:{
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    padding: 8,
    margin: 10,
    width:400,
    height: 50,

  },
    
});
export default LoggedinScreen;
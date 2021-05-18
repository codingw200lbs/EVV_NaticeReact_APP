import AsyncStorage from '@react-native-async-storage/async-storage';
import React,  { useState, useEffect }  from 'react';

import { ImageBackground, StyleSheet, Text, View, Button, TextInput, AsyncStorageStatic, } from 'react-native';


//test

function NotesScreen({ navigation }) {

  const [notes, setNotes] = useState('This is your notes');

  const [tasks, setTasks] = useState('This is your tasks');

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

      let notes = await AsyncStorage.getItem('MyNotes')
      
      if (notes !== null) {
        setNotes(notes)
      }
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    load();
  },[]);
  
  return (
    
    <ImageBackground 
    style={styles.background}
    source= {require('../assets/bkImage.jpeg')} 
    >

      <View style={styles.container}> 
        <Text>Enter tasks performed:</Text>
        <TextInput

        style = {styles.input}
        placeholder = 'e.g. housekeeping,  laundry services, shopping... '
        onChangeText={(_tasks) => setTasks(_tasks)} />

        <Text>Enter visit notes:</Text>
        <TextInput

        style = {styles.input}
        placeholder = 'e.g. performed other household requirements; It was a successful visit!'
        onChangeText={(_notes) => setNotes(_notes)} />
       </View>



       <View >
        <Button
          title="Save notes"
          color = 'green'
          onPress={() => save()}
        />
       </View>
       <View >
       <Button
          title="Review Visit"
          onPress={() => navigation.navigate('Review')}
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
export default NotesScreen;
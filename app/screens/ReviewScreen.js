import AsyncStorage from '@react-native-async-storage/async-storage';
import React,  { useState, useEffect }  from 'react';
import { ImageBackground, StyleSheet, Text, View, Button } from 'react-native';




function ReviewScreen({ navigation }) {


    const [userId, setUserId] = useState('This is your user ID');
    const [clockincode, setClockincode] = useState('This is your clock in one-time code');
    const [clockoutcode, setClockoutcode] = useState('This is your clock out one-time code');
    
    const [notes, setNotes] = useState('This is your notes');
    const [tasks, setTasks] = useState('This is your tasks');

    const [clockintime, setClockintime] = useState('This is your clock in time');
    const [clockouttime, setClockouttime] = useState('This is your clock out time');
    const [clockinlocation, setClockinlocation] = useState('This is your clock in location');
    const [clockoutlocation, setClockoutlocation] = useState('This is your clock out location');

    const [officeid, setClockinofficeid] = useState('This is the Office ID');
    const [clientid, setClockinclientid] = useState('This is the Client ID');

    const [cinlatitude, setCinlatitude] = useState(null);
    const [cinlongitude, setCinlongitude] = useState(null);
    const [coutlatitude, setCoutlatitude] = useState(null);
    const [coutlongitude, setCoutlongitude] = useState(null);



  const save = async () => {
    try {
      await AsyncStorage.setItem('MyNotes', notes);
    } catch (err) {
      alert(err);
    }
  }

  const load = async () => {
    try {
        let clockincode = await AsyncStorage.getItem('MyClockincode');
        let clockoutcode = await AsyncStorage.getItem('MyClockoutcode');
        let userId = await AsyncStorage.getItem('MyUserid');
        let notes = await AsyncStorage.getItem('MyNotes');
        let tasks = await AsyncStorage.getItem('MyTasks');
        let clockintime = await AsyncStorage.getItem('MyClockintime');
        let clockouttime = await AsyncStorage.getItem('MyClockouttime');
        let clockinlocation = await AsyncStorage.getItem('MyClockinlocation');
        let clockoutlocation = await AsyncStorage.getItem('MyClockoutlocation');
        let officeid = await AsyncStorage.getItem('MyOfficeid');
        let clientid = await AsyncStorage.getItem('MyClientid');
        let cinlatitude = await AsyncStorage.getItem('MyClockinla');
        let cinlongitude = await AsyncStorage.getItem('MyClockinlo');
        let coutlatitude = await AsyncStorage.getItem('MyClockoutla');
        let coutlongitude = await AsyncStorage.getItem('MyClockoutlo');

       

      
      if (true) {
        setClockincode(clockincode);
        setClockoutcode(clockoutcode);
        setUserId(userId);
        setNotes(notes);
        setTasks(tasks);
        setClockintime(clockintime);
        setClockouttime(clockouttime);
        setClockinlocation(clockinlocation);
        setClockoutlocation(clockoutlocation);
        setClockinofficeid(officeid);
        setClockinclientid(clientid);
        setCinlatitude(cinlatitude);
        setCinlongitude(cinlongitude);
        setCoutlatitude(coutlatitude);
        setCoutlongitude(coutlongitude);

      }
    } catch (err) {
      alert(err);
    }
  }


//test for JSON, needs to edit

  var evvData = { "time_stamp": clockouttime, "client_id": clientid, "latitude": coutlatitude, "longitude": coutlongitude, "tasks_performed": [tasks,notes], "office_id": officeid, "one_time_password": clockoutcode }

  const postDataToEvvServer = (evvData) => {
    //POST json
    var dataToSend = JSON.stringify(evvData);
    //making data to send on server
    
   
    
    //POST request
    fetch('http://ec2-52-23-212-121.compute-1.amazonaws.com:8080/evv/clock-out', {
      method: 'POST', //Request Type
      body: dataToSend, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status===200){

          alert('Clock out succeed!');
          navigation.navigate('Logged In');
          
        }else{
          alert('Please check all your inputs again!');
        }
      })
     
 
      //If response is not in json then in error
      .catch((error) => {
        alert(error);
      });
  };
 
// 
  useEffect(() => {
  load();
  },[]);

  return (
    
    <ImageBackground 
    style={styles.background}
    source= {require('../assets/bkImage.jpeg')} 
    >
      <Text style={styles.container}>Your User ID:{userId}</Text>
      <Text style={styles.container}>Your Office ID:{officeid}</Text>
      <Text style={styles.container}>Your Clint ID:{clientid}</Text>
      <Text style={styles.container}>Task performed:{tasks}</Text>
      <Text style={styles.container}>Your Notes:{notes}</Text>
      <Text style={styles.container}>Your clock in code:{clockincode}</Text>
      <Text style={styles.container}>Your clock out code:{clockoutcode}</Text>
      
      <Text style={styles.container}>Your clockintime:{clockintime}</Text>
      <Text style={styles.container}>Your clockouttime:{clockouttime}</Text>


    




       <View >
       <Button
       style={styles.buttonsStyle}
          title="Confirm"
          onPress={() => {
            postDataToEvvServer(evvData)

          }}
        />
         
       </View>
      
       
    </ImageBackground>
      
  


  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    fontSize: 30,

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
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center',
    
    

  },
  container:{
    
    fontSize: 20,
    padding: 10,
    margin: 1,
   
    //backgroundColor: '#fff',
   
    justifyContent: 'center',

  },

  input:{
    borderWidth: 1,
    borderColor: '#777',
    backgroundColor: '#fff',
    padding: 8,
    margin: 10,
    width:400,
    height: 150,

  },
    
});
export default ReviewScreen;
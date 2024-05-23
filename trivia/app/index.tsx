import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import DeviceInfo from 'react-native-device-info'
import { getUniqueId } from 'react-native-device-info';

const Index = () => {
  const navigate = useNavigation();
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<string | null>(null)
  
  const handleStart = async () => {
    try {
        // get unique id
      let info = DeviceInfo.getUniqueId();
      console.log("Device Info: ", info)      
      
      // register the device
      // const response = await fetch('https://api.pactrivia.levarga.com/regDevice', {method: 'POST'})
      // const json = await response.json();
      // setUserToken(json.token)
      // console.log(userToken);
    }
    catch (error) {
      console.log(error)
    }
    
    
    // console.log("useToken: ", userToken)
    // router.push("/trivia") 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PacTrivia</Text>
      <Text style={styles.description}>Answer questions correctly for a chance to win cool perks</Text>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    backgroundColor: 'red', 
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Index;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';


const Index = () => {
  const navigate = useNavigation();
  const router = useRouter();
  
  const handleStart = () => {
    router.push("/trivia") 
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

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import getVariable from "./storage/getItem";
import { Audio } from 'expo-av';
import { handleSessionStart } from "../services/session_handler";


const EndPage = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const score = Number(params.score);
  const selectedTeams  = JSON.parse(params.selectedTeams);

  const [endGameSound, setEndGameSound] = useState<Audio.Sound | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchDarkModeValue = async () => {
      await getVariable("darkMode").then((value) => { 
        if (value !== null) {
          setDarkMode(value);
        } else {
          setDarkMode(false);
        }
      });
    }
    
    fetchDarkModeValue();

    const loadEndGameSound = async () => {
      try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../assets/endGame.mp3')); 
        await soundObject.setVolumeAsync(.3); 
        setEndGameSound(soundObject);
        await soundObject.playAsync();
        console.log("End game sound played");
      } catch (error) {
        console.error("Error loading end game sound: ", error);
      }
    };

    loadEndGameSound();

    return () => {
      endGameSound && endGameSound.unloadAsync();
    };
  }, []);

  const handleRestart = () => {
    handleSessionStart(selectedTeams, router, true);
  };

  const backToHome = () => {
    // let 0 be false for not retrying the quiz
    router.push({ pathname: "/"});
  };

  const getProgressColor = () => {
    if (score <= 3) {
      return "#ff6454";
    } else if (score <= 6) {
      return "orange";
    } else {
      return "#00A36C";
    }
  };

  const getCongratulatoryMessage = () => {
    if (score <= 3) {
      return "Better luck next time!";
    } else if (score <= 6) {
      return "Good job! Keep improving.";
    } else {
      return "Congratulations! You nailed it!";
    }
  };

  const progressColor = getProgressColor();
  const congratulatoryMessage = getCongratulatoryMessage();

  return (
    <View style={[styles.container, darkMode ? {backgroundColor: "#282828"} : {backgroundColor: "#f8f8f8"}]}>
      <View style={[styles.content, darkMode ? {backgroundColor: "#121212"} : {backgroundColor: "white"}]}>
        <Text style={[styles.title, darkMode ? {color: "white"} : {color: "#333"}]}>Trivia Over</Text>
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={200}
            width={15}
            fill={(score / 10) * 100}
            tintColor={progressColor}
            backgroundColor="#e6e6e6"
            rotation={0}
          >
            {() => (
              <View style={styles.scoreContainer}>
                <Text style={[styles.scoreText, darkMode ? {color: "white"} : {color: "#333"}]}>{score}/10</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={[styles.congratulatoryMessage, darkMode ? {color: "white"} : {color: "#333"}]}>
          {congratulatoryMessage}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={backToHome}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  progressContainer: {
    marginBottom: 20,
  },
  scoreContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 48,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  congratulatoryMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  numericalScore: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6E6C6C",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EndPage;

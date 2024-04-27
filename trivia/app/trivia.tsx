import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TriviaScreen = () => {
    const localImage = require('./timer.png');


    const [timer, setTimer] = useState(30);

type AnswerChoice = {
    text: string;
    color: string;
  };
  
  const answerChoices: AnswerChoice[] = [
    { text: 'Friends', color: '#FF6768' },
    { text: 'The Office', color: '#FFD747' },
    { text: 'Parks & Rec', color: '#4DBD33' },
    { text: 'Big Bang Theory', color: '#4D79FF' },
  ];

  type AnimatablePressableRef = React.RefObject<Animatable.View & TouchableOpacity>;
  const buttonRefs = useRef<AnimatablePressableRef[]>(answerChoices.map(() => React.createRef()));
  const handlePressIn = (refIndex: number) => {
    buttonRefs.current[refIndex]?.current?.pulse?.(800);
  };

  const renderAnswerButton = (choice: AnswerChoice, index: number) => {
    return (
      <Animatable.View
        key={index}
        ref={buttonRefs.current[index]}
        style={getAnswerButtonStyle(choice.color)}
      >
        <Pressable style={styles.pressable} onPressIn={() => handlePressIn(index)}>
          <Text style={styles.answerText}>{choice.text}</Text>
        </Pressable>
      </Animatable.View>
    );
  };
  
  
  
  const getAnswerButtonStyle = (color: string) => {
    return {
      ...styles.answerButton,
      backgroundColor: color,
    };
  };
  const resetTimer = () => {
    setTimer(30); 
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      resetTimer();
    };
  }, []);

  return (
  
    <View style={styles.container}>
        <View style={styles.gameHeader}>
            <View style={styles.teamLeft}>
                <Text>UC Irvine</Text>
            </View>
            
            <Text style={styles.gameText}>PacTrivia</Text>
            
            <View style={styles.teamRight}>
                <Text>CSU Long Beach</Text>
            </View>
        </View>

      <View style={styles.header}>
      <Image source={localImage} style={{ width: 10, height: 20, padding: 10 }} />
        <Text style={styles.timer}>{`${timer}s`}</Text>
      </View>
        <View style={styles.content}>
        <Text style={styles.question}>
            In which popular TV sitcom can a shirt featuring the UCI Anteaters mascot be spotted?
        </Text>
        <View style={styles.answers}>
        <View style={styles.answers}>
          {answerChoices.map((choice, index) => renderAnswerButton(choice, index))}
        </View>
      </View>
      </View>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6D6',
    alignItems: "center",

  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameHeader: {
    flexDirection: "row",
    justifyContent: 'center', 
    alignItems: "center",
    backgroundColor: 'white',
    height: "12%",
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative', 
    paddingTop: 40, 
   
  },
  teamLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingLeft: 15, 
    width: '35%', 
    zIndex: 0, 
    marginTop: 40,
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  teamRight: {
    position: 'absolute',
    right: 0, 
    top: 0,
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingRight: 15,
    width: '35%',
    zIndex: 0, 
    marginTop: 40,
    backgroundColor: "transparent",
    fontWeight: "bold",
  },
  gameText: {

    fontWeight: 'bold',
    color: '#989595',
    fontSize: 24,
    zIndex: 1, 
    fontFamily: "",
    
  },
  timer: {
    fontSize: 18,
    color: 'black',

  },
  content: {
    padding: 20,

  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    padding: 40,
  },
  answers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerButton: {

    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 20,
   
  },
  answerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  }
});

export default TriviaScreen;

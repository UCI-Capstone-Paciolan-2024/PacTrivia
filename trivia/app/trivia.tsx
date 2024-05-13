import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Animated, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnswerModal from '../components/answerFeedback';
import { transform } from '@babel/core';

import QuestionLayout from '../components/questionLayout';
import GameHeader from '../components/gameHeader';


const answerChoicesJson = {
  "qna": [
    {
    question: "In which popular TV sitcom can a shirt featuring the UCI Anteaters mascot be spotted?",
    answers: [
      { text: 'Friends', color: '#FF6768' },
      { text: 'The Office', color: '#FFD747' },
      { text: 'Parks & Rec', color: '#4DBD33' },
      { text: 'Big Bang Theory', color: '#4D79FF' },
    ]
    },
    {
      question: "Which of the movies below was filmed at UCI?",
      answers: [
        { text: 'Dawn of the Planet of the Apes', color: '#FF6768' },
        { text: 'Rise of the Planet of the Apes', color: '#FFD747' },
        { text: 'War for the Planet of the Apes', color: '#4DBD33' },
        { text: 'Planet of the Apes', color: '#4D79FF' },
      ]
    }
  ],  
};


const TriviaScreen = () => {
  const localImage = require('./timer.png');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  
  const [showModal, setShowModal] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const [currentQuestionIndex, setQuestionIndex] = useState(0);

  const incrementIndex = () => {
    setQuestionIndex(currentQuestionIndex + 1);
  }

  // timer logic?
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
        setSelectedAnswer(null);
      
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showModal]);

  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswerCorrect(answer === 'Friends');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAnswer(null);
  };

  const resetTimer = () => {
    setTimer(30); 
  };
  
  // timer logic
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
      
      <GameHeader HomeTeam='UC Irvine' AwayTeam='CSU Long Beach'></GameHeader>

      <View style={styles.header}>
        <Image source={localImage} style={{ width: 10, height: 20, padding: 10 }} />
        <Text style={styles.timer}>{`${timer}s`}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>
            {answerChoicesJson.qna[currentQuestionIndex].question}
        </Text>
        
        <QuestionLayout answerChoices={answerChoicesJson.qna[currentQuestionIndex].answers}></QuestionLayout>
        
        <AnswerModal visible={showModal} isCorrect={isAnswerCorrect} />
      </View>
      {/* DEBUG BUTTON remove when finished testing screen state */}
      <button onClick={incrementIndex}>Next Question</button>
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
  },
});

export default TriviaScreen;

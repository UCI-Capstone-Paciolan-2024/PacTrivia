import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Animated, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnswerModal from '../components/answerFeedback';
import { transform } from '@babel/core';

import QuestionLayout from '../components/questionLayout';
import GameHeader from '../components/gameHeader';
import { useNavigation, useRouter } from 'expo-router';


// example json potentially
// TODO: handle the colors on the frontend side and not the backend side
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
    },
    {
      question: "Which UCI building is named after the author of a famous series of science fiction novels?",
      answers: [
        { text: 'Frank Herbert Hall', color: '#FF6768' },
        { text: 'George R.R. Martin Center', color: '#FFD747' },
        { text: 'J.K. Rowling Library', color: '#4DBD33' },
        { text: 'Isaac Asimov Science Hall', color: '#4D79FF' },
      ]
    },
    {
      question: "UCI was established in what year?",
      answers: [
        { text: '1965', color: '#FF6768' },
        { text: '1950', color: '#FFD747' },
        { text: '1975', color: '#4DBD33' },
        { text: '1982', color: '#4D79FF' },
      ]
    },
    {
      question: "What unique sports team does UCI have?",
      answers: [
        { text: 'Quidditch', color: '#FF6768' },
        { text: 'Underwater Hockey', color: '#FFD747' },
        { text: 'Elephant Polo', color: '#4DBD33' },
        { text: 'Camel Racing', color: '#4D79FF' },
      ]
    },
    {
      question: "Which famous actor is an alumnus of UCI?",
      answers: [
        { text: 'Jon Lovitz', color: '#FF6768' },
        { text: 'James Franco', color: '#FFD747' },
        { text: 'Steve Carell', color: '#4DBD33' },
        { text: 'Brad Pitt', color: '#4D79FF' },
      ]
    },
    {
      question: "What is the name of the UCI mascot?",
      answers: [
        { text: 'Peter the Anteater', color: '#FF6768' },
        { text: 'Sammy the Slug', color: '#FFD747' },
        { text: 'Ollie the Otter', color: '#4DBD33' },
        { text: 'Eddie the Eagle', color: '#4D79FF' },
      ]
    },
    {
      question: "UCI is particularly renowned for its research in which field?",
      answers: [
        { text: 'Coastal Ecology', color: '#FF6768' },
        { text: 'Quantum Physics', color: '#FFD747' },
        { text: 'Cognitive Sciences', color: '#4DBD33' },
        { text: 'Medieval History', color: '#4D79FF' },
      ]
    },
    {
      question: "Which UCI faculty member won a Nobel Prize?",
      answers: [
        { text: 'Irwin Rose in Chemistry', color: '#FF6768' },
        { text: 'Frederick Reines in Physics', color: '#FFD747' },
        { text: 'Sherwood Rowland in Chemistry', color: '#4DBD33' },
        { text: 'Elizabeth Blackburn in Medicine', color: '#4D79FF' },
      ]
    },
    {
      question: "What unique feature can be found at UCI's campus center?",
      answers: [
        { text: 'An underground concert hall', color: '#FF6768' },
        { text: 'A rooftop garden', color: '#FFD747' },
        { text: 'A wildlife sanctuary', color: '#4DBD33' },
        { text: 'A decommissioned submarine', color: '#4D79FF' },
      ]
    }
  ],  
};



const TriviaScreen = () => {
  // const localImage = require('./timer.png');
  const localImage = require('../assets/images/timer.png')
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  
  const [showModal, setShowModal] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const [currentQuestionIndex, setQuestionIndex] = useState(0);

  const navigate = useNavigation();
  const router = useRouter();

  const incrementIndex = () => {
    // check if we are on the last question, if so then navigate to end page
    if (currentQuestionIndex === 9) {
      router.push("/endpage")
    }
    else {
      setQuestionIndex(currentQuestionIndex + 1);
    }
  }

  // pop up logic
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
        
        <QuestionLayout answerChoices={answerChoicesJson.qna[currentQuestionIndex].answers} onButtonClick={() => {incrementIndex(); resetTimer();}}></QuestionLayout>
        
        <AnswerModal visible={showModal} isCorrect={isAnswerCorrect} />
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
  timer: {
    fontSize: 18,
    color: 'black',

  },
  content: {
    padding: 20,
    alignItems: 'center'

  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
});

export default TriviaScreen;

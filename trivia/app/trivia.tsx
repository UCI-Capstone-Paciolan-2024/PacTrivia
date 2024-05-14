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

export interface AnswerChoice {
  question: string;
  answers: AnswerType[];
}

export interface AnswerType {
  text: string;
}

export interface QuestionLayoutProps {
  data: AnswerChoice[];
}



// example json potentially
const answerChoicesJson:QuestionLayoutProps = {
  data: [
    {
      question: "In which popular TV sitcom can a shirt featuring the UCI Anteaters mascot be spotted?",
      answers: [
        { text: 'Friends'},
        { text: 'The Office'},
        { text: 'Parks & Rec'},
        { text: 'Big Bang Theory'},
      ]
    },
    {
      question: "Which of the movies below was filmed at UCI?",
      answers: [
        { text: 'Dawn of the Planet of the Apes'},
        { text: 'Rise of the Planet of the Apes'},
        { text: 'War for the Planet of the Apes'},
        { text: 'Planet of the Apes'},
      ]
    },
    {
      question: "Which UCI building is named after the author of a famous series of science fiction novels?",
      answers: [
        { text: 'Frank Herbert Hall'},
        { text: 'George R.R. Martin Center'},
        { text: 'J.K. Rowling Library'},
        { text: 'Isaac Asimov Science Hall'},
      ]
    },
    {
      question: "UCI was established in what year?",
      answers: [
        { text: '1965'},
        { text: '1950'},
        { text: '1975'},
        { text: '1982'},
      ]
    },
    {
      question: "What unique sports team does UCI have?",
      answers: [
        { text: 'Quidditch'},
        { text: 'Underwater Hockey'},
        { text: 'Elephant Polo'},
        { text: 'Camel Racing'},
      ]
    },
    {
      question: "Which famous actor is an alumnus of UCI?",
      answers: [
        { text: 'Jon Lovitz'},
        { text: 'James Franco'},
        { text: 'Steve Carell'},
        { text: 'Brad Pitt'},
      ]
    },
    {
      question: "What is the name of the UCI mascot?",
      answers: [
        { text: 'Peter the Anteater'},
        { text: 'Sammy the Slug'},
        { text: 'Ollie the Otter'},
        { text: 'Eddie the Eagle'},
      ]
    },
    {
      question: "UCI is particularly renowned for its research in which field?",
      answers: [
        { text: 'Coastal Ecology'},
        { text: 'Quantum Physics'},
        { text: 'Cognitive Sciences'},
        { text: 'Medieval History'},
      ]
    },
    {
      question: "Which UCI faculty member won a Nobel Prize?",
      answers: [
        { text: 'Irwin Rose in Chemistry'},
        { text: 'Frederick R' },
        { text: 'Sherwood Rowland in Chemistry'},
        { text: 'Elizabeth Blackburn in Medicine'},
      ]
    },
    {
      question: "What unique feature can be found at UCI's campus center?",
      answers: [
        { text: 'An underground concert hall'},
        { text: 'A rooftop garden'},
        { text: 'A wildlife sanctuary'},
        { text: 'A decommissioned submarine'},
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

  const [isActive, setIsActive] = useState(true);

  const incrementIndex = () => {
    // check if we are on the last question, if so then navigate to end page
    const totalQuestions = answerChoicesJson.data.length - 1
    if (currentQuestionIndex === totalQuestions) {
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
    setIsActive(true);
  };
  
  // timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
          setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } 
    // reset timer
    else if (timer === 0) {
      setIsActive(false);
      setTimeout(() => {
          setTimer(30);
          setIsActive(true);
          incrementIndex();
      }, 1000);  // adding a slight delay
    }

    return () => clearInterval(interval);
}, [isActive, timer]);

  return (
  
    <View style={styles.container}>
      
      <GameHeader HomeTeam='UC Irvine' AwayTeam='CSU Long Beach'></GameHeader>

      <View style={styles.header}>
        <Image source={localImage} style={{ width: 10, height: 20, padding: 10 }} />
        <Text style={styles.timer}>{`${timer}s`}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>
            {answerChoicesJson.data[currentQuestionIndex].question}
        </Text>
        
        <QuestionLayout choices={answerChoicesJson.data[currentQuestionIndex].answers} onButtonClick={() => {incrementIndex(); resetTimer();}}></QuestionLayout>
        
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

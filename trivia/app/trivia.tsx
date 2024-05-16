import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Animated, Button } from 'react-native';
import QuestionLayout from '../components/questionLayout';
import GameHeader from '../components/gameHeader';
import { useNavigation, useRouter } from 'expo-router';
import ProgressBar from '../components/progressBar';

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
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [progressColors, setProgressColors] = useState<string[]>(Array(10).fill('#e0e0e0'));
  const [score, setScore] = useState(0);

  const router = useRouter();

  const incrementIndex = () => {
    const totalQuestions = answerChoicesJson.data.length - 1;
    if (currentQuestionIndex === totalQuestions) {
      router.replace({ pathname: '/endpage', params: { score } });
    } else {
      setQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerPress = (answer: string) => {
    const correctAnswer = answerChoicesJson.data[currentQuestionIndex].answers[0].text;
    let newProgressColors = [...progressColors];
    if (answer === correctAnswer) {
      newProgressColors[currentQuestionIndex] = '#52BE80';
      setScore(score + 1);
    } else {
      newProgressColors[currentQuestionIndex] = '#EC7063';
    }
    setProgressColors(newProgressColors);
    incrementIndex();
  };

  return (
    <View style={styles.container}>
      <GameHeader HomeTeam='UC Irvine' AwayTeam='CSU Long Beach' />
      <View style={styles.header}>
        <ProgressBar progressColors={progressColors} />
      </View>
      <View style={styles.content}>
        <Text style={styles.question}>
          {answerChoicesJson.data[currentQuestionIndex].question}
        </Text>
        <QuestionLayout
          choices={answerChoicesJson.data[currentQuestionIndex].answers}
          onButtonClick={(answer) => handleAnswerPress(answer.text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '90%',
    marginVertical: 20,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  question: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
});

export default TriviaScreen;
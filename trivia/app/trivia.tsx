import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import QuestionLayout from '../components/questionLayout';
import GameHeader from '../components/gameHeader';
import { useRouter } from 'expo-router';
import ProgressBar from '../components/progressBar';
import getVariable from './storage/getItem';

export interface AnswerChoice {
  question: string;
  answers: AnswerType[];
}

export interface AnswerType {
  text: string;
}

export interface QuestionLayoutProps {
  options: string[];
  onButtonClick: (answer_index: number) => void;
}

const defaultProp: QuestionLayoutProps = {
  options: ["1", "2", "3", "4"],
  onButtonClick: (answer_index: number) => {}
};

const TriviaScreen = () => {
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [progressColors, setProgressColors] = useState<string[]>(Array(10).fill('#e0e0e0'));
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>("test");
  const [currentOptions, setCurrentOptions] = useState<string[]>([""]);
  
  const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
  const [incorrectSound, setIncorrectSound] = useState<Audio.Sound | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const correctSoundObject = new Audio.Sound();
        const incorrectSoundObject = new Audio.Sound();
        
        await correctSoundObject.loadAsync(require('../assets/correct.mp3'));
        await incorrectSoundObject.loadAsync(require('../assets/incorrect.mp3'));
        
        setCorrectSound(correctSoundObject);
        setIncorrectSound(incorrectSoundObject);
      } catch (error) {
        console.error("Error loading sound files: ", error);
      }
    };

    loadSounds();
    return () => {
      correctSound && correctSound.unloadAsync();
      incorrectSound && incorrectSound.unloadAsync();
    };
  }, []);

  const playSound = async (sound: Audio.Sound | null) => {
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.error("Error playing sound: ", error);
      }
    }
  };

  const incrementIndex = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      router.replace({ pathname: '/endpage', params: { score: score + 1 } });
    } else {
      setQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerPress = async (answer_index: number) => {
    const userToken = await getVariable('userToken');
    console.log("Answer Chosen: ", currentOptions[answer_index]);
    let checkAnswer = false;
    try {
      const response = await fetch(`https://api.pactrivia.levarga.com/checkAnswer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "token": userToken,
          "answer_index": answer_index
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Res data: ", responseData.data);
        console.log("answer correct: ", responseData.data.answer_correct);
        checkAnswer = responseData.data.answer_correct;
      } else {
        console.error("Answer response not okay! Default will be wrong");
      }
    } catch (error) {
      console.log(error);
    }

    let newProgressColors = [...progressColors];
    if (checkAnswer) {
      newProgressColors[currentQuestionIndex] = '#21d127';
      setScore(prevScore => prevScore + 1);
      await playSound(correctSound);
    } else {
      newProgressColors[currentQuestionIndex] = '#d12121';
      await playSound(incorrectSound);
    }

    setProgressColors(newProgressColors);
    incrementIndex();
    
    // get new set of questions
    getQuestion();
  };

  const getQuestion = async () => {
    const userToken = await getVariable('userToken');

    try {
      const response = await fetch(`https://api.pactrivia.levarga.com/getQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "token": userToken,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setCurrentQuestion(responseData.data.question);
        setCurrentOptions(responseData.data.options);
        console.log("Current Q: ", responseData.data.question);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [homeTeam, setHomeTeam] = useState<string>("null");
  const [awayTeam, setAwayTeam] = useState<string>("null");

  useEffect(() => {
    const initGame = async () => {
      const teams = await getVariable('teams');
      if (teams) {
        setHomeTeam(teams[0]);
        setAwayTeam(teams[1]);
      }

      const numQuestions = await getVariable('totalQs');
      if (numQuestions) {
        setTotalQuestions(numQuestions);
      }

      const token = await getVariable('userToken');
      if (token) {
        console.log("User Token: ", token);
      }
    };

    initGame().then(async () => {
      await getQuestion();
    });
  }, []);

  return (
    <View style={styles.container}>
      <GameHeader HomeTeam={homeTeam} AwayTeam={awayTeam} />
      <View style={styles.header}>
        <ProgressBar progressColors={progressColors} />
      </View>
      <View style={styles.content}>
        <View style={styles.questionFormat}>
          <Text style={styles.question}>
            {currentQuestion}
          </Text>
        </View>
        <QuestionLayout
          options={currentOptions}
          onButtonClick={(answer_index) => handleAnswerPress(answer_index)}
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
    color: '#333',
    textAlign: 'center',
    minHeight: '40%'
  },
  questionFormat: {
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default TriviaScreen;

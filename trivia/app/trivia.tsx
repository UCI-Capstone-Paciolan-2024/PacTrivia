import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import getVariable from './storage/getItem';
import { QuestionLayoutProps } from './interfaces';
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  AppState,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import QuestionLayout from "../components/questionLayout";
import GameHeader from "../components/gameHeader";
import ProgressBar from "../components/progressBar";
import TimerBar from "../components/timerBar";

const defaultProp: QuestionLayoutProps = {
  options: ["1", "2", "3", "4"],
  onButtonClick: (answer_index: number) => { },
};

const TriviaScreen = () => {
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [progressColors, setProgressColors] = useState<string[]>(
    Array(10).fill("#e0e0e0")
  );
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string>("test")
  const [currentOptions, setCurrentOptions] = useState<string[]>([""])
  const [homeTeam, setHomeTeam] = useState<string>("null")
  const [awayTeam, setAwayTeam] = useState<string>("null")
  const [correctSound, setCorrectSound] = useState<Audio.Sound | null>(null);
  const [incorrectSound, setIncorrectSound] = useState<Audio.Sound | null>(null);
  const [maxTime, setMaxTime] = useState<number>(6 * 1000);
  const [timer, setTimer] = useState(maxTime);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const appState = useRef(AppState.currentState);

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
      router.replace({ pathname: "/endpage", params: { score: score + 1 } });
    } else {
      setQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // after answer is clicked, check if it is correct
  const handleAnswerPress = async (answer_index: number) => {
    const userToken = await getVariable("userToken");
    console.log("Answer Chosen: ", currentOptions[answer_index]);
    let checkAnswer = false;
    try {
      const response = await fetch(
        `https://api.pactrivia.levarga.com/checkAnswer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: userToken,
            answer_index: answer_index,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Res data: ", responseData.data);
        console.log("answer correct: ", responseData.data.answer_correct);
        console.log(typeof responseData.data.answer_correct);
        // if (responseData.data.answer_correct) {
        //   setCheckAnswer(true)
        //   console.log("CheckAnswer: ", checkAnswer)
        // }
        checkAnswer = responseData.data.answer_correct;
      } else {
        console.error("Answer response not okay! Default will be wrong");
      }
    } catch (error) {
      console.log(error);
    }

    // handles progress bar color changes alongside end score for correct # questions
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
    const userToken = await getVariable("userToken");

    try {
      const response = await fetch(
        `https://api.pactrivia.levarga.com/getQuestion`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: userToken,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setCurrentQuestion(responseData.data.question);
        setCurrentOptions(responseData.data.options);
        const timeout = responseData.data.timeout_seconds * 1000;
        setMaxTime(timeout);
        setTimer(timeout);
        console.log("Current Q: ", responseData.data.question);
      } else {
        setTimer(maxTime);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  // runs when the screen is first rendered, sets up total number of questions, the team headers and the user token
  useEffect(() => {
    const initGame = async () => {
      const teams = await getVariable("teams");
      if (teams) {
        console.log("teams: ", teams)
        setHomeTeam(teams[0]);
        setAwayTeam(teams[1]);
      }

      const numQuestions = await getVariable("totalQs");
      if (numQuestions) {
        setTotalQuestions(numQuestions);
      }

      const token = await getVariable("userToken");
      if (token) {
        console.log("User Token: ", token);
      }
    };

    initGame().then(async () => {
      await getQuestion();
    });
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (timer <= 0) {
      incrementIndex();
      getQuestion();
    } else {
      timerRef.current = setTimeout(
        () => setTimer((prevTime) => prevTime - 100),
        100
      );
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer]);



  useEffect(() => {
    const syncTimer = () => {
      const timeElapsed = Date.now() - lastActiveTime;
      setTimer(Math.max(timer - timeElapsed, 0));
    };

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        syncTimer();
      } else if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        setLastActiveTime(Date.now());
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [lastActiveTime, timer]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameHeader}>
        <GameHeader HomeTeam={homeTeam} AwayTeam={awayTeam} />
      </View>
      <View style={styles.header}>
        <ProgressBar progressColors={progressColors} />
        <TimerBar timer={timer} maxTime={maxTime} />
      </View>
      <View style={styles.content}>
        <View style={styles.questionFormat}>
          <Text style={styles.question}>{currentQuestion}</Text>
        </View>
        <View style={styles.answerContainer}>
          <QuestionLayout
              options={currentOptions}
              onButtonClick={(answer_index) => handleAnswerPress(answer_index)}
            />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    width: "100%", 
    height: "100%",
  },
  gameHeader: {
    height: "10%", 
  },
  header: {
    height: "10%",
    width: "90%",
    marginVertical: 20,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  content: {
    flex: 1,
    height: "80%", 
    padding: 20,
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  question: {
    fontSize: 20,
    height: "auto",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    minHeight: "30%",
  },
  questionFormat: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 24,
    textAlign: "center",
  },
  answerContainer: {
    marginTop: 30,
    flex: 8,
    width: "100%",
    justifyContent: "center",
  },
});

export default TriviaScreen;

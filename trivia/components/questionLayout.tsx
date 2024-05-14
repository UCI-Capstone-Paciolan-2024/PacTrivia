import React from "react";
import { View} from "react-native-animatable";
import AnswerButton from "./answerButton";
import { StyleSheet } from "react-native";
import { AnswerType } from "../app/trivia";


// question layout component
const QuestionLayout = ({choices, onButtonClick} : {choices: AnswerType[], onButtonClick: () => void}) => {
    return (
        <View style={styles.container}>
            {choices.map((choice, index) => (
                <View style={styles.box}>
                    <AnswerButton key={index} choice={choice.text} index={index} onButtonClick={onButtonClick} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 10,
    },
    box: {
        width: '45%', // two boxes fix inside the container
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
      }
  });
  

export default QuestionLayout;
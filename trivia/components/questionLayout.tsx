import React from "react";
import { View} from "react-native-animatable";
import AnswerButton from "./answerButton";
import { StyleSheet } from "react-native";


interface AnswerChoice {
    text: string;
    color: string;
}


// question layout component
const QuestionLayout = ({answerChoices, onButtonClick} : {answerChoices: AnswerChoice[], onButtonClick: () => void}) => {
    return (
        <View style={styles.container}>
            {answerChoices.map((choice: { text: string; color: string; }, index: number) => (
                <View style={styles.box}>
                    <AnswerButton key={index} choice={choice} index={index} onButtonClick={onButtonClick} />
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
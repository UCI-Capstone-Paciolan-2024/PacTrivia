import React from "react";
import { View} from "react-native-animatable";
import AnswerButton from "./answerButton";
import { StyleSheet } from "react-native";


interface AnswerChoice {
    text: string;
    color: string;
}

interface QuestionLayoutProps {
    answerChoices: AnswerChoice[];
}

// question layout component
const QuestionLayout = ({answerChoices} : QuestionLayoutProps) => {
    return (
        <View style={styles.container}>
            {answerChoices.map((choice, index) => (
                <View style={styles.box}>
                    <AnswerButton key={index} choice={choice} index={index} />
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
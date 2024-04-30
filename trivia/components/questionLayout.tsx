import React from "react";
import { View} from "react-native-animatable";
import AnswerButton from "./answerButton";
import { StyleSheet } from "react-native";

const answerChoices = [
    { text: 'Friends', color: '#FF6768' },
    { text: 'The Office', color: '#FFD747' },
    { text: 'Parks & Rec', color: '#4DBD33' },
    { text: 'Big Bang Theory', color: '#4D79FF' },
];

// question layout component
const QuestionLayout = () => {
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
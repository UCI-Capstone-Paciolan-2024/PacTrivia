import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnswerButton from './answerButton';
import { AnswerType } from '../app/trivia';

interface QuestionLayoutProps {
  choices: AnswerType[];
  onButtonClick: (answer: AnswerType) => void;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({ choices, onButtonClick }) => {
  return (
    <View style={styles.container}>
      {choices.map((choice, index) => (
        <View key={index} style={styles.box}>
          <AnswerButton choice={choice.text} index={index} onButtonClick={() => onButtonClick(choice)} />
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
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
});

export default QuestionLayout;

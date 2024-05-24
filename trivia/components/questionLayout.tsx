import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnswerButton from './answerButton';
import { AnswerType } from '../app/trivia';
import { QuestionLayoutProps } from '../app/trivia';

const QuestionLayout: React.FC<QuestionLayoutProps> = ({ options, onButtonClick }) => {
  console.log(options)
  return (
    <View style={styles.container}>
      {options ? options.map((choice, index) => (
        <View key={index} style={styles.box}>
          <AnswerButton choice={choice} index={index} onButtonClick={() => onButtonClick(index)} />
        </View>
      )): null
      }
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

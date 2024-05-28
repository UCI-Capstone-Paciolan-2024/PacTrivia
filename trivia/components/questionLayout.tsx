import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import AnswerButton from './answerButton';
import { QuestionLayoutProps } from '../app/interfaces';

const QuestionLayout: React.FC<QuestionLayoutProps> = ({ options, selectedAnswer, checkAnswer, onButtonClick }) => {
  return (
    <View style={styles.container}>
      {options ? options.map((choice, index) => (
        <View key={index} style={styles.box}>
          <AnswerButton 
            choice={choice} 
            index={index} 
            onButtonClick={() => onButtonClick(index)} 
            disabled={selectedAnswer !== null} // Disable clicking as soon as user picks an answer
            greyedOut={selectedAnswer !== null && selectedAnswer !== index} // Grey out other buttons when user picks an answer
            checkAnswer={checkAnswer}
          />
        </View>
      )): null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionLayout;

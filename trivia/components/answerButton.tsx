import * as Animatable from 'react-native-animatable';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { AnswerButtonProps } from '../app/interfaces';

const buttonColors = [
  '#c774f2',
  '#ffad34',
  '#F06292',
  '#64B5F6'
];

const greyedOutColor = '#d3d3d3'; // Greyed out color
const correctAnswerColor = '#72b656'; // Green color for correct answer
const wrongAnswerColor = '#ff4d3a'; // red color for wrong answer

const AnswerButton: React.FC<AnswerButtonProps> = ({ choice, index, onButtonClick, disabled, greyedOut, checkAnswer }) => {
  const getBackgroundColor = () => {
    if (greyedOut) {
      return greyedOutColor;
    }
    if (checkAnswer) {
      return correctAnswerColor;
    }else if (checkAnswer != null && !checkAnswer) {
      return wrongAnswerColor;
    }
    return buttonColors[index];
  };

  const buttonRef = useRef<Animatable.View & TouchableOpacity>(null);

  const handlePressIn = () => {
    const currentRef = buttonRef.current
    if (currentRef) {
      currentRef.pulse(200);
    }
    console.log("Index pushed: ", index);
  };

  return (
    <Animatable.View ref={buttonRef} style={[styles.answerButton, 
        { backgroundColor: getBackgroundColor() }]}>
      <TouchableOpacity 
        onPressIn={() => { handlePressIn(); onButtonClick(); }} 
        style={styles.fullSize}
        disabled={disabled}
      >
        <Text style={styles.answerText}>{choice}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    width: "100%",
    height: "auto",
    minHeight: 95,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 20,
    padding: 10,
  },
  fullSize: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 22,
  },
});

export default AnswerButton;

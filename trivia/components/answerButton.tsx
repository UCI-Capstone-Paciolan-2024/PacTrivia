import * as Animatable from 'react-native-animatable';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { AnswerButtonProps } from '../app/interfaces';

const buttonColors = [
  '#AF7AC5',
  '#FFB74D',
  '#F06292',
  '#64B5F6'
];


const AnswerButton: React.FC<AnswerButtonProps> = ({ choice, index, onButtonClick }) => {
  const buttonRef = useRef<Animatable.View & TouchableOpacity>(null);

  const handlePressIn = () => {
    const currentRef = buttonRef.current
    if (currentRef) {
      currentRef.pulse(200);
    }
    console.log("Index pushed: ", index);
  };

  return (
    <Animatable.View ref={buttonRef} style={[styles.answerButton, { backgroundColor: buttonColors[index] }]}>
      <TouchableOpacity onPressIn={() => { handlePressIn(); onButtonClick(); }} style={styles.fullSize}>
        <Text style={styles.answerText}>{choice}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    width: '100%',
    height: 100,
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
  },
});

export default AnswerButton;

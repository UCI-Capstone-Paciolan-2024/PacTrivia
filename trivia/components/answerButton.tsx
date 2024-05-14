import * as Animatable from 'react-native-animatable';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { AnswerChoice } from '../app/trivia';

const buttonColors = [
    '#FF6768',
    '#FFD747',
    '#4DBD33',
    '#4D79FF'
]


// answer button component, takes in an AnswerChoice type (text, color) alongside an index number and function to handle when button is clicked
const AnswerButton = ({ choice, index, onButtonClick }: { choice: string, index: number, onButtonClick: () => void}) => {
    const buttonRef = useRef<Animatable.View & TouchableOpacity>(null);

    // send the answer here to the backend
    const handlePressIn = () => {
        if (buttonRef.current) {
            // pulsing animation, if it shows as an error to you it still compiles tho
            buttonRef.current.pulse(800);
        }
        console.log(index)
    };

    return (
        <Animatable.View ref={buttonRef} style={[styles.answerButton, { backgroundColor: buttonColors[index] }]}>
            <TouchableOpacity onPressIn={() => {handlePressIn(); onButtonClick();}} style={styles.fullSize}>
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

export default AnswerButton
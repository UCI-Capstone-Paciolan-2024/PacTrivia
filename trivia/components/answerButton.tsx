import * as Animatable from 'react-native-animatable';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';

type AnswerChoice = {
    text: string;
    color: string;
};


// answer button component, takes in an AnswerChoice type (text, color) alongside an index number and function to handle when button is clicked
const AnswerButton = ({ choice, index, onButtonClick }: { choice: AnswerChoice, index: number, onButtonClick: () => void}) => {
    const buttonRef = useRef<Animatable.View & TouchableOpacity>(null);

    // send the answer here to the backend
    const handlePressIn = () => {
        if (buttonRef.current) {
            // pulsing animation, if it shows as an error to you it still compiles tho
            buttonRef.current.pulse(800);
        }
        return index
    };

    return (
        <Animatable.View ref={buttonRef} style={[styles.answerButton, { backgroundColor: choice.color }]}>
            <TouchableOpacity onPressIn={() => {handlePressIn(); onButtonClick();}} style={styles.fullSize}>
                <Text style={styles.answerText}>{choice.text}</Text>
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
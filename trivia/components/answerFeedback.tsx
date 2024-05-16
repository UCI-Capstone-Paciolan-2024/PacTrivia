import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Animated } from 'react-native';

type AnswerModalProps = {
  visible: boolean;
  isCorrect: boolean;
};

const AnswerFeedback = ({ visible, isCorrect }: AnswerModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, fadeAnim]);

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={[styles.modal, isCorrect ? styles.correctModal : styles.incorrectModal]}>
          <Text style={styles.modalText}>{isCorrect ? 'Correct!' : 'Incorrect!'}</Text>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  correctModal: {
    backgroundColor: '#90EE90',
  },
  incorrectModal: {
    backgroundColor: 'red',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AnswerFeedback;
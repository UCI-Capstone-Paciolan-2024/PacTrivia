import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ProgressBarProps {
  progressColors: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressColors }) => {
  return (
    <View style={styles.progressBarContainer}>
      {progressColors.map((color, index) => (
        <Animatable.View
          key={index}
          style={[
            styles.step,
            { backgroundColor: color },
          ]}
          animation={color !== '#e0e0e0' ? 'bounceIn' : undefined}
          duration={500}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  step: {
    flex: 1,
    height: 15,
    marginHorizontal: 1,
    borderRadius: 1,
  },
});

export default ProgressBar;

import React, { useEffect, useRef} from "react";
import { View, StyleSheet, Animated } from "react-native";
import * as Progress from "react-native-progress";

interface TimerBarProps {
  timer: number;
  maxTime: number;
}

const TimerBar: React.FC<TimerBarProps> = ({ timer, maxTime }) => {
  return (
    <View style={styles.timerBarContainer}>
      <Progress.Bar
        progress={timer / maxTime}
        width={250}
        height={10}
        borderWidth={0}
        borderRadius={10}
      />
      <Progress.Circle
        progress={timer / maxTime}
        size={30}
        showsText={true}
        formatText={() => `${Math.ceil(timer/1000)}s`}
        textStyle={
            { fontWeight: "bold", fontSize: 18}
        }
        borderWidth={0}
        thickness={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timerBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly"
  },
});

export default TimerBar;

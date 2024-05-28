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
      <Progress.Circle
        progress={timer / maxTime}
        size={100}
        showsText={true}
        formatText={() => `${Math.ceil(timer/1000)}s`}
        textStyle={
            { fontWeight: "bold", fontSize: 20}
        }
        borderWidth={0}
        strokeCap={"round"}
        thickness={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timerBarContainer: {
    alignItems: "center",
  },
});

export default TimerBar;

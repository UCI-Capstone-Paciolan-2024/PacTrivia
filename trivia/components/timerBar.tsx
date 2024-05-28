import React from "react";
import { View, StyleSheet, Text} from "react-native";
import * as Progress from "react-native-progress";

interface TimerBarProps {
  timer: number;
  maxTime: number;
}

const TimerBar: React.FC<TimerBarProps> = ({ timer, maxTime }) => {
  return (
    <View style={[styles.timerBarContainer]}>
      <Progress.Bar
        progress={timer / maxTime}
        width={250}
        height={10}
        borderWidth={0}
        borderRadius={10}
        color={"#789aff"}
      />
      <Text style={styles.timeBarText}>{Math.ceil(timer/1000)}s</Text>
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
  timeBarText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#789aff",
  }
});

export default TimerBar;

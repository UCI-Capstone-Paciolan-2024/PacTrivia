import React from "react";
import { View, StyleSheet, Text, Dimensions} from "react-native";
import * as Progress from "react-native-progress";

interface TimerBarProps {
  timer: number;
  maxTime: number;
  disabled: boolean;
}

const TimerBar: React.FC<TimerBarProps> = ({ timer, maxTime, disabled }) => {
  return (
    <View style={[styles.timerBarContainer, {opacity: disabled? 0: 1}]}>
      <Progress.Bar
        progress={timer / maxTime}
        width={Dimensions.get("screen").width * 0.65}
        height={10}
        borderWidth={1}
        borderRadius={10}
        color={"#789aff"}
        style={styles.progressBar}
      />
      <Text style={styles.timeBarText}>{Math.ceil(timer/1000)}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerBarContainer: {
    width: '100%',
    paddingHorizontal: "5%",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"

  },
  progressBar: {
    flex: 4,
  },
  timeBarText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#789aff",
    textAlign: "center",
    flex: 1,
  }
});

export default TimerBar;

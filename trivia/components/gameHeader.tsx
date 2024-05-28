import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { GameHeaderProps } from '../app/interfaces';


const GameHeader: React.FC<GameHeaderProps> = ({ HomeTeam, AwayTeam }) => {
  return (
    <View style={styles.headerContainer}>
      {/* <Text style={styles.teamText}>{HomeTeam}</Text> */}
      <Image source={{uri: HomeTeam}}></Image>
      <Text style={styles.titleText}>PacTrivia</Text>
      {/* <Text style={styles.teamText}>{AwayTeam}</Text> */}
      <Image source={{uri: AwayTeam}}></Image>

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#6E6C6C',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  teamText: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  titleText: {
    flex: 2,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default GameHeader;

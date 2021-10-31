import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';

const Score = () => {
  const [scoreInformation, setScoreInformation] = useState();

  useEffect(() => {
    // @ts-expect-error
    AsyncStorage.getItem('score').then((data: string) => {
      setScoreInformation(JSON.parse(data));
    }, scoreInformation);
  });

  return (
    <View>
      <Text style={styles.yourScore}>Your Score</Text>
      {
        // @ts-expect-error
        scoreInformation?.map((score, key) => (
          <Text key={key} style={styles.scoreText}>
            You scored {score.score} points on Date: {score.date}
          </Text>
        ))
      }
    </View>
  );
};


const styles = StyleSheet.create({
    scoreText: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
    },
    yourScore: {
        fontSize: 21,
        marginBottom: 50,
        textAlign: 'center'
    }
})

export default Score;

import React from 'react';
import {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AsyncStorage} from 'react-native';

const Home = ({navigation}) => {
  const [count, setCount] = useState(1);
  const [clearScore, setScore] = useState(false)
  const [evilImage, setEvilImage] = useState(true);

  const getImage = () => {
    if (evilImage) {
      return require('../assets/images/evil.jpeg');
    }
    return require('../assets/images/cute.jpeg');
  };

  async function increaseCount() {
    setCount(count + 1);
    if (count % 15) {
      setEvilImage(false);
    } else {
      setEvilImage(true);
    }
  }

  async function clear(){
    const date = new Date()
    const d = date.getDay()
    const m = date.getMonth()
    const y = date.getFullYear()
    const h = date.getHours()
    const mm = date.getMinutes()
    const formatedDate = `${d}-${m}-${y} ${h}:${mm}`
    
    const score = 
      {
        date: formatedDate,
        score: count,
      }
    ;
    // @ts-expect-error
    const scores: any[] = JSON.parse(await AsyncStorage.getItem('score'));
    if(scores !== null){
      scores.push(score)
      await AsyncStorage.setItem('score', JSON.stringify(scores));
    }
    else{
      if(count !== 0){
        await AsyncStorage.setItem('score', JSON.stringify([score]));
      }
      
    }
    console.log(await AsyncStorage.getItem('score'))
    setCount(0)
  }



  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `You scored ${count}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image style={styles.image} source={getImage()}></Image>

      <Text style={styles.clickedStyle}>You clicked count {count} times</Text>
      <Pressable style={[styles.button, styles.bg_green]} onPress={() => increaseCount()}>
        <Text style={styles.text}>Feed me</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.text}>About</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async() => {clear() ;return navigation.navigate('Score')}}>
        <Text style={styles.text}>Score</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onShare}>
        <Text style={styles.text}>Share</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 250,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  bg_green: {
    backgroundColor: 'green'
  },
  bg_red: {
    backgroundColor: 'red'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
    marginBottom: 25,
  },
  clickedStyle: {
    marginBottom: 35,
    fontWeight: 'bold',
    fontSize: 21
  },
});

export default Home;

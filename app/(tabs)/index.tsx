import React from 'react';
import { View, Text, Image, StyleSheet, Linking, Button } from 'react-native';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/pb.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.boldText}>
        Stop paying for other people's beer!
      </Text>
      <Text>
        Quickly split the tab when everyone's having pizza and beer, but not everyone is having beer.
      </Text>
      <Text>  </Text>
      <Button
        title="What's the Damage?"
        onPress={() => router.replace('/(tabs)/App')}
      />
      <Text>
        Created by: <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>Ward Greunke</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
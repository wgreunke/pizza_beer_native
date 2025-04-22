import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

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
      <TouchableOpacity 
        style={styles.roundButton}
        onPress={() => router.replace('/(tabs)/App')}
      >
        <Text style={styles.buttonText}>What's the Damage?</Text>
      </TouchableOpacity>
      <Text>  </Text>
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
  icon: {
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
  roundButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 3,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
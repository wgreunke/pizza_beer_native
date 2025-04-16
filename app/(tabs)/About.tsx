import { View, Text, StyleSheet, Linking, Image } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Image source={require('../../assets/images/GlenTaylor.jpg')} style={styles.image} />
      <Text style={styles.description}>
      <Text style={styles.link} onPress={() => Linking.openURL('http://fleet18.org/')}>Fleet 18</Text>

      {' '}is a group of windsurfers who race on Foster City Lagoon just south of San Francisco on Tuesday nights. After racing, we go to{' '}   
        <Text style={styles.link} onPress={() => Linking.openURL('https://waterfrontpizza.com/')}>Waterfront Pizza</Text> 
    
        {' '}for pizza and beer.
      </Text>
      <Text>
        Everyone has pizza but not everyone has beer. This app helps determine how much people owe.
      </Text>
      
      <Text> </Text> 
      <Text>Created by: </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>Ward Greunke</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  description: {
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


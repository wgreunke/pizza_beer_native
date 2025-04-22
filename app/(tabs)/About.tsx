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
        Everyone has pizza but not everyone has beer. This app was written to determine how much we owe.
      </Text>
      
      <Text> </Text> 
      <Text>Created by: </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>Ward Greunke</Text>
      <Text> </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSewyWPHyVb1KqdfAQaalfu5lmSD1q-xpRgJu0TtxUh5C4EzhA/viewform?usp=header')}>Comments / Suggestions </Text>
      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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


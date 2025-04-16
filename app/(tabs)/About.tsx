import { View, Text, StyleSheet, Linking, Image } from "react-native";

export default function About() {
  return (
    <View>
      <Image source={require('../../assets/images/GlenTaylor.jpg')} style={styles.image} />
      <Text style={styles.description}>
        Fleet 18 is a group of windsurfers who race on Foster City Lagoon on Tuesday Nights. After racing, we go to Waterfront Pizza for pizza and beer.
      </Text>
      <Text>
        Everyone has pizza but not everyone has beer. This app helps determine how much people owe.
      </Text>
      <Text>Created by: </Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>Ward Greunke</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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
});


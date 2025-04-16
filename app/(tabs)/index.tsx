import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Linking } from 'react-native';

const PizzaBeerCalculator = () => {
  const [pizzaPreTax, setPizzaPreTax] = useState('');
  const [pizzaNum, setPizzaNum] = useState('');
  const [beerPreTax, setBeerPreTax] = useState('');
  const [beerNum, setBeerNum] = useState('');
  const [tax, setTax] = useState('');
  const [results, setResults] = useState<null | {
    pizzaPerPerson: string;
    beerPerPerson: string;
    pizzaAndBeerPerPerson: string;
    pizzaTax: string;
    beerTax: string;
    pizzaOnlyTotal: string;
    pizzaAndBeerTotal: string;
    totalBill: string;
    pizzaOnlyPeople: number;
    pizzaAndBeerPeople: number;
  }>(null);

  const handleIntegerInput = (setValue: (val: string) => void) => (val: string) => {
    if (val === '' || /^\d+$/.test(val)) {
      setValue(val);
    }
  };

  const calculateBill = () => {
    const pizzaPreTaxNum = parseFloat(pizzaPreTax) || 0;
    const pizzaNumInt = parseInt(pizzaNum) || 0;
    const beerPreTaxNum = parseFloat(beerPreTax) || 0;
    const beerNumInt = parseInt(beerNum) || 0;
    const taxNum = parseFloat(tax) || 0;

    const pizzaRatio = pizzaPreTaxNum / (pizzaPreTaxNum + beerPreTaxNum + 0.001);
    const beerRatio = 1 - pizzaRatio;
    const pizzaTax = pizzaRatio * taxNum;
    const beerTax = beerRatio * taxNum;
    const pizzaPerPerson = (pizzaPreTaxNum + pizzaTax) / (pizzaNumInt || 1);
    const beerPerPerson = (beerPreTaxNum + beerTax) / (beerNumInt || 1);
    const pizzaAndBeerPerPerson = pizzaPerPerson + beerPerPerson;

    const pizzaOnlyPeople = pizzaNumInt - beerNumInt;
    const pizzaOnlyTotal = pizzaPerPerson * pizzaOnlyPeople;
    const pizzaAndBeerTotal = pizzaAndBeerPerPerson * beerNumInt;
    const totalBill = pizzaOnlyTotal + pizzaAndBeerTotal;

    setResults({
      pizzaPerPerson: pizzaPerPerson.toFixed(2),
      beerPerPerson: beerPerPerson.toFixed(2),
      pizzaAndBeerPerPerson: pizzaAndBeerPerPerson.toFixed(2),
      pizzaTax: pizzaTax.toFixed(2),
      beerTax: beerTax.toFixed(2),
      pizzaOnlyTotal: pizzaOnlyTotal.toFixed(2),
      pizzaAndBeerTotal: pizzaAndBeerTotal.toFixed(2),
      totalBill: totalBill.toFixed(2),
      pizzaOnlyPeople,
      pizzaAndBeerPeople: beerNumInt
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pizza and Beer Calculator for Fleet 18</Text>
      
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://waterfrontpizza.com/')}
      >
        Waterfront Pizza
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pizza</Text>
        <View style={styles.inputGroup}>
          <Text>Pizza amount without tax</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Pizza amount without tax"
            value={pizzaPreTax}
            onChangeText={setPizzaPreTax}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Number of people who ate pizza</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Number of people who ate pizza"
            value={pizzaNum}
            onChangeText={handleIntegerInput(setPizzaNum)}
            style={styles.input}
          />
        </View>
        <Text>Pizza per person - no tax: ${((parseFloat(pizzaPreTax) / (parseInt(pizzaNum) || 1)) || 0).toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beer</Text>
        <View style={styles.inputGroup}>
          <Text>Beer amount without tax</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Beer amount"
            value={beerPreTax}
            onChangeText={setBeerPreTax}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Number of people who had pizza and beer</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Number of people who had pizza and beer"
            value={beerNum}
            onChangeText={handleIntegerInput(setBeerNum)}
            style={styles.input}
          />
        </View>
        <Text>Beer per person - no tax: ${((parseFloat(beerPreTax) / (parseInt(beerNum) || 1)) || 0).toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tax</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Tax amount"
          value={tax}
          onChangeText={setTax}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add it Up!" onPress={calculateBill} color="#007bff" />
      </View>

      {results && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Numbers With Tax</Text>
          <Text>Per Person for people having just pizza w/tax: ${results.pizzaPerPerson}</Text>
          <Text>Per Person for beer w/tax: ${results.beerPerPerson}</Text>
          <Text>Per Person for people having Pizza and Beer w/tax: ${results.pizzaAndBeerPerPerson}</Text>
          <Text style={styles.validateTitle}>Validate the numbers</Text>
          <Text>Pizza Tax: ${results.pizzaTax}</Text>
          <Text>Beer Tax: ${results.beerTax}</Text>
          <Text>{results.pizzaOnlyPeople} People had pizza only, paying ${results.pizzaPerPerson} for a total of ${results.pizzaOnlyTotal}.</Text>
          <Text>{results.pizzaAndBeerPeople} People had pizza and beer, paying ${results.pizzaAndBeerPerPerson} for a total of ${results.pizzaAndBeerTotal}.</Text>
          <Text style={styles.bold}>Total bill: ${results.totalBill}</Text>
        </View>
      )}

      <View style={styles.footerContainer}>
        <Text>Created by: </Text>
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>Ward Greunke</Text>
        <Text> - </Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  section: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fafafa',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  validateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  footerContainer: {
    marginBottom: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PizzaBeerCalculator;
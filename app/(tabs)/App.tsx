import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

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
      <Text> </Text>
      <Text style={styles.title}>Pizza and Beer Bill Splitter</Text>
      
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pizza</Text>
        <View style={styles.inputGroup}>
          <Text>Pizza amount without tax:</Text>
          <TextInput
            keyboardType="numeric"
            value={pizzaPreTax}
            onChangeText={setPizzaPreTax}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Number of people who ate pizza:</Text>
          <TextInput
            keyboardType="numeric"
            value={pizzaNum}
            onChangeText={handleIntegerInput(setPizzaNum)}
            style={styles.input}
          />
        </View>
        <Text>Pizza per person - without tax: ${((parseFloat(pizzaPreTax) / (parseInt(pizzaNum) || 1)) || 0).toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beer</Text>
        <View style={styles.inputGroup}>
          <Text>Beer amount without tax:</Text>
          <TextInput
            keyboardType="numeric"
            value={beerPreTax}
            onChangeText={setBeerPreTax}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Number of people who drank beer:</Text>
          <TextInput
            keyboardType="numeric"
            value={beerNum}
            onChangeText={handleIntegerInput(setBeerNum)}
            style={styles.input}
          />
        </View>
        <Text>Beer per person - without tax: ${((parseFloat(beerPreTax) / (parseInt(beerNum) || 1)) || 0).toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Tax + Service Charges</Text>
        <TextInput
          keyboardType="numeric"
          value={tax}
          onChangeText={setTax}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.roundButton}
          onPress={calculateBill}
        >
          <Text style={styles.buttonText}>Add it Up!</Text>
        </TouchableOpacity>
      </View>

      {results && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Numbers With Tax:</Text>
          <Text>If you only ate pizza, you owe: ${results.pizzaPerPerson}</Text>
          <Text>If you only drank beer you owe: ${results.beerPerPerson}</Text>
          {parseInt(pizzaNum) > 0 && parseInt(beerNum) > 0 && (
            <Text>If you ate pizza and drank beer, you owe: ${results.pizzaAndBeerPerPerson}</Text>
          )}
          <Text> </Text>
          <Text>Each person should tip accordingly.</Text>
          <Text style={styles.validateTitle}>Check the math:</Text>
          {/*<Text>Pizza Tax: ${results.pizzaTax}</Text>
          <Text>Beer Tax: ${results.beerTax}</Text>*/}
          {/*<Text>{results.pizzaOnlyPeople} People had pizza only, paying ${results.pizzaPerPerson} for a total of ${results.pizzaOnlyTotal}.</Text> */}
          {/*<Text>{results.pizzaAndBeerPeople} People had pizza and beer, paying ${results.pizzaAndBeerPerPerson} for a total of ${results.pizzaAndBeerTotal}.</Text>*/}
          <Text style={styles.bold}>Your total bill should be: ${results.totalBill}</Text>
        </View>
      )}

      <View style={styles.footerContainer}>
        <Text>Created by: {' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>Ward Greunke</Text>
        </Text>
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
    backgroundColor: '#E6F3FF',
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
    marginBottom: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  roundButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    elevation: 3,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
 
export default PizzaBeerCalculator;
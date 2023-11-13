import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { globalStyles } from '../utils/styles';

const HomeScreen = ({ navigation }) => {
  const [ingredient, setIngredient] = useState('');

  const findRecipes = () => {
    navigation.navigate('Recipes', { ingredient });
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter an ingredient"
        value={ingredient}
        onChangeText={setIngredient}
      />
      <CustomButton title="Find Recipes" onPress={findRecipes} />
    </View>
  );
};

export default HomeScreen;

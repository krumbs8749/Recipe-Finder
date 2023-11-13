import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>Ingredients: {recipe.ingredients}</Text>
      <Text style={styles.text}>Instructions: {recipe.instructions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default RecipeCard;

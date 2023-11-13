import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { globalStyles } from '../utils/styles';

import axios from 'axios';

const getRecipes = async (ingredient) => {
  try {
    const response = await axios.post('http://localhost:5000/find_recipes', {
      ingredients: ingredient
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};


const RecipeScreen = ({ route }) => {
  const { ingredient } = route.params;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedRecipes = await getRecipes(ingredient);
      console.log(fetchedRecipes)
      if (fetchedRecipes) {
        setRecipes(fetchedRecipes);
      }
    })();
  }, [ingredient]);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RecipeScreen;

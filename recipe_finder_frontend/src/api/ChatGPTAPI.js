// Replace 'YOUR_API_KEY' with your actual key, and store it securely.
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

export const getRecipesFromIngredients = async (ingredients) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Create a recipe with the following ingredients: ${ingredients}`,
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  const data = await response.json();
  return data.choices[0].text;
};

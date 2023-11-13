# Recipe Finder App

## Overview
The Recipe Finder App is a simple yet powerful application that allows users to find recipes based on the ingredients they have. The app consists of two main components: a React Native frontend and a Flask backend. Users input ingredients into the React Native app, which then communicates with the Flask backend. The backend processes the input using a BERT model to find the top five recipes that can be made with the given ingredients. These recipes are then displayed on the frontend.

## Architecture
- **Frontend**: A React Native application that provides a user interface for inputting ingredients.
- **Backend**: A Flask application that uses a BERT model to find recipes based on the given ingredients.

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js and npm
- Python 3.8

### Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/krumbs8749/Recipe-Finder.git
   cd Recipe-Finder
   ```

2. **Run the Docker Compose**
   ```bash
   docker-compose up
   ```
   This command will set up both the frontend and backend services.

### Frontend (React Native)

The frontend is a React Native app where users can enter ingredients to find recipes. It uses Axios to send requests to the Flask backend.

#### Example Usage
```javascript
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const findRecipes = async () => {
    try {
      const response = await axios.post('http://localhost:5000/find_recipes', { ingredients });
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter ingredients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <Button title="Find Recipes" onPress={findRecipes} />
      {/* Display recipes here */}
    </View>
  );
}

export default App;
```

### Backend (Flask)

The backend is a Flask application that uses the BERT model to process the input from the frontend and returns the top five recipes.

#### Example Endpoint
```python
@app.route('/find_recipes', methods=['POST'])
def find_recipes():
    data = request.json
    user_ingredients = data['ingredients']
    # ... [BERT model processing and finding recipes] ...
    return jsonify(detailed_recommendations.to_dict(orient='records'))
```

### Running the Project
1. Navigate to the project directory.
2. Start the services using Docker Compose:
   ```bash
   docker-compose up
   ```
3. Open the React Native app on your device or emulator.
4. Enter ingredients and find recipes.

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check issues page if you want to contribute.

## License
Distributed under the MIT License. See `LICENSE` for more information.


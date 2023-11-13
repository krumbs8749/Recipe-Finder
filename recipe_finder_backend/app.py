from flask import Flask, request, jsonify
import pandas as pd
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load recipes data
df = pd.read_csv('./mock_recipes.csv')

# Load BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Load recipes data
df = pd.read_csv('./mock_recipes.csv')

# Load precomputed recipe embeddings
with open('recipe_embeddings.pkl', 'rb') as f:
    recipe_embeddings = pickle.load(f)
    
@app.route('/find_recipes', methods=['POST'])
def find_recipes():
    data = request.json
    user_ingredients = data['ingredients']
    user_input_embeddings = bert_encode(user_ingredients, model, tokenizer)

    # Find similarities
    similarities = [(name, cosine_similarity([user_input_embeddings], [embeddings])[0][0])
                    for name, embeddings in recipe_embeddings.items()]

    # Sort and get top 5 matching recipes
    recommended_recipes = sorted(similarities, key=lambda x: x[1], reverse=True)[:5]
    recommended_recipe_names = [recipe[0] for recipe in recommended_recipes]

    # Get full details from DataFrame
    detailed_recommendations = df[df['name'].isin(recommended_recipe_names)]
    detailed_recommendations = detailed_recommendations.set_index('name').reindex(recommended_recipe_names).reset_index()

    return jsonify(detailed_recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


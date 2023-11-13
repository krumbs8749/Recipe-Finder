import pandas as pd
from transformers import BertTokenizer, BertModel
import torch
import pickle

# Load recipes data
df = pd.read_csv('./mock_recipes.csv')

# Load BERT
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def bert_encode(text, model, tokenizer):
    input_ids = torch.tensor(tokenizer.encode(text, add_special_tokens=True)).unsqueeze(0)
    with torch.no_grad():
        outputs = model(input_ids)
    return outputs[0].mean(dim=1).squeeze().numpy()

# Precompute recipe embeddings
recipe_embeddings = {row['name']: bert_encode(row['ingredients'], model, tokenizer) for _, row in df.iterrows()}

# Save embeddings to a file
with open('recipe_embeddings.pkl', 'wb') as f:
    pickle.dump(recipe_embeddings, f)

from flask import Flask, request, jsonify
from transformers import pipeline
import warnings

warnings.filterwarnings('ignore')

# Initialize the Flask app
app = Flask(__name__)

# Load zero-shot classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=-1)

@app.route('/classify', methods=['POST'])
def classify_text():
    try:
        # Get JSON data from the request
        data = request.get_json()
        text = data.get("text", "")

        # Define custom labels
        labels = ["fear", "loneliness", "joy", "anger", "depression", "anxiety", "love", "sadness"]

        # Perform zero-shot classification
        results = classifier(text, candidate_labels=labels)
        
        # Prepare results as a dictionary
        scores_dict = {label: score for label, score in zip(results['labels'], results['scores'])}

        # Return results as JSON
        return jsonify(scores_dict)
    except Exception as e:
        return jsonify(e.args[0])

# Run the app
if __name__ == '__main__':
    app.run(debug=True)

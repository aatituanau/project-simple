import os 
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# URL of the database, used by the application to connect
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://user:pass@db:5432/pokedb')
db = SQLAlchemy(app)

class Pokemon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)

with app.app_context():
    db.create_all()

@app.route('/api/pokemon/<name>', methods=['GET'])
def get_pokemon(name):
    res = requests.get(f"https://pokeapi.co/api/v2/pokemon/{name.lower()}")
    return jsonify(res.json()) if res.status_code == 200 else (jsonify({"err": "no"}), 404)

@app.route('/api/fav', methods=['POST'])
def save_fav():
    data = Pokemon(name=request.json.get('name'))
    db.session.add(data)
    db.session.commit()
    return jsonify({"msg": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
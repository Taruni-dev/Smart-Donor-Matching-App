from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import bcrypt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB config
app.config['MONGO_URI'] = "mongodb://localhost:27017/smart_donor"
mongo = PyMongo(app)
users_collection = mongo.db.users

# Home test route
@app.route('/')
def home():
    return "Smart Donor Flask API is running"

# Register API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if users_collection.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        'name': name,
        'email': email,
        'password': hashed_password
    })

    return jsonify({'message': 'User registered successfully'}), 201

# Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email})
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Login successful', 'user_id': str(user['_id'])}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)

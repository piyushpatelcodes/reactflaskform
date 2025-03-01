from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://piyush:p02RYqC2YGjtXVUr@cluster0.4ubl9xs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["jobfair"]
users = db["users"]


@app.route('/')
def home():
    return jsonify({"message": "Welcome! Banckend is up and running. Created by Asmit Aditya Singh."})


@app.route('/register', methods=['POST'])
def register_user():
    if request.is_json:
        data = request.get_json()

        # Required fields (Only these are mandatory)
        required_fields = ['name', 'email']

        # Check if required fields are present
        missing_fields = [field for field in required_fields if field not in data or not data[field]]

        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Optional Fields (All others)
        user_data = {
            "name": data.get("name"),
            "dob": data.get("dob", ""),  # Optional
            "gender": data.get("gender", ""),  # Optional
            "phone": data.get("phone", ""),  # Optional
            "email": data.get("email"),
            "institution": data.get("institution", ""),  # Optional
            "degree": data.get("degree", ""),  # Optional
            "graduation_year": data.get("graduation_year", ""),  # Optional
            "reg_no": data.get("reg_no", "")  # Optional
        }

        # Insert into MongoDB
        users.insert_one(user_data)

        return jsonify({"message": "User Registered Successfully"}), 201
    else:
        return jsonify({"error": "Invalid JSON Data"}), 400

@app.route('/users', methods=['GET'])
def get_users():
    all_users = list(users.find({}, {"_id": 0}))
    return jsonify(all_users)


if __name__ == "__main__":
    app.run(debug=True)

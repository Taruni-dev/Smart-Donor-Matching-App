import datetime
import sys
import json
from typing import List, Dict
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Update if needed
db = client["bloodDonationDB"]  # Replace with your DB name
donors_collection = db["donors"]  # Replace with your collection name

def calculate_match_score(donor: Dict, request: Dict) -> int:
    score = 0

    if donor.get("bloodType") != request["blood_type"]:
        return -1  # Blood type doesn't match

    # Location score
    if donor.get("city", "").lower() == request["location"].lower():
        score += 50
    else:
        score += 10

    # Donation date score
    try:
        last_donated = datetime.datetime.strptime(donor.get("lastDonationDate"), "%Y-%m-%d")
        days_since = (datetime.datetime.now() - last_donated).days

        if days_since >= 90:
            score += 50
        elif days_since >= 60:
            score += 30
        elif days_since >= 30:
            score += 15
        else:
            score += 5
    except Exception as e:
        # If date parsing fails, no score added
        score += 0

    return score

def find_best_matches(request: Dict, donor_list: List[Dict], top_n=3) -> List[Dict]:
    scored_donors = []

    for donor in donor_list:
        score = calculate_match_score(donor, request)
        if score >= 0:
            donor_with_score = donor.copy()
            donor_with_score["match_score"] = score
            scored_donors.append(donor_with_score)

    scored_donors.sort(key=lambda x: x["match_score"], reverse=True)
    return scored_donors[:top_n]

if __name__ == "__main__":
    try:
        # Read JSON input from stdin
        input_data = sys.stdin.read()
        request = json.loads(input_data)

        # Validate request keys
        if "blood_type" not in request or "location" not in request:
            raise ValueError("Input JSON must contain 'blood_type' and 'location' keys")

        donor_list = list(donors_collection.find({}, {"_id": 0}))  # Fetch donors excluding _id

        top_matches = find_best_matches(request, donor_list, top_n=3)

        # Output matches as JSON
        print(json.dumps(top_matches))

    except Exception as e:
        # Print error message as JSON
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

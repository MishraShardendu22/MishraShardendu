import requests
import json
import time

BASE_URL = "http://127.0.0.1:3000"
EVENTS = [
    {
        "id": "evt001",
        "name": "Summer Music Festival",
        "description": "A three-day music festival featuring top artists",
        "location": "Central Park",
        "date": "2025-07-15",
        "price": 150,
        "ticketsAvailable": 500
    },
    {
        "id": "evt002",
        "name": "Tech Conference",
        "description": "Annual technology conference with industry leaders",
        "location": "Convention Center",
        "date": "2025-05-20",
        "price": 300,
        "ticketsAvailable": 200
    }
]

def test_health():
    """Test the health check endpoint"""
    response = requests.get(f"{BASE_URL}/health")
    print(f"Health Check Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("=" * 50)
    return response.status_code == 200

def initialize_session(user_id, balance):
    """Initialize a new chatbot session"""
    payload = {
        "userId": user_id,
        "balance": balance,
        "events": EVENTS
    }
    
    response = requests.post(f"{BASE_URL}/chatbot", json=payload)
    print(f"Session Initialization Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("=" * 50)
    return response.json()

def send_message(user_id, balance, message):
    """Send a message to the chatbot"""
    payload = {
        "userId": user_id,
        "balance": balance,
        "events": EVENTS,
        "message": message
    }
    
    response = requests.post(f"{BASE_URL}/chatbot", json=payload)
    print(f"Message Response: {response.status_code}")
    print(f"User Message: '{message}'")
    print(json.dumps(response.json(), indent=2))
    print("=" * 50)
    return response.json()

def run_test_scenario():
    """Run a complete test scenario"""
    # Check if the server is running
    if not test_health():
        print("Health check failed. Make sure the server is running.")
        return
    
    # User details
    user_id = "test_user_" + str(int(time.time()))
    balance = 500
    
    # Initialize session
    session_response = initialize_session(user_id, balance)
    
    # Ask about available events
    send_message(user_id, balance, "What events are available?")
    
    # Express interest in music festival
    send_message(user_id, balance, "Tell me more about the Summer Music Festival")
    
    # Try to book with insufficient balance
    insufficient_balance_resp = send_message(user_id, 100, "I want to book a ticket for the Summer Music Festival")
    
    # Book with sufficient balance
    booking_interest_resp = send_message(user_id, balance, "I want to book a ticket for the Summer Music Festival")
    
    # Confirm booking
    confirmation_resp = send_message(user_id, balance, "Yes, I confirm the booking")
    
    # Test error case - booking when tickets are no longer available
    events_copy = EVENTS.copy()
    for event in events_copy:
        if event["id"] == "evt001":
            event["ticketsAvailable"] = 0
    
    payload = {
        "userId": user_id,
        "balance": balance,
        "events": events_copy,
        "message": "I want to book a ticket for the Summer Music Festival"
    }
    
    response = requests.post(f"{BASE_URL}/chatbot", json=payload)
    print(f"No Tickets Available Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("=" * 50)

if __name__ == "__main__":
    run_test_scenario()
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import google.generativeai as genai
import json
import os
from dotenv import load_dotenv
import uuid

# Load environment variables
load_dotenv()
API_KEY = os.getenv('GEMINI_API_KEY')

# Configure the Gemini API
genai.configure(api_key=API_KEY)

app = Flask(__name__)
cors = CORS(app)

# Dictionary to store user chat sessions
user_sessions = {}

class EventBookingSession:
    def __init__(self, user_id, user_balance, events_array):
        self.user_id = user_id
        self.user_balance = user_balance
        self.events_array = events_array
        self.session_id = str(uuid.uuid4())
        self.chat = genai.GenerativeModel('gemini-1.5-pro').start_chat(history=[])
        
    def find_event_by_keyword(self, keyword):
        """Find events that match the given keyword."""
        if not keyword:
            return None
        
        keyword = keyword.lower()
        matching_events = []
        
        for event in self.events_array:
            if (keyword in event["name"].lower() or 
                keyword in event["description"].lower() or
                keyword in event["location"].lower()):
                matching_events.append(event)
        
        return matching_events

    def get_event_by_id(self, event_id):
        """Get an event by its ID."""
        for event in self.events_array:
            if event["id"] == event_id:
                return event
        return None

    def check_booking_eligibility(self, event_id):
        """Check if the user is eligible to book a ticket for the event."""
        event = self.get_event_by_id(event_id)
        if not event:
            return {"eligible": False, "reason": "Event not found"}
        
        if event["ticketsAvailable"] <= 0:
            return {"eligible": False, "reason": "No tickets available"}
        
        if self.user_balance < int(event["price"]):
            return {"eligible": False, "reason": f"Insufficient balance. You have {self.user_balance}, but the ticket costs {event['price']}"}
        
        return {"eligible": True}

    def process_user_message(self, user_message):
        """Process the user message and generate a response."""
        # System prompt to guide the model's behavior
        system_prompt = """
        You are an event booking assistant. Your task is to help users book tickets for events.
        Use the events data provided to answer questions and process booking requests.
        Follow these guidelines:
        1. Always be polite and helpful
        2. If you can't understand what the user wants, ask them to close the chat window and try again
        3. When a user wants to book an event:
           - Make sure they have sufficient balance
           - Make sure tickets are available
           - Get confirmation from the user before finalizing
        4. For booking confirmations, respond with {confirmation: event_id}
        """
        
        # Add the context information to help the model make decisions
        context = {
            "events": self.events_array,
            "user_balance": self.user_balance,
            "user_id": self.user_id
        }
        
        # Prepare the message for the model
        prompt = f"""
        {system_prompt}

        Current context:
        {json.dumps(context, indent=2)}

        User message: {user_message}

        Please respond appropriately based on the user's request and the available events.
        """
        
        # Generate a response
        response = self.chat.send_message(prompt)
        model_response = response.text
        
        # Process the model's response to extract any actions or callbacks
        if "{confirmation:" in model_response:
            # Extract the event ID from the confirmation
            start_idx = model_response.find("{confirmation:") + len("{confirmation:")
            end_idx = model_response.find("}", start_idx)
            event_id = model_response[start_idx:end_idx].strip()
            
            # Process the booking confirmation
            event = self.get_event_by_id(event_id)
            if event:
                # In a real application, you would update the database here
                print(f"Booking confirmed for event {event_id}")
                # Return a cleaned response without the confirmation tag
                return {
                    "message": model_response.replace(f"{{confirmation:{event_id}}}", 
                                                     f"Booking confirmed for {event['name']}!"),
                    "action": "confirm_booking",
                    "event_id": event_id
                }
        
        if "{callback:" in model_response:
            # Extract the event ID from the callback
            start_idx = model_response.find("{callback:") + len("{callback:")
            end_idx = model_response.find("}", start_idx)
            event_id = model_response[start_idx:end_idx].strip()
            
            # Process the callback
            event = self.get_event_by_id(event_id)
            if event:
                # In a real application, you would save this state for later
                print(f"Callback saved for event {event_id}")
                # Return a cleaned response without the callback tag
                return {
                    "message": model_response.replace(f"{{callback:{event_id}}}", 
                                                     f"We'll remember you were interested in {event['name']}."),
                    "action": "callback",
                    "event_id": event_id
                }
        
        return {
            "message": model_response,
            "action": "response"
        }

@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.json
        
        # Extract user information and events data
        user_id = data.get('userId')
        user_balance = data.get('balance')
        events_array = data.get('events')
        user_message = data.get('message')
        
        # Validate required data
        # if not user_id or user_balance is None or not events_array:
        #     return jsonify({
        #         "status": "error",
        #         "message": "Missing required user information or events data"
        #     }), 400
            
        # Check if this is an existing or new user session
        if user_id in user_sessions:
            # Update existing session with the latest data
            user_sessions[user_id].user_balance = user_balance
            user_sessions[user_id].events_array = events_array
            session = user_sessions[user_id]
        else:
            # Create a new session for this user
            session = EventBookingSession(user_id, user_balance, events_array)
            user_sessions[user_id] = session
        
        # Process the user message if provided
        if user_message:
            response_data = session.process_user_message(user_message)
            
            # Return the response with session details
            return jsonify({
                "status": "success",
                "session_id": session.session_id,
                "response": response_data
            })
        else:
            # If no message, just return the session info for a new session
            return jsonify({
                "status": "success",
                "session_id": session.session_id,
                "response": {
                    "message": "Welcome to the Event Booking Assistant! How can I help you today?",
                    "action": "greeting"
                }
            })
            
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"An error occurred: {str(e)}"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=3000)
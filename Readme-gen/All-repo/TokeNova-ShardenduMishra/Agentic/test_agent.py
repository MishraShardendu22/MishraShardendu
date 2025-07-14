from event_booking_agent import EventBookingAgent

def test_conversation():
    agent = EventBookingAgent()
    
    # Test conversation flow
    test_inputs = [
        "Hi, I want to book tickets for an event",
        "I'm looking for a music concert happening this weekend",
        "The second one looks good",
        "I'd like 2 tickets please",
        "Yes, connect my wallet 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        "Yes, confirm the purchase"
    ]
    
    for user_input in test_inputs:
        print(f"\nUser: {user_input}")
        response = agent.chat(user_input)
        print(f"Agent: {response}")

if __name__ == "__main__":
    test_conversation()
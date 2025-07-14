export const dummyMessages = [
    {
      text: "Hello! How can I help with your project today?",
      sender: "ai",
      timestamp: "2025-03-22T10:20:00Z"
    },
    {
      text: "I'm trying to implement authentication in my React app. Any suggestions?",
      sender: "user",
      timestamp: "2025-03-22T10:21:30Z"
    },
    {
      text: "For React authentication, you have several options. You could use Firebase Auth for a quick solution, or Auth0 for more enterprise features. Would you like me to explain how to implement either of these?",
      sender: "ai",
      timestamp: "2025-03-22T10:22:15Z"
    },
    {
      text: "Firebase Auth sounds good. Can you show me how to set it up?",
      sender: "user",
      timestamp: "2025-03-22T10:23:45Z"
    },
    {
      text: "Sure! First, you'll need to install the Firebase SDK. Then you'll need to initialize Firebase with your config and set up the authentication methods you want to use. I can provide more detailed steps if needed.",
      sender: "ai",
      timestamp: "2025-03-22T10:24:30Z"
    }
]

/*

1.) When The Modal is Opened then automatically all the data of events is sent to the AI Agent System.
Api End Point will be Given
You extract all events from the front end where we render it 

AI ask for the events we want to book. (Hardcoded)

2.) Then AI could return 3 possible Reponses:

a.) No Events Found
-> Then we will show a message that no events found

b.) 1 single Event that we found 
-> Show the event card, with yes or no 
  -> If yes, then we will show the message that the event is booked and the event card will be shown in the booked events section.
  -> If no, then we will show the message that the event is not booked and the event card will be shown in the not booked events section.

c.) Multiple Events that we found
  Show the event cards, with yes or no
  -> If yes, then we will show the message that the event is booked and the event card will be shown in the booked events section.
  -> If no, then we will show the message that the event is not booked and the event card will be shown in the not booked events section.

*/ 
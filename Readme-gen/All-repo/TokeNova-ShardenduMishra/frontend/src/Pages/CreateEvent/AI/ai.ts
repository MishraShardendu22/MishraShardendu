import axios from 'axios';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

interface AIGeneratedEventData {
    name: string;
    description: string;
    category: string;
}

export const generateEventDetails = async (prompt: string): Promise<AIGeneratedEventData> => {
    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + geminiApiKey,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Generate an event name, description, and category based on the following prompt: "${prompt}".
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: string;
  ticketsAvailable: number;
  totalTickets: number;
  imageUrl: string;
  organizer: string;
  category: string;
  time: string;
  callback: () => void; this is interface in typescript can you fill that accordinly.The category must be one of: Tech, Music, Art, Sports, Business, Education, Other. Return the response as a plain JSON object with keys "name", "description", and "category", without any additional text or code blocks.`
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const generatedText = response.data.candidates[0].content.parts[0].text;
        console.log('Generated text:', generatedText);

        let jsonString;
        if (generatedText.startsWith('{') && generatedText.endsWith('}')) {
            jsonString = generatedText;
        } else {
            const match = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
            if (match) {
                jsonString = match[1].trim();
            } else {
                throw new Error('Invalid response format');
            }
        }

        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error in AI service:', error);
        throw new Error('Failed to generate event details');
    }
};
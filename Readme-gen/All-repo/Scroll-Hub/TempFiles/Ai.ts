/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const prompt =
    'Write a TypeScript snippet that demonstrates how to use the Google Generative AI API to generate text.';

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}

run();

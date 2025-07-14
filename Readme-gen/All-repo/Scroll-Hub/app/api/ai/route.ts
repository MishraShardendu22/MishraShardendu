import { sendResponse } from '@/util/apiResponse';

export async function GET() {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return sendResponse(500, 'API Key not found');
    }
    return sendResponse(200, 'API Key found', API_KEY);
  } catch (error) {
    console.log(error);
    return sendResponse(500, 'Internal Server Error');
  }
}

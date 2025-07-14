import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import Array from "./schema/array.js";
import cors from "cors";
import dbConfig from "./dbConfig/dbConfig.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt + ' Please respond in a kind and friendly tone, and act more like a human in your responses. Keep it short and sweet, without using "\\n", just continue onto the next line. At max, keep the response to 2 small paragraphs.';

  try {
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    // Log generated content
    console.log(generatedText);
    
    // Find the first document in the collection or create a new one if it doesn't exist
    let arrayDoc = await Array.findOne();
    if (!arrayDoc) {
      arrayDoc = new Array({
        array: [],
      });
    }

    // Append the prompt and result to the array
    arrayDoc.array.push(`${req.body.prompt}`);
    arrayDoc.array.push(`${generatedText}`);

    // Save updated array document
    await arrayDoc.save();

    res.status(200).json({
      success: true,
      data: generatedText,
      updatedArray: arrayDoc.array,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Route to get the saved array from the database
app.get("/history", async (req, res) => {
  try {
    // Find the first document in the collection
    let arrayDoc = await Array.findOne();

    if (!arrayDoc) {
      return res.status(404).json({
        success: false,
        message: "No history found",
      });
    }

    res.status(200).json({
      success: true,
      history: arrayDoc.array,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.delete("/clear", async (req, res) => {
  try {
    await Array.deleteMany({});
    res.status(200).json({
      success: true,
      message: "History cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// Default API Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  dbConfig();
  console.log(`Server is running on port ${PORT}`.yellow.bold);
  console.log(`Connect to http://localhost:${PORT}`);
});
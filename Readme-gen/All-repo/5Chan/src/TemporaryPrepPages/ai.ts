/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// const GeminiURI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API}`;

export const getGeminiContent = async () => {
    try {
        // const data = {
        //     prompt: {
        //         text: "What is NextJS 15?",
        //     },
        // };

        // const response = await axios.post(GeminiURI, data, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        // console.log("Gemini API Response:", response.data);

        // Second Method using the GoogleGenerativeAI package
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Write a story about a magic backpack.";

        const result = await model.generateContent(prompt);

        return NextResponse.json({
            status: 200,
            message: "Success",
            data: result.response.text(),
        });
    } catch (error: any) {
        console.error("Error fetching content from Gemini API:", error.message);
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

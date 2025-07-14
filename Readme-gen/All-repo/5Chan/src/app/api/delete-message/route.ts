/* eslint-disable @typescript-eslint/no-explicit-any */
import UserModel from "@/model/user.model";
import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Parse the JSON body from the request
        const { id, messageId } = await request.json();

        if (!id || !messageId) {
            return sendResponse(400, "Missing required fields.");
        }

        // Find the user by ID
        const user = await UserModel.findById(id);
        if (!user) {
            return sendResponse(404, "User not found.");
        }

        // Find the message index by its ID
        const messageIndex = user.messages.findIndex(
            (msg) => (msg._id as any).toString() === messageId
        );

        if (messageIndex === -1) {
            return sendResponse(404, "Message not found.");
        }

        // Remove the message from the user's messages
        user.messages.splice(messageIndex, 1);
        await user.save();

        // Respond with a success message
        return sendResponse(200, "Message deleted.");
    } catch (error) {
        console.error("Error deleting message:", error);
        return sendResponse(500, "Failed to delete message.");
    }
}

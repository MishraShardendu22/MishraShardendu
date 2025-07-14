import dbConnect from "@/database/database.connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { sendResponse } from "@/util/Response";
import UserModel from "@/model/user.model";

// In your POST handler
export async function POST() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !session.user) {
      return sendResponse(401, "Unauthorized");
    }
  
    const userId = user?._id;
  
    try {
      const currentUser = await UserModel.findById(userId);
      if (!currentUser) {
        return sendResponse(404, "User not found");
      }
  
      // Toggle the `isAcceptingMessages` value
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          isAcceptingMessages: !currentUser.isAcceptingMessages,
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return sendResponse(404, "User not found");
      }
  
      return sendResponse(200, "Success", {
        isAcceptingMessages: updatedUser.isAcceptingMessages, // Ensure this is returned to the frontend
      });
    } catch (error) {
      console.error(error);
      return sendResponse(500, "Internal Server Error");
    }
}

export async function GET() {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !session.user) {
      return sendResponse(401, "Unauthorized");
    }
  
    const userId = user?._id;
  
    try {
      const currentUser = await UserModel.findById(userId);
      if (!currentUser) {
        return sendResponse(404, "User not found");
      }
  
      return sendResponse(200, "Success", {
        isAcceptingMessages: currentUser.isAcceptingMessages,
      });
    } catch (error) {
      console.error(error);
      return sendResponse(500, "Internal Server Error");
    }
}
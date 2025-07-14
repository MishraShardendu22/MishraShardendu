import {connect} from "@/dbConfig/dbConfig"
import { NextResponse } from "next/server"

connect();

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "", 
            { 
                httpOnly: true,
                expires: new Date(0)
                // expires: new Date(0) sets the expiration date of a cookie to a point in the past (January 1, 1970, GMT). This effectively deletes the cookie by making it immediately invalid. When a cookie's expiration date is in the past, browsers will automatically remove the cookie from storage.
                // In other words, expires: new Date(0) ensures that the cookie will be discarded.
            }
        );
        return response;
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }       
}
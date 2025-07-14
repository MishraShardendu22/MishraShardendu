/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConnectToDatabase } from "@/DataBase/database.connect";
import Product from "@/Models/Product.model";
import { NextRequest, NextResponse } from "next/server"

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function GET(request: NextRequest,props : any){
    try{
        const {id} = await props.params
        await ConnectToDatabase();

        const product = await Product.findById(id).lean();
        if(!product){
            return NextResponse.json(
                {message: "Product not found"}, {status: 404}
            )
        }
        return NextResponse.json(
            product, 
            { status: 200 }
        )
    }catch(e){
        console.log(e)
        return NextResponse.json({message: e}, {status: 500})   
    }
}
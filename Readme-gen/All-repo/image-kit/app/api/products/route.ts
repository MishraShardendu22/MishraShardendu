import { ConnectToDatabase } from "@/DataBase/database.connect"
import { authOption } from "@/lib/auth";
import Product from "@/Models/Product.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"

export async function GET(){
    try{
        await ConnectToDatabase();
        const products = await Product.find();

        if(!products || products.length === 0){
            return NextResponse.json(
                [], { status: 200 }
            )
        }

        return NextResponse.json(
            products, 
            { status: 200 }
        )
    }catch(e){
        console.log(e)
        return NextResponse.json({message: e}, {status: 500})
    }
}

export async function POST(request : NextRequest){
    try{
        const session = await getServerSession(authOption);
        if(!session || session?.user.role !== "admin"){
            return NextResponse.json({message: "Unauthorized"}, {status: 401})
        }
        
        await ConnectToDatabase();
        const body = await request.json();

        if(!body.name || !body.imageUrl || !body.variants ||  body.variants.length === 0){
            return NextResponse.json({message: "Invalid data"}, {status: 400})
        }

        for(const variant of body.variants){
            if(!variant.type || !variant.price || !variant.license){
                return NextResponse.json(
                    {message: "Invalid data"}, {status: 400}
                )
            }      
        }

        const newProduct = await Product.create(body)
        return NextResponse.json(
            newProduct, 
            {status: 201}
        )
    }catch(e){
        console.log(e)
        return NextResponse.json({message: e}, {status: 500})
    }
}
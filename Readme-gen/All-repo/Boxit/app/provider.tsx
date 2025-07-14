"use client";
import axios from "axios";
import { ReactNode } from "react"
import { ImageKitProvider } from "imagekitio-next";

const authenticator = async () => {
    try{
      const res = await axios.get("/api/imagekit-auth");
      return res.data;
    }catch(error){
      console.error("Authentication error:", error);
      throw error;
    }
}

const provider = ({children} : {children : ReactNode}) => {
  return (
    <ImageKitProvider
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string}
        authenticator={ authenticator }
    >
        {children}
    </ImageKitProvider>
  )
}

export default provider

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from "./authContext"
import { ReactNode } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext<{ socket: SocketIOClient.Socket | null; onlineUser: any[] }>({ socket: null, onlineUser: [] });

export const useSocketContext=()=>{
    return useContext(SocketContext);
}


export const SocketContextProvider=({children}: { children: ReactNode })=>{
    const [socket , setSocket]= useState<SocketIOClient.Socket | null>(null);
    const [onlineUser,setOnlineUser]=useState([]);
    const authContext = useAuth();
    const authUser = authContext?.authUser;
    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:5173/",{
                query:{
                    userId:authUser?._id,
                }
            })
            socket.on("getOnlineUsers",(users: any)=>{
                setOnlineUser(users)
            });
            setSocket(socket);
            return () => {
                socket.close();
            };
        }else{
            if(socket){
                socket.close();
                setSocket(null); 
            }
        }
    },[authUser]);
    return(
    <SocketContext.Provider value={{socket , onlineUser}}>
        {children}
    </SocketContext.Provider>
    )
}
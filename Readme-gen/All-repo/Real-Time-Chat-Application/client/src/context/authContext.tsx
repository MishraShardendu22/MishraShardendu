/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext , useContext ,useState } from "react";

export const AuthContext = createContext<{ authUser: any; setAuthUser: React.Dispatch<React.SetStateAction<any>> } | undefined>(undefined);

export const useAuth =()=>{
    return useContext(AuthContext)
}

import { ReactNode } from "react";

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider =({children}: AuthContextProviderProps)=>{
    const [authUser , setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem('chatapp');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <AuthContext.Provider value={{authUser ,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}
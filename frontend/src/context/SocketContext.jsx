import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useRecoilValue } from "recoil";
// import { io } from "../../../backend/socket/socket";
import io from "socket.io-client"
import userAtom from "../atoms/userAtom";
import { useContext } from "react";


const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers,setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:5000",{
            query:{
                userId:user?._id
            }
        })
        setSocket(socket);

        socket.on("getOnlineUsers",(users) => {
            setOnlineUsers(users);

        })
        
        

        return () => socket && socket.close();
    },[user?._id] )
    console.log(onlineUsers , "Online Users");
    return(
        <SocketContext.Provider value={{socket , onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )

}
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"


export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext()
    useEffect(() => {
        if (authUser) {
            const socket = io("https://realtimechat-app-yyb2.onrender.com", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socket);

            socket.on("connect", () => {
                console.log("Connected to server with socket ID:", socket.id);
            });

            socket.on("disconnect", (reason) => {
                console.log("Disconnected from server. Reason:", reason);
            });

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
                console.log("Online users:", users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                console.log("Closing socket connection...");
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);


    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}
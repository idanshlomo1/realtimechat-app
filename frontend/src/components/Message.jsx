"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from "@/context/AuthContext";
import { useConversation } from '@/zustand/useConversation';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <motion.div
            className={`flex ${fromMe ? 'justify-end' : 'justify-start'} mb-4 items-end`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {!fromMe && (
                <motion.img
                    src={selectedConversation.profilePic || "/placeholder.svg?height=32&width=32"}
                    alt={`${selectedConversation.firstName}'s profile`}
                    className="w-8 h-8 rounded-full mr-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
            )}
            <motion.div
                className={`max-w-[70%] p-3 rounded-xl ${fromMe
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
                <p className="mb-1">{message.message}</p>
                <p className={`text-xs ${fromMe ? 'text-blue-200' : 'text-gray-500'}`}>
                    {formatTime(message.createdAt)}
                </p>
            </motion.div>
            {fromMe && (
                <motion.img
                    src={authUser.profilePic || "/placeholder.svg?height=32&width=32"}
                    alt="Your profile"
                    className="w-8 h-8 rounded-full ml-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
            )}
        </motion.div>
    );
};

export default Message;
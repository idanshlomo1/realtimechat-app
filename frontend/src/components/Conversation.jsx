"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSocketContext } from '@/context/SocketContext'

const Conversation = ({ firstName, lastName, username, profilePic, isSelected, _id }) => {
    const fullName = `${firstName} ${lastName}`

    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(_id)

    return (
        <motion.div
            className={`flex cursor-pointer items-center space-x-4 p-3 rounded-xl transition-colors ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="relative">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={profilePic} alt={fullName} />
                    <AvatarFallback>{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
                </Avatar>
                {isOnline && (
                    <motion.span
                        className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        aria-hidden="true"
                    />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <motion.p
                    className="text-sm font-medium text-gray-900 truncate"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {fullName}
                </motion.p>
                <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-xs text-gray-500 truncate">@{username}</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Conversation
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSocketContext } from '@/context/SocketContext'

const Conversation = ({ firstName, lastName, username, profilePic, isSelected, _id }) => {
    const fullName = `${firstName} ${lastName}`

    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(_id)

    return (
        <div className={`flex cursor-pointer items-center space-x-4 p-3 rounded-xl transition-colors ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
            <div className="relative">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={profilePic} alt={fullName} />
                    <AvatarFallback>{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
                </Avatar>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" aria-hidden="true" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
                <div className="flex items-center">
                    <p className="text-xs text-gray-500 truncate">@{username}</p>
                </div>
            </div>
        </div>
    )
}

export default Conversation
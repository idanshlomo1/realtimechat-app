import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Conversation = ({ firstName, lastName, lastMessage, time }) => {
    const fullName = `${firstName} ${lastName}`

    return (
        <div className="flex items-center space-x-4 p-3 rounded-xl transition-colors hover:bg-gray-100">
            <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${fullName}`} alt={fullName} />
                <AvatarFallback>{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
                <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400">{time}</span>
        </div>
    )
}

export default Conversation
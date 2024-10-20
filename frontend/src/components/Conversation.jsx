import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Conversation = ({ firstName, lastName, username, profilePic, isSelected }) => {
    const fullName = `${firstName} ${lastName}`

    return (
        <div className={`flex cursor-pointer items-center space-x-4 p-3 rounded-xl transition-colors ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
            <Avatar className="h-12 w-12">
                <AvatarImage src={profilePic} alt={fullName} />
                <AvatarFallback>{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{fullName}</p>
                <p className="text-xs text-gray-500 truncate">@{username}</p>
            </div>
        </div>
    )
}

export default Conversation
import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, LogOut } from "lucide-react"
import Conversation from './Conversation'

const Sidebar = ({ onSelectChat }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const conversations = [
        { id: 1, firstName: "Alice", lastName: "Johnson", lastMessage: "See you tomorrow!", time: "10:30 AM" },
        { id: 2, firstName: "Bob", lastName: "Smith", lastMessage: "How's the project going?", time: "Yesterday" },
        { id: 3, firstName: "Carol", lastName: "Williams", lastMessage: "Thanks for your help!", time: "2 days ago" },
        // Add more conversations as needed
    ]

    const filteredConversations = conversations.filter(conv =>
        `${conv.firstName} ${conv.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <Card className="w-full h-full rounded-l-2xl backdrop-blur-md bg-white/70 shadow-xl border-none overflow-hidden">
            <CardContent className="p-2 sm:p-4 flex flex-col h-full">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search conversations"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full bg-white/80 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <ScrollArea className="flex-1 sm:-mx-4 sm:px-4">
                    <div className="space-y-2">
                        {filteredConversations.map((conv) => (
                            <div key={conv.id} onClick={() => onSelectChat(conv)}>
                                <Conversation {...conv} />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <Button
                    variant="ghost"
                    className="mt-4 w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </CardContent>
        </Card>
    )
}

export default Sidebar
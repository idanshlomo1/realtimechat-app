import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Menu } from "lucide-react"

const Message = ({ content, isSent }) => {
    return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] p-3 rounded-xl ${isSent ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-800'}`}>
                {content}
            </div>
        </div>
    )
}

const MessagesContainer = ({ selectedChat, onBackClick }) => {
    const [messageInput, setMessageInput] = useState('')

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (messageInput.trim()) {
            // Here you would typically send the message to your backend
            console.log('Sending message:', messageInput)
            setMessageInput('')
        }
    }

    if (!selectedChat) {
        return (
            <Card className="h-full rounded-none sm:rounded-r-2xl backdrop-blur-md bg-white/70 shadow-xl border-none overflow-hidden flex flex-col">
                <CardHeader className="border-b border-gray-200/50 p-4 flex items-center">
                    <Button variant="ghost" onClick={onBackClick} className="mr-2 sm:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <h2 className="text-xl font-semibold text-gray-800">ChatApp</h2>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome to ChatApp</h2>
                        <p className="text-gray-600 mt-2">Please select a chat to start messaging</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="h-full rounded-none sm:rounded-r-2xl backdrop-blur-md bg-white/70 shadow-xl border-none overflow-hidden flex flex-col">
            <CardHeader className="border-b border-gray-200/50 p-4 flex items-center">
                {selectedChat && (
                    <Button variant="ghost" onClick={onBackClick} className="mr-2 sm:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                )}
                <h2 className="text-xl font-semibold text-gray-800">
                    {selectedChat ? `${selectedChat.firstName} ${selectedChat.lastName}` : 'ChatApp'}
                </h2>
            </CardHeader>
            <CardContent className="flex-grow p-4 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <Message content="Hey, how are you?" isSent={false} />
                    <Message content="I'm doing great, thanks for asking!" isSent={true} />
                    <Message content="That's wonderful to hear!" isSent={false} />
                    {/* Add more messages as needed */}
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t border-gray-200/50 p-4">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-grow bg-white/80 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}

export default MessagesContainer
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Menu, X } from "lucide-react"
import Message from './Message'
import useSendMessage from '@/hooks/useSendMessage'
import useGetMessages from '@/hooks/useGetMessages'
import { useAuthContext } from "@/context/AuthContext"
import { useConversation } from "@/zustand/useConversation"
import useListenMessages from '@/hooks/useListenMessages'
import { ScrollArea } from './ui/scroll-area'

const MessagesContainer = ({ onBackClick, showBackButton, isSidebarOpen, setIsSidebarOpen }) => {
    const [messageInput, setMessageInput] = useState('')
    const { loading: sendMessageLoading, sendMessage } = useSendMessage()
    useListenMessages()
    const { messages, loading: messagesLoading } = useGetMessages()
    const { authUser } = useAuthContext()
    const { selectedConversation } = useConversation()
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (scrollContainerRef.current && messages.length > 0) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (scrollContainerRef.current && messages.length > 0) {
            const scrollContainer = scrollContainerRef.current;
            const isScrolledToBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollContainer.scrollTop + 1;

            if (isScrolledToBottom) {
                setTimeout(() => {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }, 100);
            }
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (messageInput.trim() && selectedConversation) {
            try {
                await sendMessage(messageInput, selectedConversation._id)
                setMessageInput('')
            } catch (error) {
                console.error('Error sending message:', error)
            }
        }
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <Card className="h-full rounded-none sm:rounded-r-2xl backdrop-blur-md bg-white/20 shadow-none border-none overflow-hidden flex flex-col">
            <CardHeader className="border-b border-gray-200/50 p-4 flex items-center backdrop-blur-md bg-white/20">
                <motion.div
                    className="flex items-center w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {showBackButton && (
                        <Button variant="ghost" onClick={toggleSidebar} className="mr-2">
                            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    )}
                    <div className="flex items-center flex-grow">
                        {selectedConversation && (
                            <motion.img
                                src={selectedConversation.profilePic}
                                alt={`${selectedConversation.firstName}'s profile`}
                                className="w-10 h-10 rounded-full mr-3"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />
                        )}
                        <h2 className="text-xl font-semibold text-gray-800">
                            {selectedConversation ? `${selectedConversation.firstName} ${selectedConversation.lastName}` : 'ChatApp'}
                        </h2>
                    </div>
                </motion.div>
            </CardHeader>
            <CardContent className="flex-grow p-4 overflow-hidden backdrop-blur-md bg-white/70">
                {selectedConversation ? (
                    <div className="h-full pr-4 overflow-y-auto" ref={scrollContainerRef}>
                        <AnimatePresence>
                            {messagesLoading ? (
                                <motion.div
                                    className="flex justify-center items-center h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </motion.div>
                            ) : (
                                <ScrollArea>
                                    <div className='h-full'>

                                        {messages.map((msg, index) => (
                                            <div
                                                key={msg._id}
                                            >
                                                <Message message={msg} />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        className="h-full flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Welcome to ChatApp</h2>
                            <p className="text-gray-600 mt-2">Please select a chat to start messaging</p>
                        </div>
                        {showBackButton && (
                            <Button
                                onClick={toggleSidebar}
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            >
                                Open Sidebar
                            </Button>
                        )}
                    </motion.div>
                )}
            </CardContent>
            {selectedConversation && (
                <CardFooter className="border-t border-gray-200/50 p-4 backdrop-blur-md bg-white/70">
                    <motion.form
                        onSubmit={handleSendMessage}
                        className="flex w-full space-x-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-grow bg-white/90 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            disabled={sendMessageLoading}
                        >
                            {sendMessageLoading ? 'Sending...' : <Send className="h-5 w-6" />}
                        </Button>
                    </motion.form>
                </CardFooter>
            )}
            <motion.div
                className="flex justify-center py-6 border-t border-gray-200/50 backdrop-blur-md bg-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <p className="flex items-center gap-1">
                    <span className='text-xs font-medium text-muted-foreground'>
                        Made by
                    </span>
                    <a
                        className="flex items-center hover:opacity-80 transition duration-200 ease-in-out"
                        href="https://idanshlomo.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="mr-1 h-[24px] w-[24px]"
                            src="/is-logo.svg"
                            alt="Idan Shlomo Logo"
                        />
                        <span className='font-medium text-sm'>
                            Idan Shlomo
                        </span>
                    </a>
                </p>
            </motion.div>
        </Card>
    )
}

export default MessagesContainer
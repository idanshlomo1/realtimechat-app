"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, LogOut } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Conversation from './Conversation'
import { useLogout } from '@/hooks/useLogout'
import useGetConversations from '@/hooks/useGetConversations'
import { useConversation } from '@/zustand/useConversation'

const LoadingSkeleton = () => (
    <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="flex items-center space-x-4 p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
            >
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                </div>
            </motion.div>
        ))}
    </div>
)

const Sidebar = ({ onSelectChat }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { loading: loadingLogout, logout } = useLogout()
    const { conversations, loading: loadingConversations, error } = useGetConversations()
    const { selectedConversation, setSelectedConversation } = useConversation()

    const filteredConversations = conversations?.filter(conv =>
        `${conv.firstName} ${conv.lastName} ${conv.username}`.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const handleConversationSelect = (conv) => {
        setSelectedConversation(conv)
        onSelectChat(conv)
    }

    return (
        <Card className="w-full h-full rounded-l-2xl rounded-tr-none backdrop-blur-md bg-white/70 shadow-none border-none overflow-hidden">
            <CardContent className="p-4 flex flex-col h-full">
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search conversations"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full bg-white/90 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </motion.div>
                <ScrollArea className="flex-1 -mx-4 px-4">
                    <AnimatePresence>
                        {loadingConversations ? (
                            <LoadingSkeleton />
                        ) : error ? (
                            <motion.div
                                className="text-center text-red-500 p-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Error: {error}
                            </motion.div>
                        ) : (
                            <motion.div className="space-y-2">
                                {filteredConversations.map((conv, index) => (
                                    <motion.div
                                        key={conv._id}
                                        onClick={() => handleConversationSelect(conv)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Conversation
                                            _id={conv._id}
                                            firstName={conv.firstName}
                                            lastName={conv.lastName}
                                            username={conv.username}
                                            profilePic={conv.profilePic}
                                            isSelected={selectedConversation?._id === conv._id}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ScrollArea>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Button
                        variant="ghost"
                        className="mt-4 w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition duration-200 ease-in-out"
                        onClick={handleLogout}
                        disabled={loadingLogout}
                    >
                        {loadingLogout ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                Logging out...
                            </>
                        ) : (
                            <>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </>
                        )}
                    </Button>
                </motion.div>
            </CardContent>
        </Card>
    )
}

export default Sidebar
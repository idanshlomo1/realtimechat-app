"use client"

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion, AnimatePresence } from 'framer-motion'
import MessagesContainer from '@/components/MessagesContainer'
import Sidebar from '@/components/Sidebar'
import { useConversation } from '@/zustand/useConversation'

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { selectedConversation, setSelectedConversation } = useConversation()
    const isDesktop = useMediaQuery({ minWidth: 768 })

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    useEffect(() => {
        if (isDesktop) {
            setIsSidebarOpen(true)
        } else {
            setIsSidebarOpen(false)
        }
    }, [isDesktop])

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <motion.div
            className="flex h-[90vh] w-screen items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex w-full h-full backdrop-blur-md bg-white/70 rounded-2xl overflow-hidden shadow-2xl border border-white/20 m-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
                {/* Sidebar */}
                <AnimatePresence>
                    {(isSidebarOpen || isDesktop) && (
                        <motion.div
                            className={`
                                fixed md:relative 
                                w-[280px] sm:w-[350px] lg:w-[400px] 
                                h-full 
                                z-20 md:z-auto
                            `}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <Sidebar
                                onSelectChat={(chat) => {
                                    setSelectedConversation(chat)
                                    if (!isDesktop) setIsSidebarOpen(false)
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Messages Container */}
                <motion.div
                    className="flex-grow h-full w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)]"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <MessagesContainer
                        selectedChat={selectedConversation}
                        onBackClick={toggleSidebar}
                        showBackButton={!isDesktop}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                </motion.div>

                {/* Overlay for Mobile */}
                <AnimatePresence>
                    {!isDesktop && isSidebarOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-10 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsSidebarOpen(false)}
                            aria-hidden="true"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default HomePage
import React, { useState } from 'react'
import MessagesContainer from '@/components/MessagesContainer'
import Sidebar from '@/components/Sidebar'

const HomePage = () => {
    const [selectedChat, setSelectedChat] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    return (
        <div className="flex h-screen w-screen  p-0 sm:p-4">
            <div className="flex w-full h-full bg-white sm:rounded-2xl overflow-hidden shadow-2xl">
                {/* Sidebar */}
                <div className={`
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    sm:translate-x-0
                    transition-transform duration-300 ease-in-out
                    fixed sm:relative 
                    w-full sm:w-[350px] lg:w-[400px] 
                    h-full 
                    z-20 sm:z-auto
                `}>
                    <Sidebar onSelectChat={(chat) => {
                        setSelectedChat(chat)
                        setIsSidebarOpen(false)
                    }} />
                </div>

                {/* Messages Container */}
                <div className="flex-grow h-full w-full sm:w-[calc(100%-350px)] lg:w-[calc(100%-400px)]">
                    <MessagesContainer
                        selectedChat={selectedChat}
                        onBackClick={toggleSidebar}
                        showBackButton={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
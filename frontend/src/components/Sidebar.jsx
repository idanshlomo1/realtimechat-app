import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Conversation from './Conversation';
import { useLogout } from '@/hooks/useLogout';
import useGetConversations from '@/hooks/useGetConversations';
import { useConversation } from '@/zustand/useConversation';
import { useSocketContext } from '@/context/SocketContext';

const LoadingSkeleton = () => (
    <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                </div>
            </div>
        ))}
    </div>
);

const Sidebar = ({ onSelectChat }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { loading: loadingLogout, logout } = useLogout();
    const { conversations, loading: loadingConversations, error } = useGetConversations();
    const { selectedConversation, setSelectedConversation } = useConversation();


    const filteredConversations = conversations?.filter(conv =>
        `${conv.firstName} ${conv.lastName} ${conv.username}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await logout();
            // After successful logout, you might want to redirect the user or update the app state
        } catch (error) {
            console.error('Logout failed:', error);
            // You might want to show an error message to the user here
        }
    };

    const handleConversationSelect = (conv) => {
        setSelectedConversation(conv);
        onSelectChat(conv);
    };

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
                    {loadingConversations ? (
                        <LoadingSkeleton />
                    ) : error ? (
                        <div className="text-center text-red-500 p-4">
                            Error: {error}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredConversations.map((conv) => (
                                <div key={conv._id} onClick={() => handleConversationSelect(conv)}>
                                    <Conversation
                                        _id={conv._id}
                                        firstName={conv.firstName}
                                        lastName={conv.lastName}
                                        username={conv.username}
                                        profilePic={conv.profilePic}
                                        isSelected={selectedConversation?._id === conv._id}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <Button
                    variant="ghost"
                    className="mt-4 w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
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
            </CardContent>
        </Card>
    );
};

export default Sidebar;
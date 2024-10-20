import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Menu } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Message from './Message';
import useSendMessage from '@/hooks/useSendMessage';
import useGetMessages from '@/hooks/useGetMessages';
import { useAuthContext } from "@/context/AuthContext";
import { useConversation } from "@/zustand/useConversation";

const MessagesContainer = ({ onBackClick }) => {
    const [messageInput, setMessageInput] = useState('');
    const { loading: sendMessageLoading, sendMessage } = useSendMessage();
    const { messages, loading: messagesLoading } = useGetMessages();
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (messageInput.trim() && selectedConversation) {
            try {
                await sendMessage(messageInput, selectedConversation._id);
                setMessageInput('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const renderMessageSkeletons = () => {
        return Array(3).fill(0).map((_, index) => (
            <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-4`}>
                <div className={`max-w-[70%] ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <Skeleton className="h-10 w-40 rounded-xl" />
                </div>
            </div>
        ));
    };

    return (
        <Card className="h-full rounded-none sm:rounded-r-2xl backdrop-blur-md bg-white/70 shadow-xl border-none overflow-hidden flex flex-col">
            <CardHeader className="border-b border-gray-200/50 p-4 flex items-center">
                <div className="flex items-center w-full">
                    <Button variant="ghost" onClick={onBackClick} className="mr-2 sm:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <div className="flex items-center flex-grow">
                        {selectedConversation && (
                            <img
                                src={selectedConversation.profilePic}
                                alt={`${selectedConversation.firstName}'s profile`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                        )}
                        <h2 className="text-xl font-semibold text-gray-800">
                            {selectedConversation ? `${selectedConversation.firstName} ${selectedConversation.lastName}` : 'ChatApp'}
                        </h2>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 overflow-hidden">
                {selectedConversation ? (
                    <ScrollArea className="h-full pr-4">
                        {messagesLoading ? (
                            renderMessageSkeletons()
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} ref={lastMessageRef}>
                                    <Message message={msg} />
                                </div>
                            ))
                        )}
                    </ScrollArea>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800">Welcome to ChatApp</h2>
                            <p className="text-gray-600 mt-2">Please select a chat to start messaging</p>
                        </div>
                    </div>
                )}
            </CardContent>
            {selectedConversation && (
                <CardFooter className="border-t border-gray-200/50 p-4">
                    <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-grow bg-white/80 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                            disabled={sendMessageLoading}
                        >
                            {sendMessageLoading ? 'Sending...' : <Send className="h-5 w-6" />}
                        </Button>
                    </form>
                </CardFooter>
            )}
        </Card>
    );
};

export default MessagesContainer;
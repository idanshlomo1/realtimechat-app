import { useState, useEffect } from 'react';
import { useConversation } from '@/zustand/useConversation'; // Assuming this gives the selectedConversation

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // If no conversation is selected, don't fetch anything
        if (!selectedConversation) return;

        const getMessages = async () => {
            setLoading(true);
            setError(null); // Reset error state before starting the fetch

            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any necessary authorization headers if needed
                    }
                });

                if (!res.ok) {
                    // If the response status is not OK (200-299), throw an error
                    throw new Error('Failed to fetch messages');
                }

                const data = await res.json();

                setMessages(data); // Set messages data

            } catch (error) {
                setError(error.message); // Capture and set any errors
            } finally {
                setLoading(false); // Always stop loading
            }
        };

        getMessages();
    }, [selectedConversation?._id]); // Corrected _idm to _id

    return { loading, messages, error }; // Return loading, messages, and error
};

export default useGetMessages;

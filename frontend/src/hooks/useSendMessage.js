import { useConversation } from '@/zustand/useConversation';
import { useState } from 'react';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Add error state
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        setError(null); // Reset error state before starting

        try {
            if (!selectedConversation) {
                throw new Error('No conversation selected');
            }

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You can add authorization headers here if required
                },
                body: JSON.stringify({ message }), // Send the message as the body
            });

            if (!res.ok) {
                // If the response status is not OK (200-299), throw an error
                throw new Error('Failed to send message');
            }

            const data = await res.json();

            // Update the messages state with the new message
            setMessages([...messages, data]);

        } catch (error) {
            setError(error.message); // Capture any errors and set the error state
        } finally {
            setLoading(false); // Always stop loading
        }
    };

    return { loading, error, sendMessage }; // Return error and loading along with sendMessage function
};

export default useSendMessage;

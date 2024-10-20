import { useState, useEffect } from 'react';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            setError(null); // Reset error state before starting the fetch
            try {
                const res = await fetch('/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    // If the response is not OK, throw an error
                    throw new Error('Failed to fetch conversations');
                }

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error); // If there's an error message from the API
                }

                setConversations(data); // Set conversations data
            } catch (error) {
                setError(error.message); // Capture the error message
            } finally {
                setLoading(false); // Always stop the loading indicator
            }
        };

        getConversations();
    }, []); // Empty dependency array means this effect runs only on mount

    return { loading, conversations, error }; // Return error in the hook return object
};

export default useGetConversations;

import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';

const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setAuthUser } = useAuthContext();

    const signIn = async (username, password) => {
        setLoading(true);
        setError(null);

        // Input validation
        if (!username || !password) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMessage = data.error || 'An error occurred during sign in.';
                throw new Error(errorMessage);
            }

            // If sign in is successful, handle the response
            console.log('Sign in successful:', data);

            // Store the user data as 'loggedInUser' in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(data));

            setAuthUser(data);

            // You might also want to return the user data for further handling in the component
            return data;

        } catch (error) {
            // Set the error message to be displayed in the frontend
            setError(error.message || 'An error occurred during sign in.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, signIn };
};

export default useSignIn;
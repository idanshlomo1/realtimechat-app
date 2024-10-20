import { useAuthContext } from '@/context/AuthContext';
import { useState } from 'react';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setAuthUser } = useAuthContext()

    const signUp = async (firstName, lastName, username, password, confirmPassword, gender) => {
        setLoading(true);
        setError(null);
        // Input validation (frontend)
        if (!firstName || !lastName || !username || !password || !confirmPassword || !gender) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        if (username.length < 3) {
            setError('Username must be at least 3 characters long.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, username, password, confirmPassword, gender }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Check if the error field exists in the response and set the error message
                const errorMessage = data.error || 'An error occurred during sign up.';
                throw new Error(errorMessage);
            }

            // If sign up is successful, handle the response
            console.log('Sign up successful:', data);

            // Store the user data as 'loggedInUser' in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(data));

            setAuthUser(data)

            // You might also want to return the user data for further handling in the component
            return data;

        } catch (error) {
            // Set the error message to be displayed in the frontend
            setError(error.message || 'An error occurred during sign up.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, signUp };
};

export default useSignUp;

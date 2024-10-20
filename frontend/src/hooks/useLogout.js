import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to log out");
            }

            // Handle any necessary cleanup here (e.g., clearing localStorage)
            localStorage.removeItem("loggedInUser");
            setAuthUser(null)

            // You can also trigger any necessary UI updates or redirection here
            console.log("Logout successful");

        } catch (error) {
            console.error("Error during logout:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, MessageCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useSignIn from '@/hooks/useSignIn'

const SignInPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loading, error, signIn } = useSignIn()
    const navigate = useNavigate()

    const handleSignIn = async (e) => {
        e.preventDefault()
        const result = await signIn(username, password)
        if (result) {
            // Redirect to the main page or dashboard after successful sign-in
            navigate('/') // Adjust this route as needed
        }
    }

    return (
        <Card className="w-full max-w-[400px] h-full sm:h-auto sm:rounded-2xl backdrop-blur-md bg-white/70 shadow-xl border-none overflow-hidden">
            <CardContent className="p-6 sm:p-8">
                <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome to ChatApp</h1>
                    <p className="text-gray-600">Sign in to continue</p>
                </div>
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                        <Input
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/80 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/80 border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive" className="rounded-xl bg-red-100 border-red-200 text-red-800">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-200 ease-in-out transform hover:scale-105"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
                {/* <div className="mt-6 text-center">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">Forgot password?</Link>
                </div> */}
            </CardContent>
            <CardFooter className="flex justify-center border-t border-gray-100 p-6">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-blue-600 font-semibold hover:text-blue-800">
                        Create an account
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}

export default SignInPage
"use client";
import { useState } from "react";

export default function Auth() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill out all required fields.");
            return;
        }

        if (isRegister && password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(
                isRegister ? "/api/register" : "/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to authenticate.");
            }

            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full ">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isRegister ? "Register" : "Login"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {isRegister && (
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    )}

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
                        {isRegister ? "Sign Up" : "Log In"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    {isRegister ? (
                        <>
                            Already have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setIsRegister(false)}
                            >
                                Log in
                            </button>
                        </>
                    ) : (
                        <>
                            Dont have an account?{" "}
                            <button
                                className="text-blue-500 underline"
                                onClick={() => setIsRegister(true)}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

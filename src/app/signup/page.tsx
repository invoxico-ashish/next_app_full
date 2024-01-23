"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSigup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response, "response")
            toast.success("Signup Sucessfull");
            setTimeout(() => {
                router.push("/login");
            }, 5000)

        } catch (error: any) {
            console.log(error, "error")
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 >{loading ? "processing...." : "signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button
                onClick={onSigup}
                className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-black text-white" >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login">click here to login</Link>
        </div>
    )
};
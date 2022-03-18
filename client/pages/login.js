import Link from "next/link";
import { useRouter } from 'next/router';
import {useRef, useState } from 'react'

import { useAuth } from "../components/Auth";


export default function login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    // Get signUp function from the auth context
    const { signIn } = useAuth()

    const history = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signIn` function from the context
        const { error } = await signIn({ email, password })

        if (error) {
        alert('error signing in')
        } else {
        // Redirect user to Dashboard
        history.push('/')
        }
    }
    return (
        <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')] ">
            <div className="flex flex-col h-screen">
                <header className="flex justify-between items-center">
                    <span className="px-5 text-xl">LOGO</span>
                    <nav className="text-sm md:text-xl py-4">
                        <ul className="flex">
                            <Link href="/sign-up">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Sign up</a>
                            </Link>
                            <Link href="/">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Home</a>
                            </Link>
                        </ul>
                    </nav>
                </header>
                
                <main className="flex items-center justify-center h-5/6">
                    <div className="w-full max-w-md">
                        <form onSubmit={handleSubmit} className="bg-slate-50/75 shadow-lg rounded-lg px-12 pt-6 pb-8 mb-4">
                            
                            <div
                            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                            >
                            Log in to Your Account
                            </div>
                            <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-normal mb-2"
                                for="username"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                v-model="form.email"
                                type="email"
                                required
                                autofocus
                                placeholder="Email"
                            />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-normal mb-2"
                                    for="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full p-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    v-model="form.password"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    required
                                    autocomplete="current-password"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
                            >Login</button>
                            </div>
                        </form>
                    </div>
                </main>
            
            </div>
        </div>
    );
}


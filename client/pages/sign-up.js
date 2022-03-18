import Link from "next/link";
import { useRouter } from 'next/router';
import {useRef, useState } from 'react'

import { useAuth } from "../components/Auth";

export default function signUp() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { signUp } = useAuth();
    
    const history = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        
        //get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // calls 'signup' function from the context
        const { error } = await signUp({ email, password })
        if (error) {
            alert('error signing in')
        } else {
            // Redirect user to Dashboard
            history.push('/')
        }
    }

    return (
        <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')] overflow-auto">
            <div className="flex flex-col h-screen">
                <header className="flex justify-between items-center  w-screen">
                    <span className="px-5 text-xl">LOGO</span>
                    <nav className="text-sm md:text-xl py-4">
                        <ul className="flex">
                            <Link href="/login">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Login</a>
                            </Link>
                            <Link href="/">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Home</a>
                            </Link>
                        </ul>
                    </nav>
                </header>
               
                <div className="flex items-center justify-center h-5/6">
                    <div div className="w-full max-w-md">
                        {/* <form onSubmit={handleSubmit} className="bg-slate-50/75 px-6 py-8 rounded-lg shadow-md text-black w-full">
                            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded-lg mb-4"
                                name="fullname"
                                placeholder="Full Name" />

                            <input 
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded-lg mb-4"
                                name="email"
                                placeholder="Email" 
                                ref={emailRef}/>

                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded-lg mb-4"
                                name="password"
                                placeholder="Password"
                                ref={passwordRef} />
                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded-lg mb-4"
                                name="confirm_password"
                                placeholder="Confirm Password" />

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>


                        </form> */}
                        <form onSubmit={handleSubmit} className="bg-slate-50/75 shadow-lg rounded-lg px-12 pt-6 pb-8 mb-4">
                            
                            <div
                            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                            >
                            Sign Up
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
                            >Create Account</button>
                            </div>
                        </form>

                        <div className="text-grey-dark mt-6 text-center">
                           <p>Already have an account? <a className="no-underline border-b border-blue text-blue" href="../login/">
                                Log in
                            </a>.</p>  
                         
                        </div>
                    </div>
                </div>
            
            
            </div>
        
        </div>
    );
}

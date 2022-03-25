import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";

import logo from '../public/images/CoffeeNotes-logos.jpeg'

import carlos from '../public/images/carlos.png'
import mateo from '../public/images/mateo.jpg'
import daryl from '../public/images/daryl.jpg'
import z from '../public/images/z.png'


export default function Home() {
    
    const aboutRef = useRef()

    function handleClick(){
        aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')] overflow-auto">
            <div className="flex flex-col">
                <header className="flex justify-end items-center fixed w-screen">
                    {/* <div className="h-14 w-14 rounded-full ml-2 mt-2">
                        <Image src={logo} alt='logo' className="h-full w-full rounded-full"/>
                    </div> */}
                    <nav className="text-sm md:text-xl py-4">
                        <ul className="flex">
                            <Link href="/login">
                                <a className="bg-white rounded-xl px-2 py-1 mr-5 hover:text-white hover:bg-transparent">Login</a>
                            </Link>
                                                       
                            <button onClick={handleClick} className="bg-white rounded-xl px-2 py-1 mr-7 hover:text-white hover:bg-transparent">About</button>
                            
                        </ul>
                    </nav>
                </header>
                <main className="flex flex-col items-center">
                    <div className="flex h-screen justify-center items-center flex-col">
                        <div className="h-14 w-14 rounded-full ml-2 mt-2">
                            <Image src={logo} alt='logo' className="h-full w-full rounded-full"/>
                        </div>
                        <h1 className="text-3xl md:text-7xl">
                            Coffee Notes
                        </h1>
                        <p className="text-xl">Brew your Thoughts</p>
                    </div>
                    <div className="w-8/12 h-fit flex items-center flex-col bg-slate-50/50 rounded-lg ">
                            <h1 ref={aboutRef} className="m-16 text-6xl">About</h1>
                            <p className="leading-9 m-10 mt-0 mb-16 w-1/2">CoffeeNotes is a full-stack application that allows students to take notes for their classes. Notes are organized by subject and include a title and content. CoffeeNotes was created as part of Chingu Voyage 37.</p>
                            <div className="items-end w-1/2 mb-10 ml-16">
                                <h3 className="text-3xl">Features</h3>
                            </div>
                            <ul className="mx-16 mb-16 list-disc leading-9 m-10 mt-0 w-1/2">
                                <li>Users are able to create and edit notes using a powerful rich text editor</li>
                                <li>Users are able to read and delete notes</li>
                                <li>Users can filter notes by subject</li>
                                <li>Users are able to sign-up, log-in and log-out</li>
                                <li>Users can view a landing page that includes information about the developers and application</li>
                            </ul>
                    </div>
                    <div className="w-8/12 h-fit flex items-center flex-col bg-slate-50/50 rounded-lg mt-32 mb-16">
                            <h1 className="m-16 md:text-6xl">Developers</h1>
                            <div className="card-group flex pb-10 flex-wrap justify-center">
                                <div className="card w-60 flex flex-col items-center text-center mx-6 mb-6">
                                    <div className="shape">
                                        <div className="circle">
                                            <Image className="rounded-full" src={carlos}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Carlos Martinez</h3>
                                        <p>Software Developer with a focus on building responsive websites and solving problems.</p>
                                    </div>
                                </div>
                                <div className="card w-60 flex flex-col items-center text-center mx-6 mb-6">
                                    <div className="shape">
                                        <div className="circle">
                                            <Image className="rounded-full" src={daryl}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Daryl Nauman</h3>
                                        <p>Full-stack web developer with an Executive MBA and leadership experience at post-secondary institutions</p>
                                    </div>
                                </div>
                                <div className="card w-60 flex flex-col items-center text-center mx-6 mb-6">
                                    <div className="shape">
                                        <div className="circle">
                                            <Image className="rounded-full" src={z}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Z</h3>
                                        <p>Web Developer</p>
                                    </div>
                                </div>
                                <div className="card  w-60 flex flex-col items-center text-center mx-6 mb-6">
                                    <div className="shape">
                                        <div className="circle">
                                            <Image className="rounded-full" src={mateo}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Mateo Cruz</h3>
                                        <p>Front End Web Developer with a background in customer service</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

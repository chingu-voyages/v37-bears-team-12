import Link from "next/link";
import React, { useRef } from "react";

export default function Home() {
    
    const aboutRef = useRef()

    function handleClick(){
        aboutRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')] overflow-auto">
            <div className="flex flex-col">
                <header className="flex justify-between items-center fixed w-screen">
                    <span className="px-5 text-xl">LOGO</span>
                    <nav className="text-sm md:text-xl py-4">
                        <ul className="flex">
                            <Link href="/login">
                                <a className="bg-white rounded-xl px-2 py-1 mr-5 hover:text-white hover:bg-transparent">Login</a>
                            </Link>
                            <Link href="/sign-up">
                                <a className="bg-white rounded-xl px-2 py-1 mr-5 hover:text-white hover:bg-transparent">Sign up</a>
                            </Link>
                            
                            <button onClick={handleClick} className="bg-white rounded-xl px-2 py-1 mr-7 hover:text-white hover:bg-transparent">About</button>
                            
                        </ul>
                    </nav>
                </header>
                <main className="flex flex-col items-center">
                    <div className="flex h-screen justify-center items-center ">
                        <h1 className="text-3xl md:text-7xl">
                            Whatever Note
                        </h1>
                    </div>
                    <div className="w-9/12 h-fit flex items-center flex-col bg-slate-50/50 rounded-lg ">
                            <h1 ref={aboutRef} className="m-16 md:text-6xl">About</h1>
                            <p className="leading-9 m-10 mt-0 mb-16">Nunc leo lorem, consectetur eget pharetra id, blandit a leo. Praesent ut dolor ut ipsum mattis vehicula. Aenean tincidunt, orci non laoreet sagittis, libero ligula malesuada mauris, eget tempus nulla ligula a sapien. Sed nec libero ultrices, mollis libero a, tempus nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis diam ipsum, eu pharetra dui blandit at. Quisque tempor elit condimentum nisi fermentum aliquam. Donec sodales erat nisi, vitae luctus libero cursus ut. In ac tempor ligula, vitae laoreet dolor. Pellentesque varius, purus vel euismod maximus, arcu lectus ullamcorper urna, et venenatis enim ipsum rutrum arcu. Nunc scelerisque, justo eget tincidunt vulputate, odio lacus egestas justo, id consequat risus leo vel risus. Vestibulum porta purus lectus, ut condimentum risus pharetra vel. Aliquam tempus volutpat ullamcorper. Nam vitae eleifend elit, non tempor nunc. Vestibulum a lorem sed dui hendrerit hendrerit.</p>
                    </div>
                    <div className="w-9/12 h-fit flex items-center flex-col bg-slate-50/50 rounded-lg mt-32 mb-16">
                            <h1 className="m-16 md:text-6xl">Developers</h1>
                            <div className="card-group flex pb-10 flex-wrap justify-center">
                                <div className="card w-1/4 flex flex-col items-center text-center m-2">
                                    <div className="shape">
                                        <div className="circle">
                                            <img className="rounded-full" src="https://via.placeholder.com/150"/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Developer</h3>
                                        <p>Donec semper dapibus commodo. Curabitur ac leo mauris. Curabitur eleifend, lorem vel suscipit auctor, velit dui ultricies est, eu ornare lorem risus et turpis. .</p>
                                    </div>
                                </div>
                                <div className="card  w-1/4 flex flex-col items-center text-center m-2 ">
                                    <div className="shape">
                                        <div className="circle">
                                            <img className="rounded-full" src="https://via.placeholder.com/150"/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Developer</h3>
                                        <p>Donec semper dapibus commodo. Curabitur ac leo mauris. Curabitur eleifend, lorem vel suscipit auctor, velit dui ultricies est, eu ornare lorem risus et turpis. .</p>
                                    </div>
                                </div>
                                <div className="card w-1/4 flex flex-col items-center text-center m-2">
                                    <div className="shape">
                                        <div className="circle">
                                            <img className="rounded-full" src="https://via.placeholder.com/150"/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Developer</h3>
                                        <p>Donec semper dapibus commodo. Curabitur ac leo mauris. Curabitur eleifend, lorem vel suscipit auctor, velit dui ultricies est, eu ornare lorem risus et turpis. .</p>
                                    </div>
                                </div>
                                <div className="card  w-1/4 flex flex-col items-center text-center m-2">
                                    <div className="shape">
                                        <div className="circle">
                                            <img className="rounded-full" src="https://via.placeholder.com/150"/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="m-4 md:text-2xl">Developer</h3>
                                        <p>Donec semper dapibus commodo. Curabitur ac leo mauris. Curabitur eleifend, lorem vel suscipit auctor, velit dui ultricies est, eu ornare lorem risus et turpis. .</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

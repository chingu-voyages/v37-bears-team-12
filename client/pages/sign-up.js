import Link from "next/link";

export default function signUp() {
    return (
        <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')] overflow-auto">
            <div className="flex flex-col h-screen">
                <header className="flex justify-between items-center">
                    <span className="px-5 text-xl">LOGO</span>
                    <nav className="text-sm md:text-xl py-4">
                        <ul className="flex">
                            <Link href="/login">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Login</a>
                            </Link>
                            <Link href="/about">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">About</a>
                            </Link>
                        </ul>
                    </nav>
                </header>
               
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-slate-50/75 px-6 py-8 rounded-lg shadow-md text-black w-full">
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
                                placeholder="Email" />

                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded-lg mb-4"
                                name="password"
                                placeholder="Password" />
                            <input 
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded-lg mb-4"
                                name="confirm_password"
                                placeholder="Confirm Password" />

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>


                        </div>

                        <div className="text-grey-dark mt-6">
                            Already have an account?  
                            <a className="no-underline border-b border-blue text-blue" href="../login/">
                                Log in
                            </a>.
                        </div>
                    </div>
                </div>
            
            
            </div>
        
        </div>
    );
}

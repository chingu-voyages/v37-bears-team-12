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
                            <Link href="/sign-up">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Sign up</a>
                            </Link>
                        </ul>
                    </nav>
                </header>
                <main>
                    
                </main>
            
            
            </div>
        
        </div>
    );
}

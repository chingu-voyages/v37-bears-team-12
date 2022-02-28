import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')]">
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
                            <Link href="/about">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">About</a>
                            </Link>
                        </ul>
                    </nav>
                </header>
                <main className="flex justify-center h-full ">
                    <h1 className="text-3xl md:text-7xl mt-60">
                        Whatever Note
                    </h1>
                </main>
            </div>
        </div>
    );
}

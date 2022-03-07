import Link from "next/link";

export default function login() {
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
                            <Link href="/about">
                                <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">About</a>
                            </Link>
                        </ul>
                    </nav>
                </header>
                
                <main class="flex items-center justify-center h-5/6">
                    <div class="w-full max-w-md">
                        <form class="bg-slate-50/75 shadow-lg rounded-lg px-12 pt-6 pb-8 mb-4">
                            
                            <div
                            class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                            >
                            Log in to Your Account
                            </div>
                            <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-normal mb-2"
                                for="username"
                            >
                                Email
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                v-model="form.email"
                                type="email"
                                required
                                autofocus
                                placeholder="Email"
                            />
                            </div>
                            <div class="mb-6">
                                <label
                                    class="block text-gray-700 text-sm font-normal mb-2"
                                    for="password"
                                >
                                    Password
                                </label>
                                <input
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    v-model="form.password"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    required
                                    autocomplete="current-password"
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Sign In</button>
                            </div>
                        </form>
                    </div>
                </main>
            
            </div>
        </div>
    );
}


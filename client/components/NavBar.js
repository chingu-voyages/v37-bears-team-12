import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { HomeIcon, DocumentIcon, DocumentAddIcon, InformationCircleIcon, LogoutIcon } from '@heroicons/react/solid'
import logo from '../public/images/CoffeeNotes-logos.jpeg'
import Image from "next/image";
import { useRouter } from "next/router";

export default function NavBar() {
    
    const router = useRouter();
    
    const signOut = () => {
        supabase.auth.signOut()
        router.push("/")
    }

    return (
        <aside className="content-between md:w-72 bg-[#A49EA2] ">
            <div className="text-white flex flex-col md:fixed">
                <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full ml-2 mt-2">
                        <Image src={logo} alt='logo' className="h-full w-full rounded-full"/>
                    </div>
                    <h2 className="text-3xl mb-4 ml-4 mt-6 whitespace-normal">Coffee Notes</h2>
                </div>
                <ul className="flex flex-col">
                    <Link href="/dashboard">
                        <a className="underline pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><HomeIcon className="h-6 w-6 mr-2"/> Dashboard</a>
                    </Link>
                    <Link href="/notes">
                        <a className="underline pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><DocumentIcon className="h-6 w-6 mr-2"/>Notes</a>
                    </Link>
                    <Link href='/create'>
                        <a className="underline pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><DocumentAddIcon className="h-6 w-6 mr-2"/>Add a Note</a>
                    </Link>
                    
                    <li className="pl-4 mb-3 text-lg h-11 flex items-center rounded-lg hover:bg-black hover:opacity-25 cursor-pointer" onClick={signOut}><LogoutIcon className="h-6 w-6 mr-2 mt-1"/>Sign Out</li>
                </ul>
            </div>
        </aside>
    );
}

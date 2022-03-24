import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { HomeIcon, DocumentIcon, DocumentAddIcon, InformationCircleIcon, LogoutIcon } from '@heroicons/react/solid'

export default function NavBar() {
    return (
        <aside className="content-between md:w-72 bg-[#A49EA2] ">
            <div className="text-white flex flex-col w-fit md:fixed">
                <h2 className="text-3xl mb-4 ml-4 mt-6 whitespace-normal">Whatever Note</h2>
                <h3 className="mb-4 text-2xl ml-4 whitespace-normal">User Name</h3>
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
                    
                    <li className="pl-4 mb-3 text-lg h-11 flex items-center rounded-lg hover:bg-black hover:opacity-25" onClick={() => supabase.auth.signOut()}><LogoutIcon className="h-6 w-6 mr-2 mt-1"/>Sign Out</li>
                </ul>
            </div>
        </aside>
    );
}

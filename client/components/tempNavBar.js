import Link from "next/link";
import { HomeIcon, DocumentIcon, DocumentAddIcon, InformationCircleIcon, LogoutIcon } from '@heroicons/react/solid'

export default function TempNavBar() {
    return (
        <aside className="content-between md:w-2/12 bg-[#A49EA2]">
            <div className="text-white flex flex-col">
                <h2 className="text-3xl mb-4 ml-4 mt-6">Whatever Note</h2>
                <h3 className="mb-4 text-2xl ml-4 ">User Name</h3>
                <ul className="flex flex-col">
                    <Link href="/dashboard">
                        <a className="underline pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><HomeIcon className="h-6 w-6 mr-2"/> Dashboard</a>
                    </Link>
                    <Link href="/notes">
                        <a className="underline pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><DocumentIcon className="h-6 w-6 mr-2"/>Notes</a>
                    </Link>
                    <li className="pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><DocumentAddIcon className="h-6 w-6 mr-2"/>Add a Note</li>
                    <Link href="/about">
                        <a className="underline pl-4 mb-3 text-lg h-11 rounded-lg flex items-center hover:bg-black hover:opacity-25"><InformationCircleIcon className="h-6 w-6 mr-2 "/>About</a>
                    </Link>
                    <li className="pl-4 mb-3 text-lg h-11 flex items-center rounded-lg hover:bg-black hover:opacity-25"><LogoutIcon className="h-6 w-6 mr-2 mt-1"/>Sign Out</li>
                </ul>
            </div>
        </aside>
    );
}

import Link from "next/link";
import { HomeIcon, DocumentIcon, DocumentAddIcon, InformationCircleIcon, LogoutIcon } from '@heroicons/react/solid'

export default function TempNavBar() {
    return (
        <aside className="border-2 border-black md:h-screen md:w-2/12 bg-[#A49EA2]">
            <div className="ml-4 mt-6 text-white">
                <h2 className="text-3xl mb-4">Whatever Note</h2>
                <h3 className="mb-4 text-2xl">User Name</h3>
                <ul className="flex flex-col">
                    <Link href="/dashboard">
                        <a className="underline mb-3 text-lg flex"><HomeIcon className="h-6 w-6 mr-2"/> Dashboard</a>
                    </Link>
                    <Link href="/notes">
                        <a className="underline mb-3 text-lg flex"><DocumentIcon className="h-6 w-6 mr-2"/>Notes</a>
                    </Link>
                    <li className="mb-3 text-lg flex"><DocumentAddIcon className="h-6 w-6 mr-2"/>Add a Note</li>
                    <Link href="/about">
                        <a className="underline mb-3 text-lg flex"><InformationCircleIcon className="h-6 w-6 mr-2 "/>About</a>
                    </Link>
                    <li className="mb-3 text-lg flex"><LogoutIcon className="h-6 w-6 mr-2 mt-1"/>Sign Out</li>
                </ul>
            </div>
        </aside>
    );
}

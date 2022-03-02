import Link from "next/link";

export default function TempNavBar() {
    return (
        <aside className="border-2 border-black md:h-screen md:w-2/12">
            <h2 className="text-black">Whatever Note</h2>
            <h3>User Name</h3>
            <ul className="flex flex-col">
                <Link href="/dashboard">
                    <a className="text-blue-900 underline">Dashboard</a>
                </Link>
                <Link href="/notes">
                    <a className="text-blue-900 underline">Notes</a>
                </Link>
                <li>Add a Note</li>
                <Link href="/about">
                    <a className="text-blue-900 underline">About</a>
                </Link>
                <li>Sign Out</li>
            </ul>
        </aside>
    );
}

import Link from "next/link";

export default function login() {
    return (
        <>
            <h1>This is the login page</h1>
            <Link href="/">
                <a className="text-blue-900 underline">Return home</a>
            </Link>
        </>
    );
}

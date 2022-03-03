import Link from "next/link";

export default function signUp() {
    return (
        <>
            <h1>This is the sign up page</h1>
            <Link href="/">
                <a className="text-blue-900 underline">Return home</a>
            </Link>
        </>
    );
}

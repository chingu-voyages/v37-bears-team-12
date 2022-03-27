import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GreetingDate from "../../components/greetingDate";
import NavBar from "../../components/NavBar";
import Link from "next/link";

export default function Note() {
    const router = useRouter();
    const { id } = router.query;

    const [note, setNote] = useState();
    const [loggedIn, setLoggedIn] = useState(false);

    // Check for token to see if logged in then get note
    useEffect(() => {
        let accessToken = localStorage.getItem("supabase.auth.token");
        if (accessToken === null) {
            router.push("/");
        } else {
            setLoggedIn(true);
            getNote();
        }
    }, []);

    const getNote = async () => {
        if (id) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: JSON.parse(
                            localStorage.getItem("supabase.auth.token")
                        ).currentSession["access_token"],
                    },
                }
            );
            const response = await res.json();
            setNote(response.data);
        } else {
            console.log("no note id");
        }
    };

    return (
        <>
            {loggedIn && note && (
                <div>
                    <div className="flex flex-col md:flex-row">
                        <NavBar />
                        <main className="md:w-full bg-cover bg-[url('/images/coffee-notebook.jpg')] min-h-screen">
                            <GreetingDate />
                            <div className="w-11/12 mx-auto text-left text-black bg-white opacity-75 rounded-3xl p-2">
                                <h1 className="text-2xl">{note.title}</h1>
                                {/* <Link href={`/notes/edit/${id}`}>
                                    <a className="text-blue-700 underline">
                                        Edit Note
                                    </a>
                                </Link> */}
                            </div>
                            <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto my-1 p-2">
                                <h2 className="font-semibold">
                                    Subject: {note.subject}
                                </h2>
                                <h2 className="font-medium">
                                    Date:{" "}
                                    {new Date(
                                        note.created_at
                                    ).toLocaleDateString("en-US")}
                                </h2>
                                <div id="content">{note.content}</div>
                            </section>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}

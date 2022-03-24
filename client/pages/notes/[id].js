import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GreetingDate from "../../components/greetingDate";
import NavBar from "../../components/NavBar";
import Link from "next/link";

export default function Note() {
    const router = useRouter();
    const { id } = router.query;
    const [note, setNote] = useState();

    useEffect(() => {
        const fetchFromAPI = async () => {
            const res = await fetch(
                `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes?id=eq.${id}&select=*`,
                {
                    method: "GET",
                    headers: {
                        apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                    },
                }
            );
            const data = await res.json();
            setNote(data[0]);

            let element = document.getElementById("content");
            let newContent = data[0].content;
            element.innerHTML = newContent;
        };

        if (id) {
            fetchFromAPI();
        }
    }, [id]);

    return (
        <>
            {note && (
                <div>
                    <div className="flex flex-col md:flex-row">
                        <NavBar />
                        <main className="md:w-full bg-cover bg-[url('/images/coffee-notebook.jpg')] min-h-screen">
                            <GreetingDate />
                            <div className="w-11/12 mx-auto text-left text-black bg-white opacity-75 rounded-3xl p-2">
                                <h1 className="text-2xl">
                                    {note.title}
                                </h1>
                                <Link href={`/notes/edit/${id}`}>
                                    <a className="text-blue-700 underline">Edit Note</a>
                                </Link>
                            </div>
                            <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto my-1 p-2">
                                <h2 className="font-semibold">Subject: {note.subject}</h2>
                                <h2 className="font-medium">Date: {new Date(note.created_at).toLocaleDateString("en-US")}</h2>
                                <div id="content"></div>
                            </section>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}

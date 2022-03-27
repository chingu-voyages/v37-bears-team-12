import NoteCard from "../components/noteCard";
import GreetingDate from "../components/greetingDate";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function dashboard({ data }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [notes, setNotes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        let accessToken = localStorage.getItem("supabase.auth.token");
        if (accessToken === null) {
            router.push("/");
        } else {
            setLoggedIn(true);
        }
    }, []);

    useEffect(async () => {
        if (loggedIn) {
            let url = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: JSON.parse(
                        localStorage.getItem("supabase.auth.token")
                    ).currentSession["access_token"],
                },
            });
            const response = await res.json();
            setNotes(response.data);
        }
    });

    let sortedNotes = [];

    // if more than one note, sort notes by created date with newest notes at the start of the array
    if (notes.length > 1) {
        sortedNotes = notes.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    } else {
        sortedNotes = notes;
    }

    // create an array with only four notes to display on the dashboard
    let recentNotes = [];
    if (notes.length > 4) {
        for (let i = 0; i < 4; i++) {
            recentNotes[i] = notes[i];
        }
    } else {
        recentNotes = notes;
    }

    return (
        <>
            {loggedIn && (
                <div className="flex flex-col md:flex-row">
                    <NavBar />

                    <main className="md:w-full bg-cover bg-[url('/images/coffee-notebook.jpg')] min-h-screen">
                        <GreetingDate />

                        <h1 className="w-11/12 mx-auto text-center text-black bg-white opacity-75 rounded-3xl text-2xl p-2">
                            Recent Notes
                        </h1>

                        <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto my-8">
                            <div className="flex flex-wrap justify-around">
                                {recentNotes.map((note) => (
                                    <NoteCard
                                        key={note.id}
                                        id={note.id}
                                        created_at={note.created_at}
                                        title={note.title}
                                        subject={note.subject}
                                        content={note.content}
                                    />
                                ))}
                            </div>
                        </section>
                    </main>
                </div>
            )}
        </>
    );
}

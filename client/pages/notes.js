import GreetingDate from "../components/greetingDate";
import NoteCard from "../components/noteCard";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

export default function notes() {
    
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        let accessToken = localStorage.getItem("supabase.auth.token");
        if (accessToken === null) {
            window.location.assign("/");
        } else {
            setLoggedIn(true);
            accessToken = JSON.parse(accessToken);
            let user_id = accessToken.currentSession.user.id;
        }
    }, []);

    const [notes, setNotes] = useState([]);
    const [subject, setSubject] = useState('*');

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    useEffect(async () => {
        let url;
        if (subject === '*') {
            url = `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes`
        } else {
            url = `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes?subject=eq.${subject}&select=*`
        }
        
        const res = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                },
            }
        );
        const data = await res.json();        
        setNotes(data);
    },[subject]);

    return (
        <>
        {loggedIn && (
        <div className="flex flex-col md:flex-row">
            <NavBar />

            <main className="md:w-full bg-cover bg-[url('/images/coffee-notebook.jpg')] min-h-screen">
                <GreetingDate />

                <section className="w-11/12 mx-auto text-black bg-white opacity-75 rounded-3xl text-2xl p-2">
                    <h1 className="text-center">Notes</h1>

                    <label className="text-base block">
                        Filter by subject:
                        <select
                            className="text-left"
                            id="subjects"
                            name="subjects"
                            onChange={handleSubjectChange}
                        >
                            <option value="*">All</option>
                            <option value="Biology">Biology</option>
                            <option value="Calculus">Calculus</option>
                            <option value="History">History</option>
                            <option value="Physics">Physics</option>
                            <option value="English">English</option>
                        </select>
                    </label>
                </section>
                
                <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto mt-10 p-3">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            id={note.id}
                            created_at={note.created_at}
                            title={note.title}
                            subject={note.subject}
                            content={note.content}
                        />
                    ))}
                </section>
            </main>
        </div>)
        }
        </>
    );
}

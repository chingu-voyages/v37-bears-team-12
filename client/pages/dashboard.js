import NoteCard from "../components/noteCard";
import GreetingDate from "../components/greetingDate";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

export default function dashboard({ data }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [notes, setNotes] = useState([]);

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

    useEffect(async () => {
        // let url = `https://chingu-notes-app.herokuapp.com/notes`
        let url = `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes`
        const res = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    // Authorization: JSON.parse(localStorage.getItem('supabase.auth.token')).currentSession['access_token']
                    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                },
            }
        );
        const response = await res.json();      
        // const data = response.data;
        console.log(response)
        setNotes(response);
    },[]);

    // const notes = data;
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

// export async function getServerSideProps(context) {
//     // Fetch data from external API
//     // let Auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQ4MjMyODU4LCJzdWIiOiIzZWM1Yjg5ZC0xMjk3LTRhZWMtYTAxNC01NjY0ZGI4ZTgyZjMiLCJlbWFpbCI6ImRhcnlsbmF1bWFuQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.-elq8shhnlPG8c0UZ0YCeR12pWZm5KnO9C-WVnAthWM'
//     let accessToken = localStorage.getItem("supabase.auth.token");
//     accessToken = JSON.parse(accessToken);

//     const res = await fetch(
//         // `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes`,
//         `https://chingu-notes-app.herokuapp.com/notes`,
//         {
//             method: "GET",
//             headers: {
//                 // apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//                 Authorization: accessToken
//             },
//         }
//     );
//     const data = await res.json();
//         console.log(data)
//     // Pass data to the page via props
//     return { props: { data } };
// }

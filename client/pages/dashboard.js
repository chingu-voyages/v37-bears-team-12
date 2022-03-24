import NoteCard from "../components/noteCard";
import GreetingDate from "../components/greetingDate";
import NavBar from "../components/NavBar";

export default function dashboard({data}) {
    
    const notes = data;
    let sortedNotes = [];

    // if more than one note, sort notes by created date with newest notes at the start of the array
    if (notes.length > 1) {
        sortedNotes = notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
        sortedNotes = notes;
    }
    
    // create an array with only four notes to display on the dashboard
    let recentNotes = [];
    if (sortedNotes.length > 4) {
        for (let i = 0; i < 4; i++) {
            recentNotes[i] = sortedNotes[i];
        }
    } else {
        recentNotes = sortedNotes;
    }

    return (
        <div className="flex flex-col md:flex-row">
            <NavBar />

            <main className="md:w-full bg-cover bg-[url('/images/coffee-notebook.jpg')] min-h-screen">
                <GreetingDate />

                <h1 className="w-11/12 mx-auto text-center text-black bg-white opacity-75 rounded-3xl text-2xl p-2">
                    Recent Notes
                </h1>

                <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto my-8">
                    <div className="flex flex-wrap justify-around">
                    {recentNotes.map(note => (
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
    );
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const res = await fetch(
        `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes`,
        {
            method: "GET",
            headers: {
                apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            },
        }
    );
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
}
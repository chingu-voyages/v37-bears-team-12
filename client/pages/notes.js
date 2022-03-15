import GreetingDate from "../components/greetingDate";
import NotesCard from "../components/notesCard";
import TempNavBar from "../components/tempNavBar";

export default function notes({ data }) {
    const notes = data;
    
    return (
        <div className="flex flex-col md:flex-row">
            <TempNavBar />

            <main className="md:w-10/12 bg-cover bg-[url('/images/coffee-notebook.jpg')]">
                <GreetingDate />

                <h1 className="w-11/12 mx-auto text-center text-black bg-white opacity-75 rounded-3xl text-2xl p-2">
                    Notes
                </h1>
                <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto mt-10 p-3">
                   
                    {notes.map(note => (
                        <NotesCard
                            key={note.id}
                            id={note.id}
                            created_at={note.created_at}
                            title={note.title}
                            content={note.content}
                        />
                    ))}

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

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import NavBar from "../../../components/NavBar";
import { useEffect, useState } from "react";

export default function edit({ data, id }) {
    const theme = "snow";

    const [note, setNote] = useState(data[0]);
    const [title, setTitle] = useState(data[0].title);
    const [subject, setSubject] = useState(data[0].subject);
    // const [user_id, setUser_id] = useState(data[0].user_id); // Using token for user_id
    const [created_at, setCreated_at] = useState(data[0].created_at);

    const { quill, quillRef } = useQuill({ theme });

    const [loggedIn, setLoggedIn] = useState(false);
    let user_id;

    useEffect(() => {
        let accessToken = localStorage.getItem("supabase.auth.token");
        if (accessToken === null) {
            window.location.assign("/");
        } else {
            setLoggedIn(true);
            accessToken = JSON.parse(accessToken);
            user_id = accessToken.currentSession.user.id;
        }
    }, []);

    console.log("data[0].content:", data[0].content);

    useEffect(() => {
        if (quill) {
            quill.setContents({
                ops: [{ insert: data[0].content }],
            });
        }
    });

    function handleSubmit(e) {
        e.preventDefault();

        let content = quill.getText();

        let data = {
            id: id,
            user_id: user_id,
            title: title,
            content: content,
            subject: subject,
            created_at: created_at,
            updated_at: new Date(),
        };

        console.log("data", data);

        // Submit updated data to database
        fetch(
            `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes?id=eq.${id}`,
            // `https://chingu-notes-app.herokuapp.com/notes/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                    // Authorization: JSON.parse(localStorage.getItem('supabase.auth.token')).currentSession['access_token']
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    }

    return (
        <>
            {loggedIn && (
                <div className="flex flex-col md:flex-row">
                    <NavBar />
                    <main className="w-full h-screen">
                        {!note ? (
                            <div>
                                <h1>Note is loading</h1>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="h-full w-full relative"
                            >
                                <div className="h-1/6 text-2xl">
                                    <div className="h-1/2 flex items-center ">
                                        <input
                                            className="h-full w-full placeholder-shown:text-2xl focus:outline-none"
                                            type="text"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            placeholder={note.title}
                                        />
                                    </div>
                                    <div className="h-1/2 flex items-center">
                                        <select
                                            className="h-full w-full text-gray-500 focus:outline-none"
                                            id="subject"
                                            value={subject || ""}
                                            onChange={(e) =>
                                                setSubject(e.target.value)
                                            }
                                        >
                                            <option
                                                value="DEFAULT"
                                                disabled
                                                hidden
                                            >
                                                Choose a subject
                                            </option>
                                            <option value="Biology">
                                                Biology
                                            </option>
                                            <option value="Calculus">
                                                Calculus
                                            </option>
                                            <option value="History">
                                                History
                                            </option>
                                            <option value="Physics">
                                                Physics
                                            </option>
                                            <option value="English">
                                                English
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="h-[79%] w-full relative">
                                    <div ref={quillRef} className="h-full" />
                                </div>
                                <button
                                    type="submit"
                                    value="submit"
                                    className="absolute bottom-0 right-0 mb-24 mr-24 px-8 py-6 bg-green-500 hover:bg-green-700 text-lg font-bold shadow shadow-black rounded-full "
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                    </main>
                </div>
            )}
        </>
    );
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const { id } = context.query;

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

    // Pass data to the page via props
    return { props: { data, id } };
}

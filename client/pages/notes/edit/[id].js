import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import NavBar from "../../../components/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function edit() {
    const theme = "snow";
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("DEFAULT");
    const { quill, quillRef } = useQuill({ theme });

    const router = useRouter();
    const { id } = router.query;
    const [note, setNote] = useState();

    // Get note from the database
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
            console.log("data: ", data);
            setNote(data[0]);
        };

        if (id) {
            fetchFromAPI();
        }
    }, [id]);

    // quill.setContents([
    //     { insert: 'Hello ' },
    //   ]);

    useEffect(() => {
        if (quill) {
            quill.on("text-change", (delta, oldDelta, source) => {
                console.log("Text change!");
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // Get innerHTML using quill
                // content = quill.root.innerHTML;
                // content = quill.getContents();
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
    }, [quill]);

    function handleSubmit(e) {
        e.preventDefault();

        let content = quill.getText();

        let data = {
            title: title,
            subject: subject,
            content: content,
            user_id: 1,
        };

        // Submit updated data to database
        fetch(
            `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes?id=eq.${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                },
                body: JSON.stringify(data),
            }
        )
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    }

    return (
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
                                    value={note.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={note.title}
                                />
                            </div>
                            <div className="h-1/2 flex items-center">
                                <select
                                    className="h-full w-full text-gray-500 focus:outline-none"
                                    id="subject"
                                    value={note.subject || ''}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    <option value="DEFAULT" disabled hidden>
                                        Choose a subject
                                    </option>
                                    <option value="Biology">Biology</option>
                                    <option value="Calculus">Calculus</option>
                                    <option value="History">History</option>
                                    <option value="Physics">Physics</option>
                                    <option value="English">English</option>
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
    );
}

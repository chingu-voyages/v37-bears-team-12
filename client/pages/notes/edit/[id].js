import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import NavBar from "../../../components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function edit() {
    const theme = "snow";
    const router = useRouter();
    let { id } = router.query;
    
    const { quill, quillRef } = useQuill({ theme });
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [note, setNote] = useState();
    const [title, setTitle] = useState();
    const [subject, setSubject] = useState();
    
    // check localStorage to see if token is present if so get note
    useEffect(() => {
        let accessToken = localStorage.getItem("supabase.auth.token");
        if (accessToken === null) {
            router.push("/");
        } else {
            setLoggedIn(true);
            console.log('id within access_token useEffect', id)
            getNote(id);
        }
    }, [id]);

    const getNote = async (id) => {
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
            setQuillContents();
        } else {
               console.log("no note id");
        }
    };
    
    function setQuillContents () {
        if (quill) {
            quill.setContents({
                ops: [{ insert: note.content }],
            });
        }
    }    

    function handleSubmit(e) {
        e.preventDefault();

        // let content = quill.getText();
        let content = 'This is hard coded content to test a function'

        let data = {
            id: id,
            // user_id: user_id,
            title: title,
            content: content,
            subject: subject,
            // created_at: created_at,
            // updated_at: new Date(),
        };

        console.log("handle submit data", data);

        // Submit updated data to database (PUT)
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: JSON.parse(localStorage.getItem('supabase.auth.token')).currentSession['access_token']
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
            {loggedIn && note && (
                <div className="flex flex-col md:flex-row">
                    <NavBar />
                    <main className="w-full h-screen">
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
                                            value={note.subject || ""}
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
                        
                    </main>
                </div>
            )}
        </>
    );
}
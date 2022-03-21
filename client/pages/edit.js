import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import NavBar from "../components/NavBar";
import { useEffect } from "react";

export default function edit() {
    const { quill, quillRef } = useQuill();
    let content = "";

    useEffect(() => {
        if (quill) {
            quill.on("text-change", (delta, oldDelta, source) => {
                // console.log('Text change!');
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // Get innerHTML using quill
                // content = quill.root.innerHTML;
                content = quill.getText();
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
    }, [quill]);

    function handleSubmit() {
        let data = {
            title: "test title on Wednesday late afternoon",
            content: content,
            user_id: 1,
        };

        // Post data to database
        fetch(`https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    }

    return (
        <div className="flex flex-col md:flex-row">
            <NavBar />
            <main className="w-full h-screen">

                <form onSubmit={handleSubmit} className="h-full w-full relative">
                    <div className="h-1/6 text-2xl">
                        <div className="h-1/2 flex items-center ">
                            
                            <input className="h-full w-full placeholder-shown:text-2xl" type="text" id="title" placeholder="Enter Title"/>
                        </div>
                        <div className="h-1/2 flex items-center">
                            <select className="h-full w-full text-gray-500"  id="subject">
                                <option value="" disabled selected hidden>Choose a subject</option>
                                
                                <option value="Biology">Biology</option>
                                <option value="Calculus">Calculus</option>
                                <option value="History">History</option>
                                <option value="Physics">Physics</option>
                                <option value="English">English</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[79%] w-full relative">
                        <div ref={quillRef} className="h-full"/>
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 mb-24 mr-24 px-8 py-6 bg-red-500 hover:bg-red-700 rounded-full ">
                        Submit
                    </button>
                </form>




            </main>
        </div>
    );
}

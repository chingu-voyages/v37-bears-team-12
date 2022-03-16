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
            <main className="w-full">
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>

                <div className="h-screen w-full">
                    <div ref={quillRef} className="w-full" />
                </div>
            </main>
        </div>
    );
}

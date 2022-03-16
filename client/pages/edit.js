import{ useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css';
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import NavBar from "../components/NavBar";
import { useEffect } from 'react';


export default function edit() {
    const { quill, quillRef } = useQuill();
    let content = '';

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
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
        console.log(content)
        // Fetch data from external API
        fetch(
            `https://bwnxxxhdcgewlvmpwdkl.supabase.co/rest/v1/notes`,
            {
                method: "POST",
                body:  JSON.stringify("content"),
                // body: {title: JSON.stringify("title sample"),
                // content: JSON.stringify("Paragraph sample text"),
                // user_id: 1},
                headers: {"Content-type": "application/json; charset=UTF-8",
                apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }

    return (
        
        <div className="flex flex-col md:flex-row">
            <NavBar />
            <main className='w-full'>
                <button type='button' onClick={handleSubmit}>Submit</button>

                <div className='h-screen w-full'>
                    <div ref={quillRef} className='w-full'/>
                </div>
            </main>
        </div>
    );
}


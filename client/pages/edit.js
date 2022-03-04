import{ useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css';
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import TempNavBar from "../components/tempNavBar";


export default function edit() {
    const { quill, quillRef } = useQuill();

    console.log(quill);
    console.log(quillRef)

    return (
        
        <div className="flex flex-col md:flex-row w-full">
            <TempNavBar />
            <main className='w-full'>
                <div className='h-screen w-max w-full'>
                    <div ref={quillRef} />
                </div>
            </main>
        </div>
    );
}
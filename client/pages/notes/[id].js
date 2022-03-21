import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Note() {
    const router = useRouter();
    const { id } = router.query;

    const [note, setNote] = useState();

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
            console.log(data)
            setNote(data[0]);
        };
        
        if (id) {
            fetchFromAPI();
        }

    }, [id]);

    return (
        <>
            {note && 
            <div>
                <h1>Title: {note.title}</h1>
                <p>Note: {note.id}</p>
            </div>
            }
        </>
    );
}

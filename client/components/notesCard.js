import Link from "next/link";

export default function NotesCard({ id, title, created_at, content }) {
    let contentPreview;
    if (content.length > 250) {
        contentPreview = content.slice(0, 250) + " ...";
    } else {
        contentPreview = content;
    }

    let date = new Date(created_at);
    date = date.toLocaleDateString("en-US");

    return (
        <div className="text-white my-5 m-3 p-3 mx-auto w-11/12 bg-gray-500 rounded-2xl transition duration-700 ease-in-out hover:bg-gray-700 hover:scale-105">
            <Link href={`/notes/${id}`}>
                <a className= "hover:font-semibold">{title}</a>
            </Link>
            <h3 className="">{date}</h3>
            <p>{contentPreview}</p>
        </div>
    );
}

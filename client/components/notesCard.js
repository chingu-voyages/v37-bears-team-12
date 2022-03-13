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
        <div className="my-5 m-3 p-3 mx-auto w-11/12 bg-gray-500 hover:bg-gray-700 hover:scale-105 hover:text-white rounded-2xl">
            <Link href={`/notes/${id}`}>
                <a>{title}</a>
            </Link>
            <h3 className="">Date: {date}</h3>
            <p>{contentPreview}</p>
        </div>
    );
}

export default function DashboardCard({ noteDate, noteTitle }) {
    return (
        <div className="my-3 mx-1 w-3/4 md:w-3/12 xl:w-1/12 bg-gray-500 rounded-2xl">
            <h3 className="pt-2 px-2 text-black text-center">{noteDate}</h3>
            <h2 className="py-1 px-2 text-black text-center">{noteTitle}</h2>
        </div>
    );
}

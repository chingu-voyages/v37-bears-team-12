export default function DashboardCard({ id, title, created_at }) {
    
    let date = new Date(created_at);
    date = date.toLocaleDateString("en-US");
    
    return (
        <div key={id} className="my-3 mx-1 w-9/12 md:w-3/12 lg:w-2/12 bg-gray-500 hover:bg-gray-700 hover:scale-105 hover:text-white rounded-2xl">
            <h2 className="pt-1 text-center text-large font-bold">{title}</h2>
            <h3 className="pb-1 text-center font-semibold">{date}</h3>
        </div>
    );
}

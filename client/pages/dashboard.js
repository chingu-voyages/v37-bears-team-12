import Link from "next/link";
import DashboardCard from "../components/dashboardCard";


export default function dashboard() {
    let date = new Date();
    let hours = date.getHours();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    date = date.toLocaleDateString("en-US", options);

    let greeting;
    switch (true) {
        case hours < 12:
            greeting = "Good Morning!";
            break;
        case hours < 18:
            greeting = "Good Afternoon!";
            break;
        default:
            greeting = "Good Evening!";
    }

    return (
        <div className="flex flex-col md:flex-row">
            <aside className="border-2 border-black md:h-screen md:w-2/12">
                <h2 className="text-black">Whatever Note</h2>
                <h3>User Name</h3>
                <ul className="flex flex-col">
                    <li>Home</li>
                    <li>Notes</li>
                    <li>Add a Note</li>
                    <li>About</li>
                    <li>Sign Out</li>
                </ul>
            </aside>

            <main className="border-2 border-black md:w-10/12 bg-cover bg-[url('/images/coffee-notebook.jpg')]">
                <div className="flex justify-between">
                    <span className="text-white p-4 text-lg text-left">{greeting}</span>
                    <span className="text-white p-4 text-lg text-right">{date}</span>
                </div>

                <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto mt-28">
                    <h1 className="text-black text-2xl p-2">
                        Your Recent Notes
                    </h1>
                    <div className="flex flex-wrap justify-around">
                        <DashboardCard noteDate={'May 20, 2022'} noteTitle={'First Class Notes'}/>
                        <DashboardCard noteDate={'May 22, 2022'} noteTitle={'Exam Prep'}/>
                        <DashboardCard noteDate={'May 25, 2022'} noteTitle={'Chapter Summary'}/>
                        <DashboardCard noteDate={'May 27, 2022'} noteTitle={'Lecture Notes'}/>
                        <DashboardCard noteDate={'May 20, 2022'} noteTitle={'First Class Notes'}/>
                        <DashboardCard noteDate={'May 22, 2022'} noteTitle={'Exam Prep'}/>
                    </div>
                </section>

                <section className="bg-white h-fit w-11/12 opacity-75 rounded-3xl mx-auto mt-10">
                    <h1 className="text-black text-center text-2xl py-40 mb-4">
                            Create a Note [insert WYSIWYG here]
                    </h1>
                </section>
            </main>

            {/* <Link href="/">
                <a className="text-blue-900 underline">Return home</a>
            </Link> */}
        </div>
    );
}

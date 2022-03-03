import DashboardCard from "../components/dashboardCard";
import GreetingDate from "../components/greetingDate";
import TempNavBar from "../components/tempNavBar";

export default function dashboard() {
    return (
        <div className="flex flex-col md:flex-row">
            <TempNavBar />

            <main className="md:w-10/12 bg-cover bg-[url('/images/coffee-notebook.jpg')]">
                <GreetingDate />

                <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto mt-28">
                    <h1 className="text-black text-2xl p-2">
                        Your Recent Notes
                    </h1>
                    <div className="flex flex-wrap justify-around">
                        <DashboardCard
                            id={1}
                            created_at={"2022-03-01T14:13:13+00:00"}
                            title={"First Class Notes"}
                        />
                        <DashboardCard
                            id={2}
                            created_at={"May 22, 2022"}
                            title={"Exam Prep"}
                        />
                        <DashboardCard
                            id={3}
                            created_at={"May 25, 2022"}
                            title={"Chapter Summary"}
                        />
                        <DashboardCard
                            id={4}
                            created_at={"May 27, 2022"}
                            title={"Lecture Notes"}
                        />
                        <DashboardCard
                            id={5}
                            created_at={"May 20, 2022"}
                            title={"First Class Notes"}
                        />
                    </div>
                </section>

                <section className="bg-white h-fit w-11/12 opacity-75 rounded-3xl mx-auto mt-10">
                    <h1 className="text-black text-center text-2xl py-40 mb-4">
                        Create a Note [insert WYSIWYG here]
                    </h1>
                </section>
            </main>
        </div>
    );
}

import GreetingDate from "../components/greetingDate";
import NotesCard from "../components/notesCard";
import TempNavBar from "../components/tempNavBar";

export default function notes() {
    return (
        <div className="flex flex-col md:flex-row">
            <TempNavBar />

            <main className="md:w-10/12 bg-cover bg-[url('/images/coffee-notebook.jpg')]">
                <GreetingDate />

                <h1 className="w-11/12 mx-auto text-center text-black bg-white opacity-75 rounded-3xl text-2xl p-2">
                    Notes
                </h1>
                <section className="bg-white w-11/12 opacity-75 rounded-3xl mx-auto mt-10 p-3">
                    <NotesCard
                        id={1}
                        created_at={"2022-03-01T14:19:56.742327+00:00"}
                        title={"First Class Notes"}
                        content={
                            "Cells can be thought of as building blocks of organisms. Some organisms are composed of a single cell. Others, like ourselves, are composed of millions of cells that work together to perform the more complex functions that make us different from bacteria. It is difficult to imagine that humans are descendants of a single cell, but this is a common belief in the scientific world."
                        }
                    />

                    <NotesCard
                        id={2}
                        created_at={"May 20, 2022"}
                        title={"First Class Notes"}
                        content={
                            "Before we can understand how multiple cells can work together to create complex biological functions, it is necessary to understand what biological functions single cells are capable of performing on their own to sustain life."
                        }
                    />

                    <NotesCard
                        id={3}
                        created_at={"May 20, 2022"}
                        title={"First Class Notes"}
                        content={
                            "Cells can be thought of as building blocks of organisms. Some organisms are composed of a single cell. Others, like ourselves are made up of many."
                        }
                    />

                    <NotesCard
                        id={4}
                        created_at={"May 20, 2022"}
                        title={"First Class Notes"}
                        content={
                            "Some organisms are composed of a single cell. Others, like ourselves, are composed of millions of cells that work together to perform the more complex functions that make us different from bacteria. It is difficult to imagine that humans are descendants of a single cell, but this is a common belief in the scientific world. Before we can understand how multiple cells can work together to create complex biological functions, it is necessary to understand what biological functions single cells are capable of performing on their own to sustain life"
                        }
                    />

                    <NotesCard
                        id={5}
                        created_at={"May 20, 2022"}
                        title={"First Class Notes"}
                        content={
                            "All living organisms are composed of cells. A cell is a small, membrane-bound compartment that contains all the chemicals and molecules that help support an organism's life. An understanding of the structure of cells is one of the first steps in comprehending the complex cellular interactions that direct and produce life"
                        }
                    />
                </section>
            </main>
        </div>
    );
}

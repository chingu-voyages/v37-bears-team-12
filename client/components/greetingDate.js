export default function GreetingDate() {
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
        <div className="flex justify-between">
            <span className="text-white p-4 text-lg text-left">{greeting}</span>
            <span className="text-white p-4 text-lg text-right">{date}</span>
        </div>
    );
}

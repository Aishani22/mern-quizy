
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router";

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [fact, setFact] = useState("Loading fun fact...");

    const handleClick1 = () => navigate("/quizPage");
    const handleClick2 = () => navigate("/article");
    const handleClick3 = () => navigate("/mixedQuizPage");

    useEffect(() => {
        const getFact = async () => {
            try {
                const response = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random?language=en`);
                const data = await response.json();
                setFact(data.text);
            } catch (error) {
                console.error("Error fetching fact:", error);
                setFact("Could not fetch a fun fact today!");
            }
        };
        getFact();
    }, []);

    return (
        <div className=" p-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                {/* Left: User Info */}
                <div className="flex items-start gap-4">
                    <img src={user.icon} alt="User Icon" className="w-20 h-20 bg-white rounded-full border-2 border-gray-600 hover:scale-110 transition-transform" />
                    <div>
                        <h1 className="text-4xl font-semibold text-gray-800">Welcome to <span className="text-purple-600 font-bold">Quizy</span>, {user.username}!</h1>
                        <p className="text-gray-600 text-lg italic mt-3">YOUR DAILY DOSE OF KNOWLEDGE IS HERE!</p>
                    </div>
                </div>

                {/* Right: Fun Fact */}
                <div className="bg-white rounded-xl p-4 shadow-lg max-w-md w-full md:w-100">
                    <h2 className="text-xl text-gray-700 font-semibold">🧠 Fun Fact:</h2>
                    <p className="text-gray-700 mt-2">{fact}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div onClick={handleClick1} className="bg-white rounded-2xl p-4 shadow-xl text-center hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                    <img src="/iconImages/quiz.png" alt="Quiz Icon" className="w-full h-48 object-cover rounded-xl mb-4" />
                    <p className="text-lg font-bold text-gray-600">TAKE TOPIC WISE QUIZ!</p>
                </div>
                <div onClick={handleClick3} className="bg-white rounded-2xl p-4 shadow-xl text-center hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                    <img src="/iconImages/mixedQuiz.png" alt="Mixed Quiz Icon" className="w-full h-48 object-cover rounded-xl mb-4" />
                    <p className="text-lg font-bold text-gray-600">TAKE MIXED QUIZ!</p>
                </div>
                <div onClick={handleClick2} className="bg-white rounded-2xl p-4 shadow-xl text-center hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                    <img src="/iconImages/news.png" alt="News Icon" className="w-full h-48 object-cover rounded-xl mb-4" />
                    <p className="text-lg font-bold text-gray-600">READ NEWS!</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

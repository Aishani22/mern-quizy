import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';


const ScoreCard = () => {

    const location = useLocation();
    const { score } = location.state;
    const { correctlyAnswered } = location.state;
    const { incorrectlyAnswered } = location.state;
    const { unanswered } = location.state;
    const { totalTime } = location.state;
    const { imageBg } = location.state;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/home");
    };

    const percentage = Math.round((score / 10) * 100);

    const getEmojiFeedback = () => {
        if (percentage >= 90) return '🏆 Excellent!';
        if (percentage >= 70) return '👍 Great Job!';
        if (percentage >= 50) return '🙂 Good effort!';
        return '💪 Keep practicing!';
    };

    return(
        <>
            <div
            className="min-h-screen bg-cover bg-center bg-no-repeat items-start pt-20"
            style={{ backgroundImage: `url(${imageBg})` }}
            >
           <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl bg-gray-200 space-y-6 text-gray-800">
            <button onClick={handleClick}
                type="button"
                aria-label="Close"
                className="w-6 h-8 flex items-center justify-center hover:bg-gray-400 rounded ml-auto"
            >
                ✖
            </button>
            <h2 className="text-2xl font-bold text-center">Quiz Result!</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-500">Score</p>
                <p className="text-xl font-bold text-green-600">{score}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-500">Correct</p>
                <p className="text-xl font-bold text-green-500">{correctlyAnswered}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-500">Incorrect</p>
                <p className="text-xl font-bold text-red-500">{incorrectlyAnswered}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-sm text-gray-500">Unattempted</p>
                <p className="text-xl font-bold text-gray-500">{unanswered}</p>
                </div>
            </div>
            <div>
                <p className="text-lg text-center font-medium text-gray-500 mb-1">Time taken: {totalTime}</p>
                <p className="text-sm font-medium text-gray-600 mb-1">Progress</p>
                <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                    className="bg-gradient-to-r from-green-500 to-green-700 h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
                </div>
                <p className="text-center mt-2 text-lg">{getEmojiFeedback()}</p>
            </div>
            </div>
            </div>
        </>
    )
}

export default ScoreCard;
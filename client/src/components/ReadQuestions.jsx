import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";
import { useLoader } from "../pages/LoaderContext";

const ReadQuestions = () => {
    const location = useLocation();
    const { category } = location.state;
    const decodedCategory = decodeURIComponent(category);
    const { imageBg } = location.state;
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);

    const apiUrl = import.meta.env.VITE_API_URL;

    let value = 0;

    useEffect(() => {
        showLoader();
        axios.get(`${apiUrl}/api/questions/getQuestions?category=${category}&limit=30`)
            .then((res) => {
                setQuestions(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err))
            .finally(() => hideLoader());
    }, [category]);

    useEffect(() => {
        if(index === 30) {
            navigate("/quizPage");
        }
    }, [index, navigate])

    const handleClick = () => {
        navigate("/quizPage");
    };

    const handleNext = () => {
        setIndex(index + 1);
    }

    const handleBack = () => {
        setIndex(index - 1);
        if(index == 0) {
            navigate("/quizPage");
        }
    }

    return (
        <>
            <div
            className="min-h-screen bg-cover bg-center bg-no-repeat  flex justify-center items-start pt-20"
            style={{ backgroundImage: `url(${imageBg})` }}
            >
                <div className="question-card w-11/12 sm:w-2/3 lg:w-1/2 bg-gray-400 bg-opacity-90 rounded-2xl shadow-lg p-4">
                <div className="flex justify-between items-center">
                    <h2 className="w-full text-3xl font-bold text-white text-center">{decodedCategory}</h2>
                    <button onClick={handleClick}
                        type="button"
                        aria-label="Close"
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-600 rounded m-2 mb-4 ml-auto"
                    >
                        ✖
                    </button>
                </div>
                    {questions.length > 0 && index < 30 ? (
                        <>
                            <div className="p-4 m-2 bg-gray-500 rounded-xl shadow-lg border-1 border-black">
                                <p className="text-white">Q{index+1}. {questions[index].question}</p>
                            </div>
                            <div className="p-4 m-2 bg-white rounded-xl shadow-lg">
                                <p className="text-gray-700">Answer: {questions[index].correctAnswer}</p>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <button onClick={handleBack} 
                                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl hidden sm:block">
                                    BACK
                                </button>

                                {/* Left Arrow Button - Visible on Small Screens */}
                                <button 
                                    onClick={handleBack} 
                                    className="block sm:hidden p-2 rounded-full bg-gray-600 hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                        className="lucide lucide-chevron-left">
                                        <path d="m15 18-6-6 6-6"/>
                                    </svg>
                                </button>

                                {/* Check Answer - Centered */}

                                {/* Next Button - Hidden on Small Screens */}
                                <button 
                                    onClick={handleNext} 
                                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl hidden sm:block">
                                    NEXT
                                </button>

                                {/* Right Arrow Button - Visible on Small Screens */}
                                <button 
                                    onClick={handleNext} 
                                    className="block sm:hidden p-2 rounded-full bg-gray-600 hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                        className="lucide lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6"/>
                                    </svg>
                                </button>
                            </div>
                        </>
                    ): null}
                </div>
            </div>
        </>
    );
};

export default ReadQuestions;
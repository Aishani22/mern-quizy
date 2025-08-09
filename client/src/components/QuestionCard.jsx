import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";

const QuestionCard = () => {
    const location = useLocation();
    const { category } = location.state;
    const decodedCategory = decodeURIComponent(category);
    const { imageBg } = location.state;
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0); 
    const [correctlyAnswered, setCorrectlyAnswered] = useState(0); // Number of correctly answered questions
    const [incorrectlyAnswered, setIncorrectlyAnswered] = useState(0); // Number of incorrectly answered questions
    const [unanswered, setUnanswered] = useState(0); // Number of unanswered questions
    const [ansArray, setAnsArray] = useState(new Array(10).fill(0));
    const [clicked, setClicked] = useState(new Array(4).fill(0));
    const [check, setCheck] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [userAnswers, setUserAnswers] = useState(new Array(10).fill(null)); // Stores user answers
    const [checkedArray, setCheckedArray] = useState(new Array(10).fill(false)); // Stores check state for each question
    const [clickedOptions, setClickedOptions] = useState(Array(10).fill(new Array(4).fill(0))); // Stores clicked options

    const apiUrl = import.meta.env.VITE_API_URL;

    let value = 0;

    useEffect(() => {
        axios.get(`${apiUrl}/api/questions/getQuestions?category=${category}&limit=10`)
            .then((res) => {
                setQuestions(res.data);
                // console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, [category]);

    useEffect(() => {
        console.log("UserAnswer:", userAnswer);
    }, [userAnswer]);

    useEffect(() => {
        if(index === 10) {
            const correct = ansArray.filter((ans) => ans === 1).length;
            const incorrect = ansArray.filter((ans) => ans === -1).length;
            const unanswered = ansArray.filter((ans) => ans === 0).length;
            
            setScore(correct);
            setCorrectlyAnswered(correct);
            setIncorrectlyAnswered(incorrect);
            setUnanswered(unanswered);
        }
    }, [index]);

    useEffect(() => {
        if(index === 10) {
            navigate("/scoreCard", {state: {score: score, correctlyAnswered: correctlyAnswered, incorrectlyAnswered: incorrectlyAnswered, 
                unanswered: unanswered, totalTime: formatTime(timeTaken), imageBg: imageBg}});
        }
    }, [score, index, correctlyAnswered, incorrectlyAnswered, unanswered, navigate, imageBg])

    useEffect(() => {
        console.log("AnsArray:", ansArray);
    }, [ansArray]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeTaken((prev) => prev + 1); // Increment time every second
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleClick = () => {
        navigate("/quizPage");
    };

    const handleNext = () => {
        setIndex(index + 1);
        setCheck(false);
        setAnswer(false);
        setCorrectAnswer(false);
        setClicked(new Array(4).fill(0));
        if(index == 10) {
            onFinish(timeTaken);
        }
    }

    const handleBack = () => {
        setIndex(index - 1);
        setCheck(false);
        setAnswer(false);
        setCorrectAnswer(false);
        setClicked(new Array(4).fill(0));
        if(index === 0) {
            navigate("/quizPage");
        }
    }


    const handleSelect = (value, option) => {
        if (!checkedArray[index]) { 
            const newUserAnswers = [...userAnswers];
            newUserAnswers[index] = value;
            setUserAnswers(newUserAnswers);
    
            setClickedOptions((prevClicked) => {
                const newClicked = [...prevClicked];
                newClicked[index] = new Array(4).fill(0);
                newClicked[index][option] = 1;
                return newClicked;
            });
    
            setAnsArray((prevAnsArray) => {
                const newAnsArray = [...prevAnsArray];
                newAnsArray[index] = value === questions[index].correctAnswer ? 1 : -1;
                return newAnsArray;
            });
        }
    };
    

    const handleCheck = () => {
        setCheckedArray((prevChecked) => {
            const newChecked = [...prevChecked];
            newChecked[index] = true;
            return newChecked;
        });
    
        setCorrectAnswer(true);
        if (userAnswers[index] === questions[index].correctAnswer) {
            setAnswer(true);
        }
    };
    

    const getOptionClass = (optionIndex) => {
        if (clickedOptions[index][optionIndex] === 1) {
            if (checkedArray[index]) {
                return userAnswers[index] === questions[index].correctAnswer
                    ? "bg-green-300 text-white"
                    : "bg-red-300 text-white";
            } else {
                return "bg-blue-300 text-white";
            }
        } else if (checkedArray[index] && questions[index].options[optionIndex] === questions[index].correctAnswer) {
            return "bg-green-300 text-white";
        } else {
            return "bg-white text-gray-700";
        }
    };
    
    return (
        <>
            <div
            className="min-h-screen bg-cover bg-center bg-no-repeat  flex justify-center items-start pt-20"
            style={{ backgroundImage: `url(${imageBg})` }}
            >
                <div className="question-card w-11/12 sm:w-2/3 lg:w-1/2 bg-gray-400 bg-opacity-90 rounded-2xl shadow-lg p-4">
                <div className="flex justify-between items-center">
                <div className="flex w-full">
                    <p className="text-grey-700 font-bold text-lg p-2 px-4">TIME : {formatTime(timeTaken)}</p>
                    {/* <h2 className="flex-1 text-3xl font-bold text-white text-center">{decodedCategory}</h2> */}
                </div>

                    <button onClick={handleClick}
                        type="button"
                        aria-label="Close"
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-600 rounded m-2 mb-4 ml-auto"
                    >
                        ✖
                    </button>
                </div>
                    {questions.length > 0 && index < 10 ? (
                        <>
                            <div className="p-4 m-2 bg-gray-500 text-white rounded-xl shadow-xl border-1 border-black">
                                <p className="text-white">Q{index+1}. {questions[index].question}</p>
                            </div>
                            <div className={`p-4 m-2 rounded-xl shadow-lg cursor-pointer ${getOptionClass(0)}`} onClick={() => handleSelect(questions[index].options[0], 0)}>
                                <p className="text-gray-700">{questions[index].options[0]}</p>
                            </div>
                            <div className={`p-4 m-2 rounded-xl shadow-lg cursor-pointer ${getOptionClass(1)}`} onClick={() => handleSelect(questions[index].options[1], 1)}>
                                <p className="text-gray-700">{questions[index].options[1]}</p>
                            </div>
                            <div className={`p-4 m-2 rounded-xl shadow-lg cursor-pointer ${getOptionClass(2)}`} onClick={() => handleSelect(questions[index].options[2], 2)}>
                                <p className="text-gray-700">{questions[index].options[2]}</p>
                            </div>
                            <div className={`p-4 m-2 rounded-xl shadow-lg cursor-pointer ${getOptionClass(3)}`} onClick={() => handleSelect(questions[index].options[3], 3)}>
                                <p className="text-gray-700">{questions[index].options[3]}</p>
                            </div>
                            <div className="flex flex-end button-class p-4">
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
                                <button 
                                    className="check-button bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl mx-auto"
                                    onClick={handleCheck}>
                                    CHECK ANSWER
                                </button>

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

export default QuestionCard;
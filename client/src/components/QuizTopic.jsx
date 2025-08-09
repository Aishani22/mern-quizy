import QuestionCard from "./QuestionCard";
import ReadQuestions from "./ReadQuestions";
import { useNavigate } from "react-router";

const QuizTopic = ({image, text, category, imageBg}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        const encodedCategory = encodeURIComponent(category);
        navigate("/questionCard", {state: {category: encodedCategory, imageBg: imageBg}});
        // console.log(category);
        // console.log("Clicked");
    }

    const handleImageClick = () => {
        const encodedCategory = encodeURIComponent(category);
        navigate("/readQuestions", {state: {category: encodedCategory, imageBg: imageBg}});
    }

    return (
        <>
            <div className="mt-3">
            <div className="bg-white w-72 rounded-2xl shadow-xl overflow-hidden  p-2 m-2 transition-transform duration-200 ease-in-out transform hover:scale-105">
            <img src={image} alt="Card" className="w-full h-40 shadow-lg object-cover rounded-2xl cursor-pointer" onClick={handleImageClick}/>
            <div className="p-4">
                <p className="text-gray-700 text-center text-lg">{text}</p>
                <button className="mt-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-xl w-full rounded shadow-lg drop-shadow-md hover:shadow-2xl transition hover:bg-gray-700 transition duration-200 ease-in-out cursor-pointer" onClick={handleClick}>Start Quiz</button>
            </div>
            </div>
            </div>
        </>
    )
}

export default QuizTopic;
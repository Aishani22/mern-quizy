const Question = require("../models/questions-model");
const {fetchTriviaQuestions} = require("../utils/fetchTrivia");

const getQuestions = async (req, res) => {
    try{
        const {amount, categories} = req.query;
        const questions = await fetchTriviaQuestions(amount, categories.split(","));

        const formattedQuestions = questions.map((question) => {
            const formattedQuestion = {
                category: question.category,
                question: question.question,
                options: shuffleArray([...question.incorrectAnswers, question.correctAnswer]),
                correctAnswer: question.correctAnswer
            }
            // console.log("Formatted Questions:", formattedQuestion);
            return formattedQuestion;
        });

        await Question.insertMany(formattedQuestions);
        res.status(201).json({ message: 'Questions saved successfully!', count: formattedQuestions.length });
    }
    catch(error) {
        console.log(error);
        res.status(400).json({message: "Error in fetching questions."});
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

module.exports = { getQuestions };
const axios = require('axios');

async function fetchTriviaQuestions(amount=30, categories=[]) {
    try{
        const response  = await axios.get(`https://the-trivia-api.com/api/questions`, {
            params: {
                limit: amount,
                categories: categories.join(",")
            }
        });
        // console.log("Trivia API Response:", response.data); // Debugging
        return response.data;
    }
    catch(error) {
        console.log("Error in fetching questions: ", error);
        return [];
    }  
}

module.exports = {fetchTriviaQuestions};
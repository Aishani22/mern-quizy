const express = require('express');
const router = express.Router();
const {getQuestions} = require("../controllers/question-controller");
const Question = require("../models/questions-model");

router.get("/fetchQuestions", getQuestions);

router.get("/getQuestions", async(req, res) => {
    try{
        const amount = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        // console.log("Received category:", category);
        const questions  = await Question.aggregate([
            { 
                $match: { 
                    category: category } // Case-insensitive match 
            },
            { $sample: { size: amount } }
        ]);
        // console.log("Fetched questions:", questions);
        res.json(questions);
    }
    catch(error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({
            message: "Internal server error"});
    }   
})

module.exports = router;
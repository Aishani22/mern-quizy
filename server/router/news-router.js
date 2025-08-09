const express = require('express');
const router = express.Router();
const {getNews} = require("../controllers/news-controller");
const News = require("../models/news-model");

router.get("/fetchNews", getNews);

router.get("/getNews", async(req, res) => {
    try{
        const amount = 5;
        const category = req.query.category || "general";
        // console.log("Received category:", category);

        let matchQuery = {};
        if (category) {
            matchQuery.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive match
        }

        const news = await News.aggregate([
            { 
                $match: matchQuery
            },
            { $sample: { size: amount } }]);
        // console.log("Fetched questions:", questions);
        res.json(news);
    }
    catch(error) {
        console.error("Error fetching news:", error);
        res.status(500).json({
            message: "Internal server error"});
    }   
})

module.exports = router;
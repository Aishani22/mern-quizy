const express = require('express');
const router = express.Router();
const {getNews} = require("../controllers/news-controller");
const News = require("../models/news-model");

router.get("/fetchNews", getNews);

// router.get("/getNews", async(req, res) => {
//     try{
//         const amount = 5;
//         const category = req.query.category || "general";
//         // console.log("Received category:", category);

//         let matchQuery = {};
//         if (category) {
//             matchQuery.category = { $regex: new RegExp(category, 'i') }; // Case-insensitive match
//         }

//         const news = await News.aggregate([
//             { 
//                 $match: matchQuery
//             },
//             { $sample: { size: amount } }]);
//         // console.log("Fetched questions:", questions);
//         res.json(news);
//     }
//     catch(error) {
//         console.error("Error fetching news:", error);
//         res.status(500).json({
//             message: "Internal server error"});
//     }   
// })

router.get("/getNews", async (req, res) => {
    try {
        const amount = 5;
        const category = req.query.category || "general";

        // Check if news is stale (older than 24 hours)
        const latestNews = await News.findOne().sort({ publishedAt: -1 });
        const now = new Date();
        let isStale = true;

        if (latestNews) {
            const diffHours = (now - latestNews.publishedAt) / (1000 * 60 * 60);
            isStale = diffHours >= 24;
        }

        // If stale, update before sending response
        if (isStale) {
            console.log("⚠️ News is stale — fetching fresh news...");
            await updateNews();
        }

        let matchQuery = {};
        if (category) {
            matchQuery.category = { $regex: new RegExp(category, 'i') };
        }

        const news = await News.aggregate([
            { $match: matchQuery },
            { $sample: { size: amount } }
        ]);

        res.json(news);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
const axios = require('axios');

const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

async function fetchNews(amount=5) {
    try{
        let news = [];

        for (let category of categories) {
            const response  = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                params: {
                    pageSize: amount,  // Limits number of articles,
                    category: category, // Category filter
                    apiKey: process.env.NEWS_API_KEY // Use environment variable for security
                }
            });
            // console.log("Trivia API Response:", response.data); // Debugging
            const categorizedNews = response.data.articles.map(article => ({
                title: article.title,
                description: article.description || "No description available",
                url: article.url,
                urlToImage: article.urlToImage || "",
                publishedAt: new Date(article.publishedAt), // Store as Date type
                source: article.source.name,
                category: category // Manually add category
            }));

            news.push(...categorizedNews);
        }
        return news;
    }
    catch(error) {
        console.log("Error in fetching news: ", error);
        return [];
    }  
}

module.exports = {fetchNews};
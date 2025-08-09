const cron = require("node-cron");
const News = require("../models/news-model");
const {fetchNews} = require("../utils/fetchNews");

const updateNews = async () => {
    try {
        console.log("🗑️ Deleting old news...");
        await News.deleteMany({}); // Delete all old news

        console.log("🔄 Fetching fresh news...");
        const freshNews = await fetchNews();

        if (freshNews.length > 0) {
            const formattedNews = freshNews.map((article) => ({
                title: article.title,
                description: article.description || "No description available",
                url: article.url,
                urlToImage: article.urlToImage || "",
                publishedAt: new Date(article.publishedAt),
                source: article.source.name,
                category: article.category || "general",
            }));

            await News.insertMany(formattedNews);
            console.log(`✅ ${formattedNews.length} new articles saved.`);
        } else {
            console.log("❌ No fresh news fetched.");
        }
    } catch (error) {
        console.error("❌ Error updating news:", error);
    }
};

const getNews = async (req, res) => {
    try {
        await updateNews();
        res.status(200).json({ message: "News updated successfully!" });
    } catch (error) {
        console.error("❌ Error updating news:", error);
        res.status(500).json({ message: "Error updating news." });
    }
};

cron.schedule("0 0 * * *", async () => {
    console.log("🕛 Running cron job to update news...");
    await updateNews();
});

module.exports = { getNews, updateNews };
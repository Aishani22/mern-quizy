const mongoose =  require("mongoose");

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true 
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    urlToImage: {
        type: String,
        default: ""
    },
    publishedAt: {
        type: String,
    },
    source: {
        type: String,
    },
    category: {
        type: String,
    },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
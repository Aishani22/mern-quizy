import Article from "../components/Article";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {

    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    const [news, setNews] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const responses = await Promise.all(
                    categories.map(async (category) => {
                        // const encodedTopic = encodeURIComponent(topic);
                        const res = await axios.get(`${apiUrl}/api/news/getNews?category=${category}&limit=5`);
                        return res.data.length > 0 ? res.data : [];
                    })
                );
    
                const fetchedNews = responses.flat();
    
                setNews(fetchedNews); // ✅ Store all news at once
                console.log("Fetched News:", fetchedNews);
            } catch (err) {
                console.error("Error fetching news:", err);
            }
        };
    
        fetchNews();
    }, []);

    return (
        <>
            <div className="flex flex-row flex-wrap justify-center">
            {/* <Article image = "/images/music.png" text = "MUSIC" category = {"Music"}/>
            <Article image = "/images/sport_and_leisure.png" text = "SPORT AND LEISURE" category = {"Sport & Leisure"}/>
            <Article image = "/images/film_and_tv.png" text = "FILM AND TV" category = {"Film & TV"}/> 
            <Article image = "/images/arts_and_literature.png" text = "ARTS AND LITERATURE" category={"Arts & Literature"}/>
            <Article image = "/images/history.png" text = "HISTORY" category={"History"}/>
            <Article image = "/images/society_and_culture.png" text = "SOCIETY AND CULTURE" category={"Society & Culture"}/>
            <Article image = "/images/science.png" text = "SCIENCE" category={"Science"}/>
            <Article image = "/images/geography1.png" text = "GEOGRAPHY" category={"Geography"}/>
            <Article image = "/images/food_and_drink.png" text = "FOOD AND DRINK" category={"Food & Drink"}/>
            <Article image = "/images/general_knowledge.png" text = "GENERAL KNOWLEDGE" category={"General Knowledge"}/> */}
            </div>
        </>
    )
}

export default News;
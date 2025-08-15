import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoader } from "../pages/LoaderContext";

const Article  = ({urlToImage, title, description, url, publishedAt, source}) => {

    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
    const [news, setNews] = useState([]);
    const [articles, setArticles] = useState([]);
    const { showLoader, hideLoader } = useLoader();

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
      const fetchNews = async () => {
          try {
            showLoader();
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

              const defaultType = "general";
              const filteredArticles = fetchedNews.filter(article => article.category === defaultType);
              setArticles(filteredArticles);
          } catch (err) {
              console.error("Error fetching news:", err);
          }
          finally{
            hideLoader();
          }
      };
  
      fetchNews();
    }, []);

    const handleClick = (event) => {
      const category = event.target.name;
      const filteredArticles = news.filter(article => article.category === category);
      setArticles(filteredArticles);
      console.log("Filtered articles", filteredArticles);
    }

    return (
      <div className='mb-10'>
        <div className='mx-auto text-center mb-10'>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='general' id='general' onClick={handleClick}>General</button>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='business' id='business' onClick={handleClick}>Business</button>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='entertainment' id='entertainment' onClick={handleClick}>Entertainment</button>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='health' id='health' onClick={handleClick}>Health</button>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='science' id='science' onClick={handleClick}>Science</button>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='sports' id='sports' onClick={handleClick}>Sports</button>
          <button className="bg-white text-black mt-4 ml-4 hover:text-white hover:bg-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-md" name='technology' id='technology' onClick={handleClick}>Technology</button>
        </div>
        {articles.map((article, index) => {
          const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          return (
            <div 
  key={index} 
  className="mt-4 mb-4 bg-white w-[90%] sm:w-3/4 mx-auto px-4 py-4 rounded-2xl shadow-lg"
>
  <div className="card flex flex-col md:flex-row text-black gap-6 md:gap-4 h-full">

    {/* Image Column */}
    <div className="news-image w-full md:w-1/3 shadow-xl rounded-xl">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          className="rounded-xl w-full h-64 md:h-full object-cover"
          alt={article.category}
        />
      )}
    </div>

    {/* Content Column */}
    <div className="w-full md:w-2/3 flex flex-col justify-between text-left relative mx-2">
      <div className="card-body">
        <h5 className="card-title text-xl font-semibold mb-2 leading-snug" style={{ textAlign: "justify" }}>
          {article.title}
        </h5>
        <p className="mt-2 text-gray-700 text-base leading-relaxed" style={{ textAlign: "justify" }}>
          {article.description || "No description available."}
        </p>
        <a
          href={article.url}
          className="mt-4 text-blue-600 font-medium hover:underline inline-block text-center md:text-left w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>

      {/* Absolutely Positioned Bottom Right Date */}
      <div className="text-sm text-gray-500 md:absolute md:bottom-2 md:right-4 mt-2 text-center">
        Published on: {formattedDate}
      </div>
    </div>
  </div>
</div>
          );
        })}

      </div>
    );
};

export default Article;
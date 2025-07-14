/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Accessing the API key from the environment variable
const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const getNews = async () => {
  try {
    const res = await axios.get(url);
    const data = res.data.articles ? res.data.articles.filter(item => item.author != null) : [];
    return data;
  } catch (error) {
    // Log more specific error information
    console.error("Error fetching news:", error.response ? error.response.data : error.message);
    return [];
  }
};

const NewsCard = ({ article }) => (
  <div className="news-card">
    {article.urlToImage && (
      <div className="news-image-container">
        <img src={article.urlToImage} alt={article.title} className="news-image" />
      </div>
    )}
    <div className="news-content">
      <h2 className="news-title">{article.title}</h2>
      <p className="news-source">{article.source.name}</p>
      <p className="news-description">{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
    </div>
  </div>
);

NewsCard.propTypes = {
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchedNews = await getNews();
        setNews(fetchedNews);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handlePrevious = () => {
    setCurrentIdx((prevIdx) => (prevIdx > 0 ? prevIdx - 1 : news.length - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prevIdx) => (prevIdx < news.length - 1 ? prevIdx + 1 : 0));
  };

  if (loading) {
    return <div className="loading">Loading<span className="loading-dots"></span></div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (news.length === 0) {
    return <div className="no-news">No news available.</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Latest News</h1>
      </header>
      <main className="news-container">
        <button className="nav-button prev" onClick={handlePrevious} aria-label="Previous article">
          <ChevronLeft />
        </button>
        <NewsCard article={news[currentIdx]} />
        <button className="nav-button next" onClick={handleNext} aria-label="Next article">
          <ChevronRight />
        </button>
      </main>
      <div className="pagination">
        {currentIdx + 1} / {news.length}
      </div>
    </div>
  );
};

export default App;

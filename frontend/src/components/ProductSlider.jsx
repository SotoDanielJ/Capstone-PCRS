import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/ProductSlider.css';
import Loading from './Loading';
import 'boxicons';
const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = {
    // api_key: "82408986EB3B4C0DB91235756302ACBB",
    type: "search",
    amazon_domain: "amazon.com",
    search_term: "Computers, gaming_computers ",
    language: "en_US",
   
    max_page: "5"

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.rainforestapi.com/request', { params });
        setProducts(response.data.search_results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when API call is complete
      }
    };

    fetchData();
  }, []);

  const handlePrevClick = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
    setSliderPosition((prevPosition) => (prevPosition === 0 ? -100 : prevPosition + 33.33));
  };

  const handleNextClick = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
    setSliderPosition((prevPosition) => (prevPosition === -66.66 ? 0 : prevPosition - 33.33));
  };

  return (
    <div className="ProductSlider">
      <div className="content">
        {loading && <Loading />}
        <p>{products.length > 0 && products[currentProductIndex].title} </p>
        {products.length > 0 && (
          <div className="slider-container">
            <button onClick={handlePrevClick}>
              <box-icon name='chevron-left' />
            </button>
            <a href={products[currentProductIndex].link} target="_blank" rel="noopener noreferrer">
              <img src={products[currentProductIndex].image} alt={products[currentProductIndex].title} />
            </a>
            <button onClick={handleNextClick}>
              <box-icon name='chevron-right' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSlider;

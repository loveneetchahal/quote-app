import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  quote: string;
  author: string;
}

const QuoteOfTheDay: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<Quote>('https://favqs.com/api/qotd');
        console.log({ response }); 
        setQuote(response.data);
        
        // const response = await fetch('https://favqs.com/api/qotd', {mode:'cors'});
        // const data = await response.json();
        // console.log({ data })

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching quote.</div>;
  }

  return (
    <div>
      <h1>Quote of the Day</h1>
      <p>{quote?.quote}</p>
      <p>{quote?.author}</p>
    </div>
  );
};

export default QuoteOfTheDay;
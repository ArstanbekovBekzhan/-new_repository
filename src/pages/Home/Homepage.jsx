import React, { useEffect, useState } from 'react';
import { Card } from '../../component/Cards/Cards';
import SHome from './Home.module.css'
const Homepage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // Количество карточек на одной странице

  useEffect(() => {
    fetch('http://localhost:3000/cards')
      .then(response => response.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
        setLoading(false);
      });
  }, []);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className={SHome.Homepage}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Card cards={currentCards} />
          <div>
            {currentPage > 1 && (
              <button onClick={previousPage}>Предыдущая страница</button>
            )}
            {currentCards.length === cardsPerPage && (
              <button onClick={nextPage}>Следующая страница</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { Homepage };

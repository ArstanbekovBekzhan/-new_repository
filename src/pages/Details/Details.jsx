import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import SDCard from "./Details.module.css";
import CardMap from './CardMap';

const CardDetails = () => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const { id } = useParams();
  const [Address, setAddress] = useState("");
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/cards/${id}`)
      .then(response => response.json())
      .then(data => {
        setCard(data);
        setLoading(false);
        setAddress(data.location);
      })
      .catch(error => {
        console.error('Error fetching card details:', error);
        setLoading(false);
      });
  }, [id]);

  const getRandomGradient = () => {
    const color1 = getRandomDarkColor();
    const color2 = getRandomDarkColor();
    const gradient = `linear-gradient(to bottom left, ${color1}, ${color2})`;
    setBackgroundColor(gradient);
  };

  const getRandomDarkColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue value
    const saturation = Math.floor(Math.random() * 51) + 50; // Random saturation value between 50 and 100
    const lightness = Math.floor(Math.random() * 16) + 10; // Random lightness value between 10 and 25
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getRandomGradient();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ background: backgroundColor }} className={SDCard.ContentDetails}>
          <div className={SDCard.Black}>
            <button onClick={goBack}></button>
          </div>
          <div className={SDCard.Details}>
            <div className={SDCard.left}>
              <img src={card.image} alt="" />
            </div>
            <div className={SDCard.right}>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <h4>{Address}</h4>
            </div>
          </div>
          <CardMap address={Address} />
        </div>
      )}
    </div>
  );
};

export { CardDetails };

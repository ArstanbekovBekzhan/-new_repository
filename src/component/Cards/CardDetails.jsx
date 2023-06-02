import {useState,useEffect} from "react"
import {useParams} from 'react-router-dom'
import SDCard from "./Card.module.css"
import CardMap from './CardMap';

const CardDetails = () => {
    const { id } = useParams();
    const [Address, setAddress] = useState("")
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(`http://localhost:3000/cards/${id}`)
        .then(response => response.json())
        .then(data => {
          setCard(data);
          setLoading(false);
          setAddress(data.location)
        })
        .catch(error => {
          console.error('Error fetching card details:', error);
          setLoading(false);
        });
    }, [id]);
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
            <div>
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
          {/* <CardMap address={Address}/> */}
            </div>
          
        )}
      </div>
    );
  };  
  export {CardDetails}
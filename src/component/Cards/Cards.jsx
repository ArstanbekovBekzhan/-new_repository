import SCard from "./Card.module.css"
import Erros from "../../Galilee/errors.png"

const Card = ({ cards }) => (
    <div>
      <div className={SCard.Cards} >
         {cards.map(card => (
        <div className={SCard.Card} key={card.id}>
          <div className="img">
          <img src={card.image || Erros } alt="" />
          </div>
          <div className={SCard.text}>
          <h3>{card.title }</h3>
          <div className={SCard.Nik}>
            <img src={card.Nick_image} alt="" />
          <h4>{card.Nick}</h4>
          </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
export {Card}
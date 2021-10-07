import { useState } from "react";
import styles from "./Card.module.css";
import adventure from "../../images/adventure.svg";
import winner from "../../images/winners.svg";

const Card = (props) => {
  const [showResult, setShowResult] = useState(true);

  const showImage = showResult ? (
    <div className={styles.winners}>
      <img
        src={winner}
        alt="two people jumping in celebration of a win next to a golden goblet."
      />
    </div>
  ) : (
    <img
      className={styles.adventure}
      src={adventure}
      alt="Man with a bag next to a globe. Arrow pointing at a country"
    />
  );
  return (
    <div className={`${styles.card} ${props.className}`}>
      {showImage}
      {props.children}
    </div>
  );
};

export default Card;

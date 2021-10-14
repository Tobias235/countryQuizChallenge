import styles from "./Quizgame.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
const Quizgame = (props) => {
  return (
    <Card className={styles.optionContainer}>
      <h2>Choose knowledge to practice</h2>
      <Button onClick={props.onShowGame}>Capital Cities</Button>
      <Button onClick={props.onShowGame}>Flags of Countries</Button>
    </Card>
  );
};

export default Quizgame;

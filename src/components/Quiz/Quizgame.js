import styles from "./Quizgame.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
const Quizgame = () => {
  return (
    <Card className={styles.optionContainer}>
      <Button>City Is Capital Of</Button>
      <Button>Flag Belong To Country</Button>
    </Card>
  );
};

export default Quizgame;

import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Quizresult.module.css";
const Quizresult = (props) => {
  return (
    <Card>
      <div className={styles.results}>
        <h2>Results</h2>
        <p className={styles.resultText}>
          You got <span>{props.onShowResult} / 10</span> correct answers
        </p>
        <Button onClick={props.onShowOption} className={styles.resultButton}>
          Try again
        </Button>
      </div>
    </Card>
  );
};

export default Quizresult;

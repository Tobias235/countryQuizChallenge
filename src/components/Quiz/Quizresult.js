import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Quizresult.module.css";
const Quizresult = () => {
  return (
    <Card>
      <div className={styles.results}>
        <h2>Results</h2>
        <p className={styles.resultText}>
          You got <span>4</span> correct answers
        </p>
        <Button className={styles.resultButton}>Try again</Button>
      </div>
    </Card>
  );
};

export default Quizresult;

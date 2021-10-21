import styles from "./QuizTitle.module.css";

const QuizTitle = (props) => {
  const capitalCity = (
    <div>
      <p className={styles.quizTitle}>{props.capital} is the capital of</p>
    </div>
  );
  const country = (
    <div>
      <p className={styles.quizTitle}>
        Which country does this flag belong to?
      </p>
    </div>
  );

  const show = props.showGame ? country : capitalCity;
  return <div>{show}</div>;
};

export default QuizTitle;

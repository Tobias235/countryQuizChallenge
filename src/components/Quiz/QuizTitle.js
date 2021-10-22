import styles from "./QuizTitle.module.css";

const QuizTitle = (props) => {
  const capitalCity = (
    <p className={styles.quizTitle}>{props.capital} is the capital of</p>
  );
  const country = (
    <p className={styles.quizTitle}>Which country does this flag belong to?</p>
  );

  const title = props.show ? country : capitalCity;
  return <div>{title}</div>;
};

export default QuizTitle;

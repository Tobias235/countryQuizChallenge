import styles from "./QuizFlag.module.css";

const QuizFlag = (props) => {
  return (
    <div className={styles.flag}>
      <img src={props.flag} alt="Flag of country" />
    </div>
  );
};

export default QuizFlag;

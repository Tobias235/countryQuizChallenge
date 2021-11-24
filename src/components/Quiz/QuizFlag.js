import styles from "./QuizFlag.module.scss";

const QuizFlag = (props) => {
  return (
    <div className={styles.flag}>
      <img src={props.flag} alt="Flag of country" />
    </div>
  );
};

export default QuizFlag;

import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Quizresult.module.scss";
const Quizresult = (props) => {
  const pic = props.onShowPic ? true : false;
  return (
    <Card className={styles.results} onShowPic={pic}>
      <h2>Results</h2>
      <p>
        You got <span>{props.onShowResult} / 10</span> correct answers
      </p>
      <Button onClick={props.onShowOption}>Try again</Button>
    </Card>
  );
};

export default Quizresult;

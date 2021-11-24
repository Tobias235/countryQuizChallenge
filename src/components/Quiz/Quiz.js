import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import QuizFlag from "./QuizFlag";
import QuizTitle from "./QuizTitle";
import QuizOptions from "./QuizOptions";
import useGetOptions from "../hooks/useGetOptions";

import styles from "./Quiz.module.scss";

const Quiz = (props) => {
  const [result, setResult] = useState(0);
  const [next, setNext] = useState(0);
  const [nextBtn, setNextBtn] = useState(false);

  const { optionsArray, isAnswerCorrect, question } = useGetOptions(
    props.showGame,
    props.countries,
    next
  );

  const handleNextQuestion = () => {
    setNext(next + 1);
    setNextBtn(false);
  };

  const handleAnswer = (answers) => {
    if (next !== 9) {
      setNextBtn(true);
    } else {
      for (const answer of answers) {
        answer.classList.remove(styles.wrongAnswer, styles.correctAnswer);
      }
      setTimeout(() => {
        props.onShowResult({
          showResult: true,
          result: result,
        });
      }, 2000);
    }
  };

  return (
    <Card>
      {props.showGame && <QuizFlag flag={question} />}
      <div className={styles.buttonContainer}>
        <QuizTitle show={props.showGame} capital={question} />
        <QuizOptions
          onShowAnswer={handleAnswer}
          isAnswerCorrect={isAnswerCorrect}
          optionsArray={optionsArray}
          setResult={setResult}
          result={result}
        />
      </div>
      <div className={styles.nextBtn}>
        {nextBtn && (
          <Button onClick={handleNextQuestion} className={styles.next}>
            Next
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Quiz;

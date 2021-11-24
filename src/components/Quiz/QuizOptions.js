import { useRef, useMemo } from "react";

import ShuffleArray from "../utils/ShuffleArray";
import styles from "./QuizOptions.module.scss";

const QuizOptions = ({
  onShowAnswer,
  result,
  setResult,
  optionsArray,
  isAnswerCorrect,
}) => {
  const answersRef = useRef(null);

  const checkAnswerHandler = (e) => {
    const element = e.currentTarget;
    const children = element.parentNode.children;
    let checked = false;
    const value = element.lastElementChild.textContent;
    onShowAnswer(answersRef.current.children);

    for (const child of children) {
      if (child.classList.contains(styles.correctAnswer)) {
        checked = true;
      }
    }

    if (!checked) {
      if (value === isAnswerCorrect) {
        element.classList.add(styles.correctAnswer);
        setResult(result + 1);
      } else {
        element.classList.add(styles.wrongAnswer);
        for (let child of children) {
          if (child.lastElementChild.textContent === isAnswerCorrect) {
            child.classList.add(styles.correctAnswer);
          }
        }
      }
    }
  };

  useMemo(() => {
    return ShuffleArray(optionsArray);
  }, [optionsArray]);

  return (
    <div className={styles.fullWidth} ref={answersRef}>
      {optionsArray.map((option) => (
        <div
          className={styles.btnAnswer}
          key={option.cca3}
          onClick={checkAnswerHandler}
        >
          <p>{option.name.common}</p>
        </div>
      ))}
    </div>
  );
};

export default QuizOptions;

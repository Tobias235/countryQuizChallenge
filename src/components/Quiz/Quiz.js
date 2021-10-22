import { useState, useEffect, useMemo, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import QuizFlag from "./QuizFlag";
import QuizTitle from "./QuizTitle";
import styles from "./Quiz.module.css";

const Quiz = (props) => {
  const [question, setQuestion] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState("");
  const [optionsArray, setOptionsArray] = useState([]);
  const [result, setResult] = useState(0);
  const [next, setNext] = useState(0);
  const [nextBtn, setNextBtn] = useState(false);
  const answersRef = useRef(null);

  const countriesArray = props.countries;
  const number = Math.floor(Math.random() * 250);

  let optionArray = [];

  useEffect(() => {
    if (props.showGame) {
      setQuestion(countriesArray[number].flags.png);
    } else {
      if (countriesArray[number].hasOwnProperty("capital")) {
        setQuestion(countriesArray[number].capital);
      }
    }
    setOptionsArray(countriesArray[number]);
    setIsAnswerCorrect(countriesArray[number].name.common);
    setOptionsArray((optionsArray) => [...optionArray, optionsArray]);
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * 250);
      let countryName = countriesArray[random].cca3;
      if (
        countriesArray[number].cca3 === countryName ||
        optionArray.some((el) => el.cca3 === countryName)
      ) {
        random = random + 1;
        optionArray.push(countriesArray[random]);
      } else {
        optionArray.push(countriesArray[random]);
      }
    }

    let timer = setTimeout(() => {}, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [next]);

  const shuffleArray = (arr) => {
    let currentIndex = arr.length,
      randomIndex;
    if (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  const shuffledCards = useMemo(() => {
    return shuffleArray(optionsArray);
  }, [optionsArray]);

  const checkAnswerHandler = (e) => {
    const element = e.currentTarget;
    const children = element.parentNode.children;
    let checked = false;
    const value = element.lastElementChild.textContent;

    for (const child of children) {
      if (child.classList.contains(styles.correctAnswer)) {
        checked = true;
      }
    }

    if (!checked) {
      setNextBtn(true);
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

  const handleNextQuestion = () => {
    setNextBtn(false);
    const answers = answersRef.current.children;

    for (const answer of answers) {
      answer.classList.remove(styles.wrongAnswer, styles.correctAnswer);
    }

    setNext(next + 1);
    if (next === 9) {
      props.onShowResult({
        showResult: true,
        result: result,
      });
    }
  };

  return (
    <Card shuffledCards={shuffledCards}>
      {props.showGame && <QuizFlag flag={question} />}
      <div className={styles.buttonContainer}>
        <QuizTitle show={props.showGame} capital={question} />
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

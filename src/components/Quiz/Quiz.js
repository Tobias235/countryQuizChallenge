import { useState, useEffect, useMemo, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Quiz.module.css";

const Quiz = (props) => {
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
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
    if (countriesArray[number].hasOwnProperty("capital")) {
      setCapital(countriesArray[number].capital);
    }
    setFlag(countriesArray[number].flags.png);
    setOptionsArray(countriesArray[number]);
    setIsAnswerCorrect(countriesArray[number].name.common);

    setOptionsArray((optionsArray) => [...optionArray, optionsArray]);
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * 250);
      if (countriesArray[number] === countriesArray[random]) {
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
      if (value === isAnswerCorrect) {
        element.classList.add(styles.correctAnswer);
        setResult(result + 1);
        setNextBtn(true);
      } else {
        element.classList.add(styles.wrongAnswer);
        setNextBtn(true);
        for (let child of children) {
          if (child.lastElementChild.textContent === isAnswerCorrect) {
            child.classList.add(styles.correctAnswer);
          }
        }
      }
    }
  };

  const handleNextQuestion = () => {
    const answers = answersRef.current.children;

    for (const answer of answers) {
      answer.classList.remove(styles.wrongAnswer, styles.correctAnswer);
    }

    setNext(next + 1);
    if (next === 100) {
      props.onShowResult({
        showResult: true,
        result: result,
      });
      setResult(0);
    }
  };

  const capitalCity = (
    <div>
      <p className={styles.capitalCity}>{capital} is the capital of</p>
    </div>
  );
  const country = (
    <div>
      <p className={styles.capitalCity}>
        Which country does this flag belong to?
      </p>
    </div>
  );

  const show = props.showGame ? country : capitalCity;
  return (
    <Card shuffledCards={shuffledCards}>
      {props.showGame && (
        <div className={styles.flag}>
          <img src={flag} alt="Flag of country" />
        </div>
      )}
      <div className={styles.buttonContainer}>
        {show}
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

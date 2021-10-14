import { useState, useEffect } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Quiz.module.css";

const Quiz = (props) => {
  const [capital, setCapital] = useState("");
  const [flag, setFlag] = useState("");
  const [optionsArray, setOptionsArray] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState("");
  const [result, setResult] = useState(1);
  const [next, setNext] = useState(false);

  const countriesArray = props.countries;
  const number = Math.floor(Math.random() * 250);
  let optionArray = [];

  useEffect(() => {
    setFlag(countriesArray[number].flags.png);
    setOptionsArray(countriesArray[number]);
    if (countriesArray[number].captial === "") {
      return;
    } else {
      setCapital(countriesArray[number].capital);
    }
    setIsAnswerCorrect(countriesArray[number].name.common);
    setOptionsArray((optionsArray) => [...optionArray, optionsArray]);
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 250);

      if (
        countriesArray[random].capital === "" ||
        countriesArray[random].cca3 === optionsArray.cca3
      ) {
        return;
      } else {
        optionArray.push(countriesArray[random]);
      }
    }

    let timer = setTimeout(() => {}, 10000);
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

  shuffleArray(optionsArray);

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
        console.log(result);
      } else {
        element.classList.add(styles.wrongAnswer);
        for (let child of children) {
          if (child.lastElementChild.textContent === isAnswerCorrect) {
            child.classList.add(styles.correctAnswer);
            setTimeout(() => {
              setResult(1);
              props.onShowResult({
                showResult: true,
                result: result,
              });
            }, 1000);
          }
        }
      }
    }
  };

  const handleNextQuestion = () => {
    setNext(!next);
    if (result === 10) {
      props.onShowResult(true);
      props.onShowScore(result);
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
    <Card>
      {props.showGame && (
        <div className={styles.flag}>
          <img src={flag} alt="Flag of country" />
        </div>
      )}
      <div className={styles.buttonContainer}>
        {show}
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
      <div className={styles.nextBtn}>
        <Button onClick={handleNextQuestion} className={styles.next}>
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Quiz;

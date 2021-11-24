import { useEffect, useState } from "react";

const useGetOptions = (showgame, countries, next) => {
  const [optionsArray, setOptionsArray] = useState([]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState("");
  const [question, setQuestion] = useState("");
  const number = Math.floor(Math.random() * 250);

  const getAnswerOptions = () => {
    let optionArray = [];

    if (showgame) {
      setQuestion(countries[number].flags.png);
    } else {
      if (countries[number].hasOwnProperty("capital")) {
        setQuestion(countries[number].capital);
      }
    }
    setOptionsArray(countries[number]);
    setIsAnswerCorrect(countries[number].name.common);
    setOptionsArray((optionsArray) => [...optionArray, optionsArray]);
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * 250);
      const countryName = countries[random].cca3;
      if (
        countries[number].cca3 === countryName ||
        optionArray.some((el) => el.cca3 === countryName)
      ) {
        random = random + 1;
        optionArray.push(countries[random]);
      } else {
        optionArray.push(countries[random]);
      }
    }
  };

  useEffect(() => {
    getAnswerOptions();
  }, [next]);

  return {
    optionsArray,
    isAnswerCorrect,
    question,
  };
};

export default useGetOptions;

import { useState, useEffect } from "react";

import Quizgame from "./components/Quiz/Quizgame";
import Quiz from "./components/Quiz/Quiz";
import Quizresult from "./components/Quiz/Quizresult";

function App() {
  const [option, setOption] = useState(true);
  const [game, setGame] = useState(false);
  const [countries, setCountries] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    setCountries(responseData);
  };

  const handleShowGame = (e) => {
    const game = e.target.innerHTML;
    setOption(false);
    if (game === "Capital Cities") {
      setGame(false);
    } else {
      setGame(true);
    }
  };

  const showResultHandler = (childData) => {
    const result = childData.result;
    setScore(result);
    setShowResult(childData.showResult);
  };

  const handleOptions = () => {
    setOption(true);
    setShowResult(false);
  };

  const showResultOrGame = showResult ? (
    <Quizresult
      onShowOption={handleOptions}
      onShowResult={score}
      onShowPic={showResult}
    />
  ) : (
    <Quiz
      showGame={game}
      countries={countries}
      onShowResult={showResultHandler}
      onShowScore={showResultHandler}
    />
  );

  const showOption = option ? (
    <Quizgame onShowGame={handleShowGame} />
  ) : (
    showResultOrGame
  );
  return (
    <div>
      <h1>Country Quiz</h1>
      {showOption}

      <footer>
        <p>
          created by <a href="https://tobias235.github.io/">Tobias235</a> -
          devChallenges.io
        </p>
      </footer>
    </div>
  );
}

export default App;

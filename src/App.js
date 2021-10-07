import { useState } from "react";

import Quizgame from "./components/Quiz/Quizgame";
import Quiz from "./components/Quiz/Quiz";
import Quizresult from "./components/Quiz/Quizresult";

function App() {
  const [option, setOption] = useState(true);
  const [game, setGame] = useState("");
  const [countries, setCountries] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "http://api.countrylayer.com/v2/all?access_key=c4c6c078b572dadca9ee945f91b708db"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    setCountries(responseData);
    console.log(responseData);
  };
  const showOption = option ? <Quizgame /> : <Quiz />;
  return (
    <div>
      <h1>Country Quiz</h1>
      {/* {showOption} */}
      <Quizresult />
    </div>
  );
}

export default App;

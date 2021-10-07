import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const [istrue, setistrue] = useState(false);
  const capital = (
    <p className={styles.capitalCity}>Kuala Lumpur is the capital of</p>
  );
  const country = (
    <p className={styles.capitalCity}>
      Which country does this flag belong to?
    </p>
  );

  const show = istrue ? country : capital;
  return (
    <Card>
      {istrue && <div className={styles.flag}></div>}
      <div className={styles.buttonContainer}>
        {show}
        <Button className={styles.btnAnswer}>Vietnam</Button>
        <Button className={styles.btnAnswer}>Malaysia</Button>
        <Button className={styles.btnAnswer}>Sweden</Button>
        <Button className={styles.btnAnswer}>Austria</Button>
      </div>
    </Card>
  );
};

export default Quiz;

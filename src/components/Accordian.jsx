import "../styles.css";
import { useState } from "react";

export default function Accordian({ qna }) {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className="accordian">
      <h3>
        {qna.question}
        {show ? (
          <span onClick={toggle}>-</span>
        ) : (
          <span onClick={toggle}>+</span>
        )}
      </h3>
      {show ? <p>{qna.answer}</p> : ""}
    </div>
  );
}

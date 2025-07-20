import data from "../data.json";
import Accordian from "./Accordian";

export default function Faq() {
  return (
    <div>
      <h1>FAQ's</h1>
      {data.map((item) => {
        return <Accordian key={item.id} qna={item} />;
      })}
    </div>
  );
}

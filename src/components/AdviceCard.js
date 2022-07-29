import React, { useRef } from "react";
import { useEffect, useState } from "react";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

function AdviceCard() {
  const [advice, setAdvice] = useState("");

  const ref = useRef();
  const componentRef = useRef();
  const fetchData = async () => {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleClick = (e) => {
    ref.current.classList.add("spin-animation");
    fetchData();
    setTimeout(() => {
      ref.current.classList.remove("spin-animation");
    }, 500);
  };

  // setInterval(() => {
  //   handleClick();
  // }, 7000);

  const handleSave = (e) => {
    e.preventDefault();
    window.print();
  };
  return (
    <div ref={componentRef} className="advice-card-outer">
      <div className="inner-card">
        <p>ADVICE #{advice.id}</p>
        <q>{advice.advice}</q>
        <img
          className="desk-divider"
          src="images/pattern-divider-desktop.svg"
          alt=""
        />
        <img
          className="mobil-divider"
          src="/images/pattern-divider-mobile.svg"
          alt=""
        />
      </div>
      <div onClick={handleClick} className="dice-div">
        <img src="/images/icon-dice.svg" alt="" ref={ref} />
      </div>
      <div
        onClick={() => exportComponentAsJPEG(componentRef)}
        className="save-div"
      >
        ↓
      </div>
    </div>
  );
}

export default AdviceCard;

import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim()

  const isOperator = (symbol:string) => {
    return /[*/+-]/.test(symbol);
  }

  const buttonPress = (symbol: string) => {
    if (symbol === "clear"){
      setAnswer("")
      setExpression("0")
    }
    else if (symbol === "negative"){
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    }
    else if (symbol === "percent"){
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    }
    else if(isOperator(symbol)){
      setExpression(et + " " + symbol + " ");
    }
    else if (symbol === "="){
      calculate();
    }
    else if(symbol === "0"){
      if(expression.charAt(0) !== "0"){
        setExpression(expression + symbol);
      }
    }
    else if(symbol === "."){
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if(!lastNumber) return;

      if(lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    }
    else {
      if(expression.charAt(0) === "0"){
        setExpression(expression.slice(1) + symbol);
      }
      else{
        setExpression(expression + symbol);
      }
    }
  }

  const calculate = () => {

    if(isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(" ");
    const newParts = [];

    for(let i = parts.length-1; i >= 0; i--){
      if (["*","/","+"].includes(parts[i]) && isOperator(parts[i-1])){
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while(isOperator(parts[k])){
          k--;
          j++;
        }
        i -= j;
      }
      else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if(isOperator(newExpression.charAt(0))){
      setAnswer(eval(answer + newExpression) as string);
    }
    else{
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div id='calculator'>
          <div id="display">
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button onClick={() => buttonPress("clear")} className='calcBtn' id="clear">C</button>
          <button onClick={() => buttonPress("negative")} className='calcBtn' id="negative">+/-</button>
          <button onClick={() => buttonPress("percentage")} className='calcBtn' id="percentage">%</button>
          <button onClick={() => buttonPress("/")} className='calcBtn' id="divide">/</button>
          <button onClick={() => buttonPress("7")} className='calcBtn' id="seven">7</button>
          <button onClick={() => buttonPress("8")} className='calcBtn' id="eight">8</button>
          <button onClick={() => buttonPress("9")} className='calcBtn' id="nine">9</button>
          <button onClick={() => buttonPress("*")} className='calcBtn' id="multiply">X</button>
          <button onClick={() => buttonPress("4")} className='calcBtn' id="four">4</button>
          <button onClick={() => buttonPress("5")} className='calcBtn' id="five">5</button>
          <button onClick={() => buttonPress("6")} className='calcBtn' id="six">6</button>
          <button onClick={() => buttonPress("-")} className='calcBtn' id="subtract">-</button>
          <button onClick={() => buttonPress("1")} className='calcBtn' id="one">1</button>
          <button onClick={() => buttonPress("2")} className='calcBtn' id="two">2</button>
          <button onClick={() => buttonPress("3")} className='calcBtn' id="three">3</button>
          <button onClick={() => buttonPress("+")} className='calcBtn' id="add">+</button>
          <button onClick={() => buttonPress("0")} className='calcBtn' id="zero">0</button>
          <button onClick={() => buttonPress(".")} className='calcBtn' id="decimal">.</button>
          <button onClick={() => buttonPress("=")} className='calcBtn' id="equals">=</button>
        </div>
      </div>
    </>
  )
}

export default App

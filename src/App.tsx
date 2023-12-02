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
          <button onClick={() => buttonPress("clear")} className='calcBtn light-gray' id="clear">C</button>
          <button onClick={() => buttonPress("negative")} className='calcBtn light-gray' id="negative">+/-</button>
          <button onClick={() => buttonPress("percentage")} className='calcBtn light-gray' id="percentage">%</button>
          <button onClick={() => buttonPress("/")} className='calcBtn yellow' id="divide">/</button>
          <button onClick={() => buttonPress("7")} className='calcBtn dark-gray' id="seven">7</button>
          <button onClick={() => buttonPress("8")} className='calcBtn dark-gray' id="eight">8</button>
          <button onClick={() => buttonPress("9")} className='calcBtn dark-gray' id="nine">9</button>
          <button onClick={() => buttonPress("*")} className='calcBtn yellow' id="multiply">X</button>
          <button onClick={() => buttonPress("4")} className='calcBtn dark-gray' id="four">4</button>
          <button onClick={() => buttonPress("5")} className='calcBtn dark-gray' id="five">5</button>
          <button onClick={() => buttonPress("6")} className='calcBtn dark-gray' id="six">6</button>
          <button onClick={() => buttonPress("-")} className='calcBtn yellow' id="subtract">-</button>
          <button onClick={() => buttonPress("1")} className='calcBtn dark-gray' id="one">1</button>
          <button onClick={() => buttonPress("2")} className='calcBtn dark-gray' id="two">2</button>
          <button onClick={() => buttonPress("3")} className='calcBtn dark-gray' id="three">3</button>
          <button onClick={() => buttonPress("+")} className='calcBtn yellow' id="add">+</button>
          <button onClick={() => buttonPress("0")} className='calcBtn dark-gray' id="zero">0</button>
          <button onClick={() => buttonPress(".")} className='calcBtn dark-gray' id="decimal">.</button>
          <button onClick={() => buttonPress("=")} className='calcBtn yellow' id="equals">=</button>
        </div>
      </div>
    </>
  )
}

export default App

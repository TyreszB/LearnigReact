import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
const [advice,setAdvice] = useState("")
    const[count,setCount] = useState(0)
    async function getAdvice (){
        const res = await fetch('https://api.adviceslip.com/advice')
        const  data = await res.json()
        setAdvice(data.slip.advice)
        setCount((c) => c + 1)
    }

    useEffect(function (){
        getAdvice()
    },[])

    return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
        <Messege count={count} />
    </div>
  );
}
function Messege(props){
    return(
        <p>You have read <strong>{props.count}</strong> pieces of advice</p>
    );
}


export default App;

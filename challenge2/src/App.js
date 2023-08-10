import {useState} from "react";

export default function App() {
    return (
        <Counter/>
    );
}

function Counter() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);
    const date = new Date();
    date.setDate(date.getDate() + count)

    function handlePlus() {
        setCount((c) => c + 1)
    }

    function handleMinus() {
        setCount((c) => c - 1)
    }

    return (
        <div>
            <div>
                <button onClick={() => setStep((c) => c - 1)}>-</button>
                <div>Step: {step}</div>
                <button onClick={() => setStep((c) => c + 1)}>+</button>
            </div>
            <div>
                <button onClick={() => setCount((c) => c - step)}>-</button>
                <div>Count: {count}</div>
                <button onClick={() => setCount((c) => c + step)}>+</button>
            </div>
            <div>
                <p>
                <span>{count === 0 ?
                    "Today is "
                    : count > 0
                        ? `${count} days from today is `
                        : `${Math.abs(count)} days ago was `}</span>
                    <span>{date.toDateString()}</span>
                </p>
            </div>
        </div>


    )
}


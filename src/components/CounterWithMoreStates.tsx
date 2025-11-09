import { useState } from "react";
import CounterButton from "./CounterButton.tsx";



const CounterWithMoreStates = () => {


    const [count, setCount] = useState(0);

    const [lastAction, setLastAction] = useState("");

    const [time, setTime] = useState("");

    const getCurrentTime = () => new Date().toLocaleTimeString();


    const increaseCount = () => {
        setCount(count + 1);
        setLastAction("Increase");
        setTime(getCurrentTime());
    }

    const decreaseCount = () => {

        if (count > 0) {

            setCount(count - 1);
            setLastAction("Decrease");
            setTime(getCurrentTime());
        }

    }

    const resetCount = () => {
        setCount(0);
        setLastAction("Reset");
        setTime(getCurrentTime());
    }





    return (

        <>
            <div className="space-y-4 text-xl pt-12">
                <h1 className="text-center">Count is {count} </h1>
                <div className="text-center space-x-4">

                    <CounterButton onClick={increaseCount} label={"Increase"}/>
                    <CounterButton onClick={decreaseCount} disabled={count===0} label={"Decrease"}/>
                    <CounterButton onClick={resetCount} disabled={count===0} label={"Reset"} addClass={"bg-scope-red"}/>

                </div>
            </div>

            <p className="text-center pt-8">Last change: <strong>{lastAction || "-"}</strong> at <strong>{time || "-"}</strong></p>
        </>
    )

}


export default CounterWithMoreStates;
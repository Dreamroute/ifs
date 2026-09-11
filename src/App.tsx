import {useState} from "react";

function Add({count, onClick}) {
    return (
        <>
            <button onClick={onClick}>{count}</button>
        </>
    )
}

export default function App() {
    const[count, setCount] = useState(0)
    function handleClick() {
        setCount(count + 1)
    }
    return (
        <>
            <h3>{count}</h3>
            <Add count={count} onClick={handleClick}/>
            <Add count={count} onClick={handleClick}/>
        </>
    )
}
import './app.css'
import {useState} from "react";

export default function App() {
    return (
        <>
            ww<br/>
            <MyComponent/>
        </>
    )
}

function MQ() {
    const handleClick = () => {
        console.info('mq')
    }
    return (
        <>
            <button onClick={handleClick}>TEST</button>
        </>
    )
}

function AdminPanel() {
    return (
        <>
            <div className="admin"></div>
        </>
    )
}

function LoginForm() {
    return (
        <>
            <div className="login">login ed</div>
        </>
    )
}

function OrderList() {
    const orders = [
        {id: 1, name: 'VO'},
        {id: 2, name: "PO"},
        {id: 3, name: "MRES"}
    ]
    return (
        <>
            <ul>
                {
                    orders.map(order => {
                        return <li key={order.id}>{order.name}</li>
                    })
                }
            </ul>
        </>
    )
}

function Increment() {

    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <>
            <h5>{count}</h5>
            <button onClick={handleClick}>+1</button>
        </>
    )
}

function Add(data: number, add) {
    return (
        <>
            <button onClick={add}>+</button>
        </>
    )
}

function MyComponent() {
    const handleClick = (event, data) => {
        console.info(event)
        console.info(data)
    }

    const user = {
        name: '~~',
        age: 10
    }

    const login = true;

    const [data, setData] = useState(0)
    function add() {
        setData(data + 1)
    }

    return (
        <>
            <h1 className="mm">{user.name}</h1>
            <h2 style={{
                color: 'green'
            }}>{user.age}</h2>
            <button onClick={(event) => handleClick(event, 12)}>button</button>

            {login && <LoginForm/>}
            <hr/>

            <OrderList/>
            <hr/>

            <MQ/>
            <hr/>

            <Increment/>
            <Increment/>
            <hr/>

            <h3>{data}</h3>
            <Add data={data} onClick={add}/>
            <Add data={data} onClick={add}/>
        </>
    )
}
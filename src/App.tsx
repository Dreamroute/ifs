import './app.css'

export default function App() {
    return (
        <>
            ww<br/>
            <MyComponent />
        </>
    )
}

function MyComponent() {
    const handleClick = (event, data) => {
        console.info(event)
        console.info(data)
    }

    const user = {
        name: 'w.dehi',
        age: 10
    }

    return (
        <>
            <h1 className="mm">{user.name}</h1>
            <h2>{user.age}</h2>
            <button onClick={(event) => handleClick(event, 12)}>button</button>
        </>
    )
}

import React, { useCallback, useMemo, useState } from "react";
const products = ["Tas", "Sepatu", "Baju", "Kaos Kaki"]
const ParentPage = () => {
    console.log("Render Parent Component");
    const [count, setCount] = useState(0)
    const [carts, setCarts] = useState([])
    const addLike = () => setCount(count => count + 1)
    const addItem = (item) => setCarts(carts => [...carts, item])
    const removeItem = (index) => setCarts([
        ...carts.slice(0, index),
        ...carts.slice(index + 1, carts.length)
    ])
    const memorizedRemoveItem = useCallback(removeItem, [carts])
    const memorizedAddLike = useCallback(addLike, [])
    const heavyProcess = (params) => {
        sleep(2000)
        return params
    }
    const titleProps = useMemo(() => heavyProcess("Hello World"), [])
    return (
        <React.Fragment>
            <h3>--- Parent Component ---</h3>
            <button onClick={addLike}>Like {count}</button>
            {products.map((product, i) => (
                <div key={i}>
                    <p>{product} <span><button onClick={() => addItem(product)}>Add</button></span></p>
                </div>
            ))}
            <MemorizedChildComponent title={titleProps} carts={carts} removeItem={memorizedRemoveItem} addLike={memorizedAddLike} />
        </React.Fragment>
    )
}
const ChildComponent = ({ title, carts, removeItem, addLike }) => {
    console.log("Render Child Component");
    return (
        <React.Fragment>
            <h3>--- Child Component ---</h3>
            <button onClick={addLike}>Like</button>
            <h1>{title}</h1>
            {carts.map((cart, index) => (
                <div key={index}>
                    {cart} <span><button onClick={() => removeItem(index)}>Hapus</button></span>
                </div>
            ))}
        </React.Fragment>
    )
}
const sleep = (milliseconds) => {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } while (currentDate - date < milliseconds)
}
const MemorizedChildComponent = React.memo(ChildComponent)
export default ParentPage
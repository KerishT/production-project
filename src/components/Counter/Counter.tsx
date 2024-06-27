import { useState } from "react"
import classes from "./Counter.module.scss"

const Counter = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <h1>{counter}</h1>
      <button
        className={classes.button}
        onClick={() => setCounter(counter + 1)}
      >
        Increase
      </button>
    </>
  )
}

export default Counter

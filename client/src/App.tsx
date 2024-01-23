import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store';
import { increment, decrement } from './slices/counterSlice';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value)
  
  return (
    <>
      <h2>Current value: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  )
}

export default App

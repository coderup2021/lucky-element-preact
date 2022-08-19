import { useState } from 'preact/hooks'
import { FunctionComponent as FC } from 'preact'
import './app.css'
import { h, render } from 'preact'
import Home from './components/Home'
import About from './components/About'
import Search from './components/Search'
import './styles/index.scss'
import Button from './components/Button'
import Input from './components/Input'

const App: FC<any> = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <span>{count}</span>
      <Button
        btnType="primary"
        disabled
        onClick={() => setCount((count) => count + 1)}
      >
        测试
      </Button>
      <Input name="xxxx" value="1234"></Input>
    </>
  )
}
export default App

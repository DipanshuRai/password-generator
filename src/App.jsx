import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [allowNum, setAllowNum] = useState(false)
  const [allowSpecialChar, setAllowSpecialChar] = useState(false)
  const [length, setLength] = useState(8)

  const passwordRef = useRef(null)

  const passwordGenerator = () => {
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let password = ""
    if (allowNum)
      string += "0123456789"
    if (allowSpecialChar)
      string += "@#$&*-"
    for (let i = 0; i < length; i++) {
      let randomNum = Math.floor(Math.random() * string.length + 1)
      password += string.charAt(randomNum)
    }
    setPassword(password)
  }

  const passwordCopy = useCallback(() => {
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, allowNum, allowSpecialChar])

  return (
    <>
      <div className="main">
        <div className="heading">Password Generator</div>
        <div className="input">
          <input
            id="text"
            type="text"
            value={password}
            placeholder='Password'
            ref={passwordRef}
            readOnly
          />
          <button className="copy" onClick={passwordCopy}>Copy</button>
        </div>
        <div className="range">
          <input
            type="range"
            min={8}
            max={15}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length : {length}</label>
        </div>
        <div className="extras">
          <div>
            <input
              type="checkbox"
              id='numInput'
              defaultChecked={allowNum}
              onChange={() => { setAllowNum((prev) => !prev) }}
            />
            <label htmlFor='numInput'>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id='charInput'
              defaultChecked={allowSpecialChar}
              onChange={() => { setAllowSpecialChar((prev) => !prev) }}
            />
            <label htmlFor='charInput'>Special Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

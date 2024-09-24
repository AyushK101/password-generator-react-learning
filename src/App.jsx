import { useCallback, useEffect, useState, useRef } from "react"


function App() {
  let [len, setLen] = useState(1);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const passRef = useRef(null);

  const passGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()-_=+\\|{};:/?.>"
    
    for(let i=0; i<len; i++) {
      let random = Math.floor( (Math.random() * str.length )) // as string start index 0 then can take from { 0 to str.len-1 }
      pass += str[random]
    }
    console.log(pass);
    
    setPass(pass)

  }, [len, numAllowed, charAllowed, setPass]) // TO OPTIMIZE : that's why setPass is also given to optimize 

  const copyPassToClipboard = useCallback( ()=> {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(1,3);
    window.navigator.clipboard.writeText(pass);
  },[pass])

  useEffect( ()=>{
    passGenerator()
  },[len, numAllowed, charAllowed, passGenerator]) // IF DEPENDENCIES CHANGE , RUN AGAIN  

/* <div className="h-screen w-full max-w-[600px] max-h-32 absolute top-[35%] left-[28%] rounded-md "></div> */
  return (
    < >
      <div className="w-full max-w-md mx-auto shadow-sm rounded-lg px-4 py-2 my-8 text-white">
        <h1 className="text-center mb-3 text-4xl font-bold">Password Generator</h1>
        <div className="input&copy flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value={pass}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="password"
          readOnly
          ref={passRef}
          
          />
          <button onClick={copyPassToClipboard} 
          className="px-3 bg-blue-600 shadow shrink-0 hover:bg-blue-800">copy</button>
        </div>
        <div className="parentInputContainer flex text-sm gap-x-2">
          <div className="lengthInput flex items-center gap-x-1">
            <input 
            type="range"  
            min={6}
            max={100}
            value={len}
            className="cursor-pointer"
            onChange={( (e)=> { setLen(e.target.value)})}
            />
            <label >length: {len}</label>
          </div>
          <div className="checkboxDiv flex items-center gap-x-1">
            <input
            type="checkbox" 
            defaultChecked={numAllowed}
            onChange={() => setNumAllowed( (prev) => !prev)} 
            />
            <label >number </label>
            <input
            type="checkbox" 
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed( (prev) => !prev)} 
            />
            <label >character</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App

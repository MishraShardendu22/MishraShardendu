import { useState,useCallback, useEffect, useRef } from "react";
import './App.css'
import Name from "./Name";

function App() {
  const [length,SetLen] = useState(8);
  const [numAlwd,SetNum] = useState(false);
  const [charAlwd,SetChar] = useState(false);
  const [pass,SetPass] = useState("");

  const PassRef = useRef(null);

  const GenratePassword = useCallback(() =>  {
    let CurrPass = "";
    let str = "abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numAlwd){
      str += "1234567890";
    }
    if(charAlwd){
      str += "!@#$%&*()_+-=";
    }


    for(let i=0;i<length;i++){
      let idx = Math.floor(Math.random()*(str.length) + 1);
      CurrPass += str[idx];
    }

    SetPass(CurrPass);
  },[length,numAlwd,charAlwd]);

  const CopyPass = () => {
    window.navigator.clipboard.writeText(pass)
    PassRef.current?.select()
  }

  useEffect(() => {
    GenratePassword()
  },[length,numAlwd,charAlwd]);

  return (
    <>
      <div className="bg-orange-300 rounded-3xl h-56">
        <div className="italic underline font-extrabold text-center text-4xl my-4 text-orange-800">
          Random Password Generator
        </div>
        <input readOnly placeholder="Password" type="text" value={pass} className="hover:bg-slate-700 max-w-96 bg-slate-300 rounded-s-lg p-2 font-semibold text-2xl text-sky-500 my-8 justify-center grid-cols-2 duration-100" ref={PassRef}/>
        <button className=" bg-purple-300 rounded-e-lg p-2 font-semibold text-2xl text-sky-500 my-8 justify-center grid-cols-2 hover:bg-purple-700  hover:text-sky-700 duration-100" onClick={CopyPass}>Copy</button>
        <br/>
        <input type="range" defaultValue={8} min={8} max={20} onChange={(e) => SetLen(e.target.value)} className="cursor-pointer" />
        <label htmlFor="length" className="bg-slate-300 rounded font-medium mx-2 px-2">Length : {length}</label>
        <input className="" type="checkbox" defaultChecked={numAlwd} onChange={() => {
          SetNum((numAlwd) => !(numAlwd))
        }}/><label htmlFor="number" className="bg-slate-300 rounded font-medium mx-1 px-2">Want Numbers ?</label>
        <input className="" type="checkbox" defaultChecked={charAlwd} onChange={() => {
          SetChar((charAlwd) => !(charAlwd))
        }}/><label htmlFor="charecter" className="bg-slate-300 rounded font-medium mx-1 px-2">Want Charecters ?</label>
      </div>
      <div className="my-52">
        <Name />
      </div>
    </>
  )
}

export default App
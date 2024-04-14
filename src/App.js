import './App.css';
import { useState,useCallback, useEffect, useRef } from 'react';

function App() {
  const [length,setLength]=useState(8);
  const [numAll,setNumAll]=useState(false);
  const [charAll,setCharAll]=useState(false);
  const [password,setPassword]=useState(""); //As password in input box also changes its state

  // useRef
  const passRef=useRef(null);

  const passwordGener=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAll){
      str+="0123456789"
    }
    if(charAll){
      str+="!@#$%&*(){}|~"
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length +1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[numAll,charAll,length,setPassword])

  // Copy button function
  function handleCopy(e){
    e.stopPropagation();
    window.navigator.clipboard.writeText(passRef.current.value);
    passRef.current?.select();
  }
  
   useEffect(()=>{
    passwordGener();
   },[length,numAll,charAll,passwordGener]);
  
  return (
    <>
      <div className="bg-slate-900 h-[100vh] w-full flex justify-center ">
        <div className='bg-slate-700 h-[200px] mt-[50px] px-[20px] py-[25px] '>
          <div className=' relative overflow-hidden rounded-[10px]'>
            <input  ref={passRef} readOnly placeholder='Password' value={password} type='text' className='h-[50px] w-[470px] pl-[18px] pr-[120px] text-[20px] text-orange-500 '></input>
            <button onClick={handleCopy} className=' h-[50px] w-[90px]  bg-blue-700 text-white text-[20px] absolute right-[0px] hover:bg-blue-400 active:bg-blue-900 '>Copy</button>
          </div>
          <div className=' text-orange-400 mt-[20px] flex items-center '>
              <input type='range' min={6} max={50} value={length} onChange={(e)=>{
                setLength(e.target.value)
              }}/>
              <label><pre> Length:{length}</pre></label>
              <input type="checkbox" name='number' className='ml-[20px]' defaultChecked={numAll} onChange={()=>{
                setNumAll(prev=> !(prev))
              }}/>
              <label htmlFor='number'><pre>:Numbers</pre></label>
              <input type="checkbox" name='character' className='ml-[20px]' defaultChecked={charAll} onChange={()=>{
                setCharAll(prev => !(prev))
              }}/>
              <label htmlFor='character'><pre>:Characters</pre></label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

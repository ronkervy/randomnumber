import React,{useState,useEffect} from 'react';
import './styles/style.css';

function App() {

  const [selected,setSelected] = useState({
    num : 1,
    xnum : [],
    rnum : []
  });
  
  const [numrange,setNumRange] = useState({
      min : 0,
      max : 0
  });

  function randomize(){
      setSelected({...selected,num : 0});
      let randNum = Math.floor(Math.random() * ( numrange.max + 1 - numrange.min ) + numrange.min);      
      
      setTimeout(()=>{
        if( selected.xnum.indexOf( randNum ) !== -1 ) return setSelected({...selected,num:"Number already selected."});
        setSelected(prevState=>{
          return {
              num : randNum,
              xnum : [...prevState.xnum,randNum]
          }
        }); 
      },3000);
      
  }

  const GeneratingNum = ()=>{
      return  <div className="loader-wrap"><div className="loader"></div><small><em>Loading...</em></small></div>;
  }

  return (
    <div className="App">
        {selected.num ? <h1>{selected.num}</h1> : <GeneratingNum />}
        <small>
          <em>Eliminated numbers : {selected.xnum.join(',')}</em>< br/>
        </small>
        <input type="number" placeholder="from" name="min" onChange={e=>{setNumRange({...numrange,min : parseInt(e.currentTarget.value)})}}/>
        <input type="number" placeholder="to" name="max" onChange={e=>{setNumRange({...numrange,max:parseInt(e.currentTarget.value)})}}/>
        <button onClick={randomize}>Eliminate</button>
    </div>
  );
}

export default App;

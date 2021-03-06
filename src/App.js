import React,{useState} from 'react';
import Loader from './component/Loader';
import './styles/style.css';

function App() {

  const [selected,setSelected] = useState(1);
  const [randomizing,setRandomizing] = useState(false);
  const [numrange,setNumrange] = useState({
    start : 1,
    end : 1,
    xnum : []
  });

  function handleNumber(){      
      let arr = [];

      for( let i = numrange.start; i <= numrange.end; i++ ){
          arr.push(i);
      }
          
      let newArr = arr.filter(x=>numrange.xnum.indexOf(x) === -1);            

      if( newArr.length <= 0 ) return;

      let selectedNum = newArr.length > 1 ? Math.floor(Math.random() * (Math.max(...newArr) - Math.min(...newArr)) + Math.min(...newArr)) : newArr.pop();

      if( numrange.xnum.indexOf(selectedNum) === -1 ){          
            setRandomizing(true);
            setTimeout(()=>{                
                setNumrange(prevState=>{
                    return {
                        start : prevState.start,
                        end : prevState.end,
                        xnum : [...prevState.xnum,selectedNum]                
                    }
                });    
                setSelected(selectedNum);                
                setRandomizing(false);
            },3000);            
      }else{
        return handleNumber();      
      }

  }

  return (
    <div className="App">
        <div className="left">
            <h3>Eliminated Numbers</h3>
            <ul>
                {numrange.xnum.map((val,key)=>{
                    return <li><em>{key + 1})</em> <b>{val}</b></li>
                })}
            </ul>
        </div>
        <div className="right">
            {randomizing ? <Loader /> : <h1>{selected}</h1>}
            <input type="text" placeholder="Start" name="start" onChange={(e)=>{        
                let startNum = parseInt(e.target.value);    
                setNumrange(prevState=>{
                    return {
                        ...prevState,
                        start : parseInt(startNum),
                    }
                });
            }} />
            <input type="text" placeholder="End" name="end" onChange={(e)=>{
                let endNum = parseInt(e.target.value);
                setNumrange(prevState=>{
                    return {
                        ...prevState,
                        end : parseInt(endNum)
                    }
                });
            }} />
            <button onClick={handleNumber}>Eliminate</button>
        </div>
    </div>
  );
}

export default App;

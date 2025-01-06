import { useState,useEffect } from 'react';
import './SortingVisualizer.css';
import io from 'socket.io-client';
import "./Modal.css";
import { useUser } from "../src/UserContext";
import Chat from "../src/Chat";

const socket = io('http://localhost:8081');

function SortingVisualizer() {
  const {user} = useUser();
  
  const room="bubblesort";
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  },[]);

  
  const [modal, setModal] = useState(true);
  useEffect(() => {
    console.log('Modal state changed:', modal);
    if (modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }  
  }, [modal]);


  const [speedMs, setSpeedMs] = useState(2000);
  
  const code1="for (let i = 0; i < array.length; i++)"
  const code2="{ "
  const code3="   for (let j = 0; j < array.length - i - 1; j++)"
  const code4="     if (array[j] > array[j + 1])"
  const code5="        swap(array, j, j + 1); "
  const code12="};"
  const code6="swap(array, j, j + 1)"
  const code7="{"
  const code8="   int temp=array[j];"
  const code9="   array[j]=array[j+1];"
  const code10="   array[j+1]=temp;"
  const code11="};"

  const PRIMARY_COLOR = 'turquoise';
  const SECONDARY_COLOR = 'red';

  const [barsNo , setBarsNo] = useState(8);


  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  function resetArray() {
    setArray([]);
    const a = [];
    for (let i = 0; i < barsNo; i++) {
      a.push(randomIntFromInterval(5, 500));
    }
    setArray(a);
  };

  async function bubbleSort() {
    const arrayBars = document.getElementsByClassName('array-bar');
  
    for (let bar of arrayBars) {
      bar.style.transform = 'translateX(0)';
    }
    
    await new Promise((resolve) => setTimeout(resolve, 200));
  
    for (let i = 0; i < array.length; i++) {
    document.getElementById('code1').style.backgroundColor=" rgb(255, 179, 204)"
    await new Promise((resolve) => setTimeout(resolve, 500));
      for (let j = 0; j < array.length - i - 1; j++) {
        document.getElementById('code1').style.backgroundColor="rgb(255, 255, 255)"
        document.getElementById('code3').style.backgroundColor=" rgb(255, 179, 204)"
        const barOneIdx = j;
        const barTwoIdx = j + 1;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
  
        barOneStyle.backgroundColor = SECONDARY_COLOR;
        barTwoStyle.backgroundColor = SECONDARY_COLOR;
  
        await new Promise((resolve) => {
        
          setTimeout(async() => {

            document.getElementById('code4').style.backgroundColor="  rgb(179, 255, 192)"
            await new Promise((resolve) => setTimeout(resolve, 500));
            document.getElementById('code4').style.backgroundColor="rgb(255, 255, 255)"

            if (array[j] > array[j + 1]) {
              document.getElementById('code5').style.backgroundColor=" rgb(255, 179, 204)"
              // Swap values in the array
              const temp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = temp;
  
              barOneStyle.transform = 'translateX(20px)';
              barTwoStyle.transform = 'translateX(-20px)';
  
              setTimeout(() => {
                barOneStyle.transform = 'translateX(0)';
                barTwoStyle.transform = 'translateX(0)';
                const barOne = arrayBars[barOneIdx];
                const barTwo = arrayBars[barTwoIdx];
    
                const parent = barOne.parentNode;
                parent.insertBefore(barTwo, barOne);
                resolve(); 
              }, speedMs);
            } else {
              document.getElementById('code4').style.backgroundColor=" rgb(255, 0, 4)"
              await new Promise((resolve) => setTimeout(resolve, 200));
              resolve(); 
            }
          }, speedMs);
        });
        document.getElementById('code5').style.backgroundColor="rgb(245, 245, 245)"
       
        barOneStyle.backgroundColor = PRIMARY_COLOR;
        barTwoStyle.backgroundColor = PRIMARY_COLOR;
      }
      document.getElementById('code3').style.backgroundColor="rgb(245, 245, 245)"
    
      arrayBars[array.length - i - 1].style.backgroundColor = PRIMARY_COLOR;
    }
  
    for (let k = 0; k < array.length; k++) {
      arrayBars[k].style.backgroundColor = PRIMARY_COLOR;
    }
  }
  

  const [array, setArray] = useState([350, 340, 430, 320, 410, 580 ,290 ,370]);
 

  return (
    <>
   
    <div>
    {modal && 
        (<div className="modal">
            <div onClick={()=>setModal(false)} className="overlay"></div>
            <div className="modal-content">
              <h2> What is Bubble Sort ?</h2>
              <p>
                content
              </p>
              <button className="close-modal" onClick={()=>setModal(false)}>
                CLOSE
              </button>
            </div>
          </div>)}
      <div className="array-container" style={{ position: "absolute" ,left:"45%"}}>
      
      {array.map((value, idx) => (
       <div
           className="array-bar"
           key={idx}
           style={{
             backgroundColor: PRIMARY_COLOR,
             height: `${value}px`,
           }}></div>
       ))}
      </div>
      <div className="code" style={{ maxWidth: 350 ,
                    minWidth:300,
                     display:"inline",
                     justifyContent:"right"}}>
       <h3 style={{ fontWeight:300 , fontSize:25}}>Code</h3>
       <pre style={{ display:"inline"}}>
        <p id="code1">{code1}</p>  
        <p id="code2">{code2}</p>
        <p id="code3">{code3}</p>
        <p id="code4">{code4}</p>
        <p id="code5">{code5}</p>
        <p id="code12">{code12}</p>
        <p id="code6">{code6}</p>
        <p id="code7">{code7}</p>
        <p id="code8">{code8}</p>
        <p id="code9">{code9}</p>
        <p id="code10">{code10}</p>
        <p id="code11">{code11}</p>
       </pre>
      </div>
    </div>
    <div className="chat" style={{display:"flex", width:"20%",height:"90vh", borderColor:"black",borderWidth:"5px", borderStyle:"solid", position:"fixed", left:"0px", top:"0px"}} >
    {!showChat ? (
        <div className="joinChatContainer">
          <h3>login to ask doubts!</h3>
        </div>
      ) : (<div>
        <Chat socket={socket} user={user} room={room} />
        {/* <input type="text" placeholder="Ask the doubt" style={{width:"90%",height:"10%",position:"absolute", bottom:"0px",left:"0px"}}/>
        <button style={{width:"10%",height:"10%",position:"absolute", bottom:"0px",right:"0px",}} onClick={() => joinCommunity()}>~</button> */}
      </div>
      )}
    </div>
    <div className="toolbox" style={{position:"absolute" , right:"0px",left:"0px", justifyContent:"center"}}>
           <input type="number" placeholder="Length" onChange={(e) => { 
            if (e.target.value>0 && e.target.value<50){
              setBarsNo(e.target.value);
              setArray([]);
            }}}/>
           <input type="number" placeholder="Array Values" id="arrayValues"/>
           <button onClick={()=>{const value= document.getElementById('arrayValues').value; 
                                 if(0<value<500&& array.length<barsNo)
                                 setArray(a=>[...a, value]);
                                 document.getElementById('arrayValues').value="";}}>Add Value</button>
           <button onClick={resetArray}>Generate Random Array</button>
           <label>Animation Speed</label>
           <select name="animation-speed" id="speed" onChange={(e)=>{
            const s= 3000/e.target.value;
            setSpeedMs(s) }}>
            <option value="0.25">0.25</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
           {/* <button onClick={mergeSort}>Merge Sort</button>
           <button onClick={quickSort}>Quick Sort</button>
           <button onClick={heapSort}>Heap Sort</button> */}
           <button onClick={bubbleSort}>Bubble Sort</button>
           <button onClick={() =>{setModal(true)} }  className="btn-modal"> Open</button>
           {/* <button onClick={testSortingAlgorithms}>Test Sorting Algorithms (BROKEN) </button> */}
     </div></>
  )
}
export default SortingVisualizer


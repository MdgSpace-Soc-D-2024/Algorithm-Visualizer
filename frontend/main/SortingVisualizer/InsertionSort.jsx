import { useState,useEffect } from 'react';
import './SortingVisualizer.css';
import io from 'socket.io-client';
import "./Modal.css";
import { useUser } from "../src/UserContext";
import Chat from "../src/Chat";

const socket = io('http://localhost:8081');

function InsertionVisualizer() {
  const {user} = useUser();
  
  const room="insertionsort";
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

  function swapDom(a,b) 
  {
       var aParent = a.parentNode;
       var bParent = b.parentNode;
  
       var aHolder = document.createElement("div");
       var bHolder = document.createElement("div");
  
       aParent.replaceChild(aHolder,a);
       bParent.replaceChild(bHolder,b);
  
       aParent.replaceChild(b,aHolder);
       bParent.replaceChild(a,bHolder);    
  }
  

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
  async function insertionSort(arr) {
    const arrayBars = document.getElementsByClassName('array-bar');
    
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;


        while (j >= 0 && arr[j] > key) {
            // Swap values in the array
            [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];

            // Update the DOM for visual feedback
            const barOneIdx = j;
            const barTwoIdx = j + 1;
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            // Animate the bars
            barOneStyle.transform = 'translateX(30px)';
            barTwoStyle.transform = 'translateX(-30px)';

            // Wait for the animation to complete
            await new Promise((resolve) => {
                setTimeout(() => {
                    barOneStyle.transform = 'translateX(0)';
                    barTwoStyle.transform = 'translateX(0)';
                    
                    // Swap the DOM bars
                    swapDom(arrayBars[barOneIdx], arrayBars[barTwoIdx]);

                    resolve();
                },speedMs);
            });

            j--;
        }

        arr[j + 1] = key;

    }
}




  const [array, setArray] = useState([350, 340, 430, 320, 410, 580 ,290 ,370]);
 

  return (
    <>
   
    <div>
    {modal && 
        (<div className="modal">
            <div onClick={()=>setModal(false)} className="overlay"></div>
            <div className="modal-content1">
              <h2> What is Insertion Sort ?</h2>
              <p>
                content
              </p>
              <button className="close-modal1" onClick={()=>setModal(false)}>
              ×
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
      </div>
      )}
    </div>
    <div className="toolbox" style={{position:"absolute" , right:"0px",left:"0px",bottom:"0px", justifyContent:"center",padding:"5px"}}>
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

           <button onClick={()=>insertionSort(array)}>Insertion Sort</button>
           <button onClick={() =>{setModal(true)} }  className="btn-modal"> Open</button>

     </div></>
  )
}
export default InsertionVisualizer


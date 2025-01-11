
function ReplyBox(replyId, replyAuthor, replyMsg, replyDate, replyTime) {
    console.log("uhqudg")
    return(
    <div
     className="reply"
     style={{borderStyle:"solid",borderColor:"grey",borderWidth:"1px",marginBottom:"5px", width:"90%",height:"450px", backgroundColor:"yellow"}}
   >{console.log("uabdiuveui")}
     <div className="reply-user">
         <p id="authorreply" style={{fontWeight:"bold", marginBottom:"0"}}>{replyAuthor}</p>
         <p id="timereply" style={{color:"grey", fontSize:"10px", marginBottom:"0"}}>{replyTime}  {replyDate}</p>
     </div>
       <div className="reply-content">
         <p>{replyMsg}</p>
       </div>
   </div>
    )
}
export default ReplyBox
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from 'prop-types'
import axios from 'axios'

function Chat({ socket, user, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyList, setReplyList] = useState([]);
  const [visibleReplies, setVisibleReplies] = useState({});


  const handleReplyClick = async(messageId) => {
  // Check if the messageId is valid
  if (!messageId) {
    console.log("Invalid messageId");
    return;
  }

  // Toggle visibility of replies for the clicked message
  setVisibleReplies((prevState) => ({
    ...prevState,
    [messageId]: !prevState[messageId], // Toggle visibility state for this message ID
  }));
  
    // Fetch replies only if they are not already fetched
    if (!replyList.some((reply) => reply.replyId === messageId)) {
      try {
        const res = await axios.get(`http://localhost:8081/replies?value=${messageId}`);
        
        // Ensure only new replies that are not already in the list are added
        const newReplies = res.data.filter(
          (message) => !replyList.some((item) => item.id === message.id)
        );
        
        // Wait for replyList state to update before proceeding
        setReplyList((prevList) => [...prevList, ...newReplies]);
        
      } catch (err) {
        console.error("Error fetching replies:", err);
      }
    }
  };

 
  useEffect(() => {
    axios.get(`http://localhost:8081/community?value=${room}`)
    .then(res => {
        console.log(res)
        setMessageList((list) => {
          const newMessages = res.data.filter(
              (message) => !list.some((item) => item.id === message.id) 
          );
          return [...list, ...newMessages];
      });
    })
    .catch(err => console.log(err))
  },[]);
  useEffect(() => {
    console.log("Updated messageList:", messageList);
}, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Math.floor(Date.now() * Math.random()/10000),
        room: room,
        author: user,
        message: currentMessage,
        date: new Date().toISOString().split('T')[0],
        time: 
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      axios.post('http://localhost:8081/mysql/community', messageData)
                .then(res => {
                    console.log("Response:", res);
                })
                .catch(err => {
                    console.error("Error during Axios request:", err);
                });
      setCurrentMessage("");
    }
  };
  
    const sendReply = async (id) => {
    if (replyMessage !== "") {
      const messageData = {
        replyId: id,
        replyAuthor: user,
        replyMsg: replyMessage,
        replyDate: new Date().toISOString().split('T')[0],
        replyTime: 
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setReplyList((list) => [...list, messageData]);
      axios.post('http://localhost:8081/mysql/replies', messageData)
                .then(res => {
                    console.log("Response:", res);
                })
                .catch(err => {
                    console.error("Error during Axios request:", err);
                });
      setReplyMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      axios.post('http://localhost:8081/mysql/community', data)
                .then(res => {
                    console.log("Response:", res);
                })
                .catch(err => {
                    console.error("Error during Axios request:", err);
                });
    });
  }, [socket,messageList]);

  return (<>
    <div className="chat-window" style={{ position:"absolute", top:0,left:0,right:0,bottom:0}}>
      <div className="chat-header">
        <p style={{backgroundColor:"black", marginBottom:"0",textAlign:"center",color:"white",padding:"5px"}}>COMMUNITY</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,index) => {
            return (<>
            {console.log(messageContent)}
              <div
               key={messageContent.id}
                className="message"
                id={user === messageContent.author ? "you" : "other"}
                style={{borderStyle:"solid",borderColor:"grey",borderWidth:"1px",marginBottom:"5px"}}
              >
                <div>
                <div className="message-meta">
                    <p id="author" style={{fontWeight:"bold", marginBottom:"0"}}>{messageContent.author}</p>
                    <p id="time" style={{color:"grey", fontSize:"10px", marginBottom:"0"}}>{messageContent.time}  {messageContent.date}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  
                <button id={index} style={{position:"relative",bottom:"5px",right:"0px",margin:0,fontSize:"14px",color:"grey",borderColor:"white",backgroundColor:"white",boxShadow:"none",padding:"5px"}}
                  onClick={() => {handleReplyClick(messageContent.id)
                  }} className="btn-reply">
                {visibleReplies[messageContent.id] ? 'Hide Replies' : 'Reply'}
                {console.log(visibleReplies[messageContent.id])}
                </button>
                </div>
                
                {visibleReplies[messageContent.id] && (
                  replyList.filter(reply => reply.replyId === messageContent.id)
                .map((replyContent, replyIndex) =>
                   {       
                  return (
                    <div
                     key={`${replyContent.replyId}*${replyIndex}`}
                      className="reply"
                      style={{borderStyle:"solid",borderColor:"grey",borderWidth:"1px",marginBottom:"5px", width:"90%",height:"auto",position:"relative",right:"0px", backgroundColor:"yellow"}}
                    >
                    {console.log(replyContent)}  
                  {console.log(messageContent.id)  // Check the value of messageContent.id
                  }
                      <div className="reply-user">
                          <p id="authorreply" style={{fontWeight:"bold", marginBottom:"0"}}>{replyContent.replyAuthor}</p>
                          <p id="timereply" style={{color:"grey", fontSize:"10px", marginBottom:"0"}}>{replyContent.replyTime}  {replyContent.replyDate}</p>
                      </div>
                        <div className="reply-content">
                          <p>{replyContent.replyMsg}</p>
                        </div>
                    </div>
                      )})&&
                    
                      <div className="chat-footer">
                      <input
                        key={messageContent.id}
                        type="text"
                        value={replyMessage}
                        placeholder="reply..."
                        style={{position:"relative",bottom:0,left:0,width:'90%',margin:0}}
                        name="Reply"
                        onChange={(event) => {
                          setReplyMessage(event.target.value);       
                        }}
                        onKeyDown={(event) => {
                          event.key === "Enter" && sendReply(messageContent.id);
                        }}
                      />
                      <button onClick={()=>{sendReply(messageContent.id)}} style={{position:"relative", bottom:0,right:0 , width:'10%',margin:0}}>&#9658;</button>
                    </div>
                )}
              </div></>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Ask the doubt!"
          style={{position:"absolute",bottom:0,left:0,width:'90%',margin:0}}
          name="Message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);       
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage} style={{position:"absolute", bottom:0,right:0 , width:'10%',margin:0}}>&#9658;</button>
      </div>
    </div>
    </>
  );
}
Chat.propTypes = {
  socket: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired, 
  room: PropTypes.string.isRequired,
};

export default Chat;
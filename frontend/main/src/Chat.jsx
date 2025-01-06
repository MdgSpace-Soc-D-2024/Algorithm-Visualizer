import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from 'prop-types'
import axios from 'axios'

function Chat({ socket, user, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
 
  useEffect(() => {
    axios.get(`http://localhost:8081/community?value=${room}`)
    .then(res => {
        console.log(res)
        setMessageList((list) => {
          const newMessages = res.data.filter(
              (message) => !list.some((item) => item.id === message.id) // Assuming each message has a unique `id`
          );
          return [...list, ...newMessages];
      });
    })
    .catch(err => console.log(err))
  },[]);
  useEffect(() => {
    console.log("Updated messageList:", messageList); // Logs the updated state
}, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
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
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,index) => {
            return (<>
              <div
               key={index}
                className="message"
                id={user === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}  {messageContent.date}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div></>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
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
  user: PropTypes.string.isRequired, // Updated to validate username
  room: PropTypes.string.isRequired,
};

export default Chat;
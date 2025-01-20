import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import {Server} from 'socket.io'
import * as http from 'http';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"mysql"
})
 

app.post("/mysql/community", (req, res) => {
    console.log("Request received:", req.body);
    const sql = "INSERT INTO bubblesort (`id`,`room`,`author`, `message`,`date`,`time`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.room,
        req.body.author,
        req.body.message,
        req.body.date,
        req.body.time
    ];
    console.log(values);
    db.query(sql, [values],(err, result)=> {
        if (err) {
            console.error("Database Error:", err);
            return res.json(err);
        }
        console.log("Database Insert Result:", result);
        return res.json(result);
    });
});

app.post("/mysql/replies", (req, res) => {
    console.log("Request received:", req.body);
    const sql = "INSERT INTO replies (`replyId`,`replyAuthor`, `replyMsg`,`replyDate`,`replyTime`) VALUES (?)";
    const values = [
        req.body.replyId,
        req.body.replyAuthor,
        req.body.replyMsg,
        req.body.replyDate,
        req.body.replyTime
    ];
    console.log(values);
    db.query(sql, [values],(err, result)=> {
        if (err) {
            console.error("Database Error:", err);
            return res.json(err);
        }
        console.log("Database Insert Result:", result);
        return res.json(result);
    });
});

app.post("/mysql", (req, res) => {
    console.log("Request received:", req.body);
    const sql = "INSERT INTO userdata (`Username`, `Email`, `Password`) VALUES (?)";
    const values = [
        req.body.Username,
        req.body.Email,
        req.body.Password
    ];
    console.log(values);
    db.query(sql, [values],(err, result)=> {
        if (err) {
            console.error("Database Error:", err);
            return res.json(err);
        }
        console.log("Database Insert Result:", result);
        return res.json(result);
    });
});
app.post("/mysql/login", (req, res) => {
    console.log("Request received:", req.body);
    const sql = "SELECT * FROM userdata  WHERE Username=(?) AND Password= (?)";
    const values = [
        req.body.Username,
        req.body.Password
    ];
    console.log(values);
    db.query(sql, values,(err, result)=> {
        if (err) {
            console.error("Database Error:", err);
            return res.json(err);
        }
        console.log(result);
        if(result.length>0){
            res.send(result);
        }
        else {
            res.send({message:"Wrong username/passowrd combination!"})
        }
    });
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected successfully!");
        connection.release();
    }
});

app.get("/community",(req,res)=>{
    console.log("Request received");
    const value= req.query.value;
    const sql = "SELECT * FROM `bubblesort` WHERE room=?";
    db.query(sql,[value],(err,result)=>{
        if(err) return res.json({Message:"Error inside the server"});
        return res.json(result);
    })
})

app.get("/replies",(req,res)=>{
    console.log("Request received");
    const value= req.query.value;
    const sql = "SELECT * FROM `replies` WHERE replyId=?";
    db.query(sql,[value],(err,result)=>{
        if(err) return res.json({Message:"Error inside the server"});
        return res.json(result);
    })
})

app.get("/",(req,res)=>{
    console.log("Request received");
    const value= req.query.value;
    const sql = "SELECT * FROM `userdata` WHERE Username = ?";
    db.query(sql,[value],(err,result)=>{
        if(err) return res.json({Message:"Error inside the server"});
        return res.json(result);
    })
})

app.get("/read/:email",(req,res)=>{
    const sql = "SELECT * FROM userdata WHERE Email=?";
    const email= req.params.email;
    db.query(sql,[email],(err,result)=>{
        if(err) return res.json({Message:"Error inside the server"});
        return res.json(result);
    })
})

app.put("/update", (req, res) => {
    const values = [
        req.body.Username,
        req.body.Password,
        req.query.value
    ];
    db.query(
      "UPDATE userdata SET Username = ? , Password=? WHERE Email = ?",
      values,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_community", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined community: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(8081, () => {
    console.log("Server running on port 8081");
});

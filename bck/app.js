const bodyparser    = require('body-parser')
const cors          = require('cors')
const cookieParser  = require("cookie-parser");
const logger        = require("morgan");
const path          = require("path");
const app           = require('express')()
const mongoose      = require('mongoose')
const server        = require('http').createServer(app)
const io            = require('socket.io')(server)


let users= []
let gralMssgs=[]
mongoose
.connect("mongodb://localhost/serviceschat", { useNewUrlParser: true, useUnifiedTopology: true })
.then(x       =>x)
  .catch(err    => err)

const PORT = 3000;
app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
io.on('connection', function (socket) {
    socket.on('userinroom', function(data){
                users.push(data)
                console.log(users);
                socket.broadcast.emit('userinroomfr', users)
                socket.emit('userinroomfr', users)
                    })
    socket.on('messagefront', (data)=>{
        gralMssgs.push(data)
        console.warn(gralMssgs);
        socket.broadcast.emit('messagesback',gralMssgs)
        socket.emit('messagesback',gralMssgs)
        // console.log({msgs, id, date, nickname:author });
    })

    socket.on('newnick' ,function(data){
        console.log(data);


        users[data.i]= data.newnick
        console.log(users);
        
        socket.broadcast.emit('updateNickname', users)
        socket.emit('updateNickname', users)
        });

}
);


app.get('/', (req,res)=>{
    res.status(200).json(users)
})

server.listen(PORT, () =>{
    console.log(` http://localhost:${PORT}`)
})


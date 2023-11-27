const express = require("express");
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } =  require("socket.io");
const Actions = require('./Actions');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

const users = {};

//Get an array of all the users connected in the room as an array of objects with socketId and username as their attributes.
const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId)).map((socketId) => {
        return {
            socketId,
            username: users[socketId]
        }
    })
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });  

io.on('connection', (socket) => {
    //Listen for any join event populate the users object and get all connected clients and for every client emit another event joined.
    socket.on(Actions.JOIN, ({roomId, username}) => {
        const userName = username;
        users[socket.id] = username;
        socket.join(roomId);
        //This clients array is send as one of the values to the client side ehere it is used to set the state of client.
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({socketId}) => {
            io.to(socketId).emit(Actions.JOINED, {
                clients,
                userName,
                socketId: socket.id
            })
        })
    })

    //Executes whenever a user leaves the room. 
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(Actions.DISCONNECTED,{
                socketId : socket.id,
                username : users[socket.id]
            })
        });
        delete users[socket.id];
        socket.leave();
    })

    //Listen to any code change events from the client side whenever user writes something in code editor and broadcast it to all other connected clients.
    socket.on(Actions.CODE_CHANGE, ({ roomId, code, name }) => {
        socket.in(roomId).emit(Actions.CODE_CHANGE, { code : code, name });
    })

    //This event is emited from the as a response of joined event from the client side.
    //Emitted by everyone except the newly joined user.
    socket.on(Actions.SYNC_CODE, ({ code, socketId, name }) => {
        //Emit an event as a response to change code in new users editor. This event is emited once when a new user first joines or the page reloads. 
        socket.to(socketId).emit(Actions.CODE_CHANGE, { code : code, name : name }); 
    })
})

const port = process.env.PORT || 5000;
server.listen(port, "0.0.0.0", () => {console.log(`Alpha is online on ${port}`)});
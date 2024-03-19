const http = require('http');
const cors = require('cors')

const express = require('express');
const app = express();

app.use(cors());
const server = http.createServer(app);

// const CronJob = require("cron").CronJob;

// var job = new CronJob(
//     '* * * * * *',
//     function() {
//         console.log('You will see this message every second');
//     },
//     null,
//     true,
//     'Asia/Kathmandu'
// );

const socketio = require("socket.io")(server, { cors: { origin: "*" } })

require("./config/mongo.config");

const routes = require("./routes")
const routesV2 = require("./routes/v2.routes");
const { MulterError } = require('multer');

// const router = express.Router();

const ChatMessageModel = require("./src/model/chatmessages");

const connectedUsers = {};
/**** Socket server TEST: React Start  */
socketio.on("connection", (socket) => {
    console.log("server is connected...")

    socket.on('login', (userId) => {
        connectedUsers[userId] = socket.id;
    });

    //socket.emit('msg-received', { message: "Hello Client!!" })

    socket.on("msg-send", async (payload) => {

        console.log(connectedUsers)

        let chatMsg = new ChatMessageModel(payload)
        await chatMsg.save()
        let allMsg = await ChatMessageModel.find();

        socket.to(connectedUsers[payload.receiverId]).emit("new-message", allMsg);
    })

})




app.use("/assets", express.static(process.cwd() + "/public"))


// body 
// body-> content type => json , urlencoded
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


// mounting of routes
app.use("/api/v1", routes);
app.use("/api/v2", routesV2)


// router.get("/url", (req, res, next) => {
//     res.json();
// })

// app.use(router);


// 404 route in express
app.use((req, res, next) => {
    next({ code: 404, msg: "Resouce Not found" })
});



// Error handling middleware
app.use((error, req, res, next) => {
    let statusCode = error.code || 500;
    let msg = error.msg || "Server error..."
    let data = error.content || error;

    console.log(error);

    if (error instanceof MulterError) {
        statusCode = 400;
        msg = error.message;
        data = null
    }
    // console.log("TODO: Error on multer: ", error);
    res.status(statusCode).json({
        data: data,
        msg: msg,
        status: false,
        meta: null
    })
})


server.listen(process.env.PORT || 9005, (err) => {
    console.log(process.env.DB_URL)
    if (err) {
        console.log("Error listening to port ")
    } else {
        console.log("Server is running to port 443")
        console.log("Press CTRL+D to disconnect...")
    }
})



const express = require('express')
const app = express()
const socketio = require('socket.io')


app.use(express.static(__dirname+'/public'))


const expressServer = app.listen(8000)
const io = socketio(expressServer)


io.on('connection',(socket,req)=>{

    socket.emit('messageFromServer',{data:'this is msg from serevr'})


    socket.on('messageToServer',(data)=>{
        console.log(data)
    })

    socket.on('newMsgToServer',(data)=>{
        console.log(data)
        io.emit('msgToClient',data)
    })


})
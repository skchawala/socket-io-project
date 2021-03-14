const socket = io('http://localhost:8000')
const socket2 = io('http://localhost:8000/admin')



socket.on('connect',()=>{
    console.log(socket.id)
})
socket2.on('connect',()=>{
    console.log(socket2.id)
})
socket2.on('welcome',(data)=>{
    console.log(socket2.id,data)
})
socket2.on('joined',(data)=>{
   console.log('new scoket joined',data)
})
socket.on('joined',(data)=>{
    console.log('new scoket joined',data)
})

socket.on('messageFromServer',(data)=>{
    console.log(data)
    socket.emit('messageToServer',{data:'this is from client'})

})

const listP = document.getElementById('messages')

function appendDataToList(data){
    const li = document.createElement('li')
    li.innerText = data.text||''
    listP.appendChild(li)
}
//msgToClient
socket.on('msgToClient',(data)=>{
    console.log(data)
    appendDataToList(data)
})

document.getElementById('message-form').addEventListener('submit',(event)=>{
    event.preventDefault()
    const msg  = document.getElementById('user-msg').value
    console.log("Form submiited",msg)
    socket.emit('newMsgToServer',{text:msg})
})
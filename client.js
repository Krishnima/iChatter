const socket= io('https://localhost:8000');

// get dom elts in respective js variables
const form=document.getElementById('send-conatiner');
const messageInput= document.getElementById('messsgeInp')
const messageContainer= document.querySelector(".container")
// audio that will play on receiving meassages
var audio = new Audio('ting.mp3');

//function which will append event info to the container
const append =  (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    if(position == 'left'){
    audio.play();
    }
}

//Ask the new user for his/her name 
const name= prompt("enter our name to join");
socket.emit('new-user-joined', name);

//if a new user joins, receives the evnt from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

//if server sends a message, receive it 
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

//if a user leaves the chat,append the info to the container
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

//if the form gets submitted send messge to the server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
   const message = messageInput.value;
   append(`You: ${message}`, 'right');
   socket.emit('send', message);
   messageInput.value = ''
})

const socket = io('https://chatapp12123.herokuapp.com/');



const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.container');

const append = (message, position) => {
const messageElement = document.createElement('div')
messageElement.innerText = message;
messageElement.classList.add('message')
messageElement.classList.add(position)
messagecontainer.append(messageElement);
}


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'outgoing-message')
    socket.emit('send', message)
    messageInput.value = ''
})
const name = prompt("Enter your name to join") 
socket.emit('new-user-joined', name);

socket.on('user-joined' , name => {
 append(`${name} joined the chat`, 'outgoing-message')
 })


socket.on('receive' , data => {
append(`${data.name}: ${data.message}`, 'incoming-message')
})

socket.on('left' , name => {
append(`${name} left the chat`, 'incoming-message')
})


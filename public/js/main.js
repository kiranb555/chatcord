const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages") 
const socket = io();

console.log(socket);

// message from server
socket.on('message', message =>{ console.log(message);
    outputMessage(message);

    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
} );


// meassage submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;
// alert("msg")
    // Emit message to server 
    socket.emit('chatMessage', msg)
})

// output messge to DOM 

function outputMessage(message){

    console.log(message, "message from message function")
    const div = document.createElement('div');

    console.log(div);
    div.classList.add('message');

    div.innerHTML  = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`; 

    document.querySelector('.chat-messages').appendChild(div)
}
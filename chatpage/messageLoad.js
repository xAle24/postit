let fetchMessages = () => {
    fetch('messageLoad.php')
    .then(response => response.json())
    .then(messages => {
        let chatView = document.getElementById("chat-window");
        while (chatView.firstChild) {
            chatView.removeChild(chatView.firstChild);
        }        
        messages.forEach(message => {
            console.log(message.content);
            let messageContent = document.createElement("p");
            let senders = document.createElement('strong');
            let textNode = document.createTextNode(message.content);
            senders.textContent = message.Sen_email + ":";
            messageContent.appendChild(senders);
            messageContent.appendChild(textNode);
            chatView.appendChild(messageContent);
        })
    })
    .catch(error => console.error('Error:', error));
};

// Call the function every n milliseconds
setInterval(fetchMessages, 100);

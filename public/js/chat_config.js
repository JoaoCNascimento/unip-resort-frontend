var chat = document.getElementById('chat-content');
var chatbox = document.getElementById('chat');

chatbox.style.display = 'none';

chat.addEventListener('click', () => {

    if (chatbox.style.display == 'none') {
        chatbox.style.display = 'flex';
        chat.style.cssText = 'border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;';
    }

    else if (chatbox.style.display == 'flex') {
        chatbox.style.display = 'none'
        chat.style.cssText = 'border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;';
    }

})
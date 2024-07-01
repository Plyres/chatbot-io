function initializeChat() {
    const botList = document.getElementById('bot-list');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');

    // Initialisation des informations de l'utilisateur
    const user = {
        name: 'Plyres',
        avatar: './image/myAvatar.pnj'
    };

    userAvatar.src = user.avatar;
    userName.textContent = user.name;

    bots.forEach((bot, index) => {
        const botItem = document.createElement('div');
        botItem.classList.add('bot-item');
        botItem.innerHTML = `
            <img src="${bot.avatar}" alt="${bot.name}">   
            <div class="bot-info">
                <span class="bot-name">${bot.name}</span>
                <br>
                <span class="bot-description">${bot.description}</span>
            </div>
        `;
        botItem.dataset.index = index;
        botList.appendChild(botItem);
    });

    chatForm.addEventListener('submit', (messageAdded) => {
        messageAdded.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, 'user-message', user.name, user.avatar);
            handleBotResponses(userMessage);
            userInput.value = '';
        }
    });

    async function handleBotResponses(userMessage) {
        const commandParts = userMessage.split(' ');
        const command = commandParts[0].toLowerCase();
        const query = commandParts.slice(1).join(' ');

        for (const [index, bot] of bots.entries()) {
            const botCommand = bot.botCommands[command];
            if (botCommand) {
                let responseMessage;
                if (typeof botCommand === 'function') {
                    responseMessage = await botCommand(query);
                } else {
                    responseMessage = botCommand;
                }
                addMessageToChat(responseMessage, 'bot-message', bot.name, bot.avatar);
                highlightActiveBot(index);
            }
        }
    }

    function highlightActiveBot(index) {
        const botItems = document.querySelectorAll('.bot-item');
        botItems.forEach(item => item.classList.remove('active'));
        botItems[index].classList.add('active');
    }

    loadChatHistoryFromLocalStorage();
}

function addMessageToChat(message, className, name, avatar) {
    const chatMessages = document.getElementById('chat-content');
    const chatWindow = document.getElementById('chat-window');

    const messageDivElement = document.createElement('div');

    const dateWithoutSecond = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
    //Attribution dynamique de la classe afin de styliser selon si le message vient de l'utilisateur ou d'un bot
    messageDivElement.className = `message ${className}`;
    messageDivElement.innerHTML = `
        <div class="message-header">
            <img src="${avatar}" alt="Avatar" class="avatar">
            <strong>${name}</strong>
            <span>${dateWithoutSecond}</span>
        </div>
        <p>${message}</p>
    `;
    chatMessages.appendChild(messageDivElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    saveMessageInLocalStorage({message, className, name, avatar});
}

document.addEventListener('DOMContentLoaded', initializeChat);
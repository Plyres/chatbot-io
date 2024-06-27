function saveMessageInLocalStorage(msg) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    if (!Array.isArray(chatHistory)) {
        chatHistory = [];
    }

    const messageExists = chatHistory.some(existingMsg =>
        existingMsg.message === msg.message &&
        existingMsg.className === msg.className &&
        existingMsg.name === msg.name
    );
    if (!messageExists) {
        chatHistory.push(msg);
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
}

function loadChatHistoryFromLocalStorage() {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    if (!Array.isArray(chatHistory)) {
        chatHistory = [];
    }
    chatHistory.forEach(msg => addMessageToChat(msg.message, msg.className, msg.name, msg.avatar));
}
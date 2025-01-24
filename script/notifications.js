function createNotification(message, type) {
    console.log('Creating notification:', message, type);
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    notification.appendChild(messageParagraph);

    if (type === 'error') {
        const closeButton = document.createElement('button');
        closeButton.className = 'close';
        closeButton.textContent = '❌';
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        notification.appendChild(closeButton);
    } else if (type === 'success') {
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    document.body.appendChild(notification);
}

// Example usage:
// createNotification('Operation successful!', 'success');
// createNotification('An error occurred.', 'error');
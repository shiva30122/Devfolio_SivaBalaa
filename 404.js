document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    let countdown = 5;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000); // Update countdown every second

    // Fade-in effect for messages
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        message.style.animationDelay = `${index * 0.5}s`; // Stagger the message fade-in
    });
});

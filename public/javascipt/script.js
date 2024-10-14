
function playAudio() {
    const audio = document.getElementById('background-music');
    audio.muted = false;
    audio.play().catch(error => console.error('Error playing audio:', error));
    document.removeEventListener('click', playAudio);
}

document.addEventListener('click', playAudio);


async function sendGiftEmail() {
    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('response-message');

    try {
        const response = await axios.post('/send-email', { senderEmail: email });
        const modal = document.getElementById("success-modal");
        modal.style.display = "block";

        const span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };

        setTimeout(() => {
            modal.style.display = "none";
            window.location.href = '/';
        }, 2000);

        responseMessage.textContent = '';
    } catch (error) {
        console.error('Error sending email:', error);
        responseMessage.textContent = 'Failed to send gift notification. Please try again.';
        responseMessage.style.color = 'red';
    }
}

document.getElementById('send-email-button').addEventListener('click', sendGiftEmail);

function playAudio() {
    const audio = document.getElementById('background-music');
    audio.muted = false;
    audio.play();
    document.removeEventListener('click', playAudio);
}

document.addEventListener('click', playAudio);
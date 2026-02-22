// Funny reaction memes (unchanged from before)
const reactionMemes = [
    'https://media.tenor.com/mEfCiGvbv5wAAAAe/passwordsafe-password.png',
    'https://media.pinatafarm.com/protected/328C475E-F05A-44AB-8608-52799BB902D5/a1817a87-6f47-4ba7-ab23-65b3623b78bf-1703330839216-pfarm-with-png-watermarked.webp',
    'https://a.pinatafarm.com/620x500/41dca8f897/spongebob-waiting.jpg',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
];

// Audio elements
const typeSound = document.getElementById('typeSound');
const errorSound = document.getElementById('errorSound');
const successSound = document.getElementById('successSound');
const confettiSound = document.getElementById('confettiSound');

function playSound(audioElem) {
    audioElem.currentTime = 0; // Reset to start
    audioElem.play().catch(e => console.log("Audio play blocked:", e)); // Catch mobile blocks
}

function checkLogin() {
    const password = document.getElementById('password').value;
    if (password.toLowerCase() === 'oursecret') {  // CHANGE THIS to your real password!
        playSound(successSound);
        playSound(confettiSound); // Extra pop with confetti
        document.getElementById('login').style.display = 'none';
        showCountdownOrBirthday();
    } else {
        playSound(errorSound);
        alert('Oops! Try again 😏');
    }
}

function showCountdownOrBirthday() {
    const birthday = new Date('2026-02-25T00:00:00');
    const now = new Date();
    
    if (now >= birthday) {
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti();
    } else {
        document.getElementById('countdown-page').style.display = 'block';
        startCountdown(birthday);
        launchConfetti();  // Burst on countdown reveal
    }
}

function startCountdown(birthday) {
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthday - now;
        
        if (distance < 0) {
            clearInterval(interval);
            location.reload();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function launchConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Typing sound + random meme on each keystroke
document.getElementById('password').addEventListener('keydown', function(e) {
    // Play typing sound on key down (more responsive than keyup)
    if (e.key.length === 1) { // Only letters/symbols, not Enter/Backspace
        playSound(typeSound);
    }
});

document.getElementById('password').addEventListener('keyup', function() {
    const memeContainer = document.getElementById('meme-container');
    const memeImg = document.getElementById('meme-img');
    memeContainer.style.display = 'block';
    const randomMeme = reactionMemes[Math.floor(Math.random() * reactionMemes.length)];
    memeImg.src = randomMeme;
});

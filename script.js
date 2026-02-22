// Funny reaction memes (unchanged)
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
const bgMusic = document.getElementById('bgMusic');

function playSound(audioElem) {
    audioElem.currentTime = 0;
    audioElem.play().catch(e => console.log("Audio play blocked:", e));
}

function checkLogin() {
    const password = document.getElementById('password').value;
    if (password.toLowerCase() === 'oursecret') {  // CHANGE THIS to your real password!
        playSound(successSound);
        playSound(confettiSound);
        bgMusic.play().catch(e => console.log("BG music start blocked:", e));  // Start background music here
        bgMusic.volume = 0.3;  // Soft volume (0.0 to 1.0)
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
        launchConfetti();
    }
    // Ensure music is playing (in case of browser quirks)
    if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }
}

// Rest of your script (startCountdown, launchConfetti, keydown/keyup events) remains the same...
// Typing sound + meme on keystroke
document.getElementById('password').addEventListener('keydown', function(e) {
    if (e.key.length === 1) {
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

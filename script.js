// Funny typing reaction memes
const reactionMemes = [
    'https://media.tenor.com/mEfCiGvbv5wAAAAe/passwordsafe-password.png',
    'https://media.pinatafarm.com/protected/328C475E-F05A-44AB-8608-52799BB902D5/a1817a87-6f47-4ba7-ab23-65b3623b78bf-1703330839216-pfarm-with-png-watermarked.webp',
    'https://a.pinatafarm.com/620x500/41dca8f897/spongebob-waiting.jpg',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
];

// Funny waiting memes for countdown
const waitingMemes = [
    'https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif',
    'https://media.giphy.com/media/26gsjCzRq3ltZjH8k/giphy.gif',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    'https://media.giphy.com/media/26tPplGWjNqSCURja/giphy.gif'
];

// Audio
const typeSound = document.getElementById('typeSound');
const errorSound = document.getElementById('errorSound');
const successSound = document.getElementById('successSound');
const confettiSound = document.getElementById('confettiSound');
const bgMusic = document.getElementById('bgMusic');

function playSound(audioElem) {
    audioElem.currentTime = 0;
    audioElem.play().catch(() => {});
}

function checkLogin() {
    const password = document.getElementById('password').value.toLowerCase();
    if (password === 'oursecret') {  // ← CHANGE THIS TO YOUR ACTUAL PASSWORD
        playSound(successSound);
        playSound(confettiSound);
        bgMusic.play().catch(() => {});
        bgMusic.volume = 0.3;
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
        startBirthdayReveal();
    } else {
        document.getElementById('countdown-page').style.display = 'block';
        const randomWaiting = waitingMemes[Math.floor(Math.random() * waitingMemes.length)];
        document.getElementById('waiting-meme').src = randomWaiting;
        startCountdown(birthday);
        launchConfetti();
    }
}

function startCountdown(birthday) {
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthday - now;

        if (distance < 0) {
            clearInterval(interval);
            startBirthdayReveal();
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
    const duration = 8000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return;

        const particleCount = 8 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));

        requestAnimationFrame(frame);
    }());
}

function startBirthdayReveal() {
    const revealDiv = document.getElementById('birthday-reveal');
    revealDiv.style.display = 'block';

    // Fade to black
    setTimeout(() => {
        document.getElementById('black-overlay').style.opacity = 1;
    }, 500);

    // Fireworks/confetti bursts
    setTimeout(() => {
        for (let i = 0; i < 6; i++) {
            setTimeout(launchConfetti, i * 1200);
        }
    }, 2000);

    // Show wish text
    setTimeout(() => {
        document.getElementById('wish-text').style.display = 'block';
    }, 3000);

    // Blow harder prompt
    setTimeout(() => {
        document.getElementById('wish-text').style.display = 'none';
        document.getElementById('blow-harder').style.display = 'block';
    }, 7000);

    // Final reveal
    setTimeout(() => {
        revealDiv.style.display = 'none';
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti();
        createFloatingBalloons(35); // Lots of balloons
        bgMusic.volume = 0.5;
    }, 12000);
}

function createFloatingBalloons(count) {
    const container = document.getElementById('balloons-container');
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.innerHTML = ['🎈', '🎈', '❤️', '🎉', '🌸', '🌟'][Math.floor(Math.random() * 6)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = (Math.random() * 8 + 8) + 's';
        balloon.style.animationDelay = Math.random() * 4 + 's';
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), 25000);
    }
}

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

// Typing reaction memes (unchanged)
const reactionMemes = [
    'https://media.tenor.com/mEfCiGvbv5wAAAAe/passwordsafe-password.png',
    'https://media.pinatafarm.com/protected/328C475E-F05A-44AB-8608-52799BB902D5/a1817a87-6f47-4ba7-ab23-65b3623b78bf-1703330839216-pfarm-with-png-watermarked.webp',
    'https://a.pinatafarm.com/620x500/41dca8f897/spongebob-waiting.jpg',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
];

// Waiting memes for countdown (unchanged)
const waitingMemes = [
    'https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif',
    'https://media.giphy.com/media/26gsjCzRq3ltZjH8k/giphy.gif',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    'https://media.giphy.com/media/26tPplGWjNqSCURja/giphy.gif'
];

// Track wrong attempts
let wrongAttempts = 0;

// Audio
const typeSound = document.getElementById('typeSound');
const errorSound = document.getElementById('errorSound');
const successSound = document.getElementById('successSound');
const confettiSound = document.getElementById('confettiSound');
const bgMusic = document.getElementById('bgMusic');

function playSound(audio) {
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function checkLogin() {
    const input = document.getElementById('password');
    if (!input) {
        alert("Password field not found – try refreshing");
        return;
    }

    const password = input.value.trim().toLowerCase();

    if (password === 'khushikanoor') {
        wrongAttempts = 0; // reset
        playSound(successSound);
        playSound(confettiSound);
        if (bgMusic) {
            bgMusic.play().catch(() => {});
            bgMusic.volume = 0.3;
        }
        document.getElementById('login').style.display = 'none';
        showCountdownOrBirthday();
    } else {
        wrongAttempts++;
        playSound(errorSound);

        let message = "Bss aahi pyaar sii? 😡";
        if (wrongAttempts >= 3) {
            message = "Khushi seriously 😢";
        }

        alert(message);
    }
}

function showCountdownOrBirthday() {
    const birthday = new Date('2026-02-25T00:00:00');
    const now = new Date();

    if (now >= birthday) {
        startBirthdayReveal();
    } else {
        document.getElementById('countdown-page').style.display = 'block';
        const randomMeme = waitingMemes[Math.floor(Math.random() * waitingMemes.length)];
        document.getElementById('waiting-meme').src = randomMeme;
        startCountdown(birthday);
        launchConfetti();
    }
}

function startCountdown(birthday) {
    const countdownEl = document.getElementById('countdown');
    const interval = setInterval(() => {
        const distance = birthday - Date.now();

        if (distance < 0) {
            clearInterval(interval);
            startBirthdayReveal();
            return;
        }

        const days    = Math.floor(distance / 86400000);
        const hours   = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);

        countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function launchConfetti() {
    const duration = 8000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return;

        const particleCount = 8 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));

        requestAnimationFrame(frame);
    }());
}

function startBirthdayReveal() {
    const reveal = document.getElementById('birthday-reveal');
    if (!reveal) return;
    reveal.style.display = 'block';

    setTimeout(() => document.getElementById('black-overlay').style.opacity = 1, 500);

    setTimeout(() => {
        for (let i = 0; i < 6; i++) setTimeout(launchConfetti, i * 1200);
    }, 2000);

    setTimeout(() => document.getElementById('wish-text').style.display = 'block', 3000);

    setTimeout(() => {
        document.getElementById('wish-text').style.display = 'none';
        document.getElementById('blow-harder').style.display = 'block';
    }, 7000);

    setTimeout(() => {
        reveal.style.display = 'none';
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti();
        createFloatingBalloons(35);
        if (bgMusic) bgMusic.volume = 0.5;
    }, 12000);
}

function createFloatingBalloons(count) {
    const container = document.getElementById('balloons-container');
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const b = document.createElement('div');
        b.className = 'floating-balloon';
        b.innerHTML = ['🎈','🎈','❤️','🎉','🌸','🌟'][Math.floor(Math.random()*6)];
        b.style.left = Math.random()*100 + 'vw';
        b.style.animationDuration = (Math.random()*8 + 8) + 's';
        b.style.animationDelay = Math.random()*4 + 's';
        container.appendChild(b);
        setTimeout(() => b.remove(), 25000);
    }
}

// Typing effects
const pwInput = document.getElementById('password');
if (pwInput) {
    pwInput.addEventListener('keydown', e => {
        if (e.key.length === 1) playSound(typeSound);
    });

    pwInput.addEventListener('keyup', () => {
        const cont = document.getElementById('meme-container');
        const img = document.getElementById('meme-img');
        if (cont && img) {
            cont.style.display = 'block';
            img.src = reactionMemes[Math.floor(Math.random() * reactionMemes.length)];
        }
    });
}

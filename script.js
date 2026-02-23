// Typing reaction memes
const reactionMemes = [
    'https://media.tenor.com/mEfCiGvbv5wAAAAe/passwordsafe-password.png',
    'https://media.pinatafarm.com/protected/328C475E-F05A-44AB-8608-52799BB902D5/a1817a87-6f47-4ba7-ab23-65b3623b78bf-1703330839216-pfarm-with-png-watermarked.webp',
    'https://a.pinatafarm.com/620x500/41dca8f897/spongebob-waiting.jpg',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
];

// Waiting memes for countdown only
const waitingMemes = [
    'https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif',
    'https://media.giphy.com/media/26gsjCzRq3ltZjH8k/giphy.gif',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    'https://media.giphy.com/media/26tPplGWjNqSCURja/giphy.gif'
];

let wrongAttempts = 0;

// Audio
const typeSound     = document.getElementById('typeSound');
const errorSound    = document.getElementById('errorSound');
const successSound  = document.getElementById('successSound');
const confettiSound = document.getElementById('confettiSound');
const bgMusic       = document.getElementById('bgMusic');
const loveSong      = document.getElementById('loveSong');

function playSound(audio) {
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function checkLogin() {
    const input = document.getElementById('password');
    if (!input) return alert("Password field missing – refresh page");

    const password = input.value.trim().toLowerCase();

    if (password === 'khushikanoor') {
        wrongAttempts = 0;
        playSound(successSound);
        playSound(confettiSound);
        bgMusic?.play().catch(() => {});
        bgMusic.volume = 0.3;
        document.getElementById('login').style.display = 'none';
        showCountdownOrBirthday();
    } else {
        wrongAttempts++;
        playSound(errorSound);
        let msg = "Bss aahi pyaar sii? 😡";
        if (wrongAttempts >= 3) msg = "Khushi seriously 😢";
        alert(msg);
    }
}

function showCountdownOrBirthday() {
    // TESTING: past date – change to '2026-02-25T00:00:00' after testing
    const birthday = new Date('2026-02-18T12:00:00');

    if (new Date() >= birthday) {
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
    const el = document.getElementById('countdown');
    const interval = setInterval(() => {
        const dist = birthday - Date.now();
        if (dist < 0) {
            clearInterval(interval);
            startBirthdayReveal();
            return;
        }
        const d = Math.floor(dist / 86400000);
        const h = Math.floor((dist % 86400000) / 3600000);
        const m = Math.floor((dist % 3600000) / 60000);
        const s = Math.floor((dist % 60000) / 1000);
        el.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
}

function launchConfetti(short = false) {
    const duration = short ? 3000 : 8000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function frame() {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return;
        const particleCount = short ? 5 : 8 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        requestAnimationFrame(frame);
    }
    frame();
}

function startBirthdayReveal() {
    const reveal = document.getElementById('birthday-reveal');
    if (!reveal) return;
    reveal.style.display = 'block';

    // Black screen + big cake centered
    setTimeout(() => {
        document.getElementById('cake-img').style.display = 'block';
        document.getElementById('blow-text').style.display = 'block';
        launchConfetti(true); // short 3-second burst
    }, 1500);

    // Blow harder prompt
    setTimeout(() => {
        document.getElementById('blow-text').style.display = 'none';
        document.getElementById('blow-harder').style.display = 'block';
    }, 5000);

    // Final happy birthday page
    setTimeout(() => {
        reveal.style.display = 'none';
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti();
        createFloatingBalloons(40);

        if (bgMusic) bgMusic.volume = 0.15;
        if (loveSong) {
            loveSong.currentTime = 0;
            loveSong.volume = 0.35;
            loveSong.play().catch(() => {});
        }
    }, 10000);
}

function createFloatingBalloons(count) {
    const container = document.getElementById('balloons-container');
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const b = document.createElement('div');
        b.className = 'floating-balloon';
        b.innerHTML = ['🎈','🎈','❤️','🎉','🌸','🌟'][Math.floor(Math.random()*6)];
        b.style.left = Math.random()*100 + 'vw';
        b.style.animationDuration = (Math.random()*9 + 9) + 's';
        b.style.animationDelay = Math.random()*3 + 's';
        container.appendChild(b);
        setTimeout(() => b.remove(), 30000);
    }
}

// Typing sound + meme (only on login)
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

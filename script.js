// Typing reaction memes
const reactionMemes = [
    'https://media.tenor.com/mEfCiGvbv5wAAAAe/passwordsafe-password.png',
    'https://media.pinatafarm.com/protected/328C475E-F05A-44AB-8608-52799BB902D5/a1817a87-6f47-4ba7-ab23-65b3623b78bf-1703330839216-pfarm-with-png-watermarked.webp',
    'https://a.pinatafarm.com/620x500/41dca8f897/spongebob-waiting.jpg',
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png',
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
];

// Waiting memes
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
    // FOR TESTING ONLY – change back to '2026-02-25T00:00:00' when done
    const birthday = new Date('2026-02-18T12:00:00');  // past date

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

function launchConfetti() {
    const duration = 8000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function frame() {
        const timeLeft = end - Date.now();
        if (timeLeft <= 0) return;
        const particleCount = 8 * (timeLeft / duration);
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

    // Show waiting meme during black phase
    const revealMeme = document.getElementById('reveal-meme-img');
    const randomRevealMeme = waitingMemes[Math.floor(Math.random() * waitingMemes.length)];
    revealMeme.src = randomRevealMeme;
    setTimeout(() => {
        document.getElementById('reveal-waiting-meme').style.opacity = 1;
    }, 800);

    // Fade to black
    setTimeout(() => {
        document.getElementById('black-overlay').style.opacity = 1;
    }, 1500);

    // Fireworks + confetti during black
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            setTimeout(launchConfetti, i * 900);
        }
    }, 2000);

    // Hide waiting meme, show cake
    setTimeout(() => {
        document.getElementById('reveal-waiting-meme').style.opacity = 0;
        document.getElementById('cake-img').style.display = 'block';
        document.getElementById('wish-text').style.display = 'block';
    }, 5000);

    // Blow harder
    setTimeout(() => {
        document.getElementById('wish-text').style.display = 'none';
        document.getElementById('blow-harder').style.display = 'block';
    }, 8000);

    // Final happy birthday
    setTimeout(() => {
        reveal.style.display = 'none';
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti();
        createFloatingBalloons(40);

        // Fade original music
        if (bgMusic) bgMusic.volume = 0.15;

        // Romantic love song
        if (loveSong) {
            loveSong.currentTime = 0;
            loveSong.volume = 0.35;
            loveSong.play().catch(() => {});
        }
    }, 13000);
}

function createFloatingBalloons(count) {
    const container = document.getElementById('balloons-container');
    if (!container) return;
    for (let i = 0; i < count; i++) {
        const b = document.createElement('div');
        b.className = 'floating-balloon';
        b.innerHTML = ['🎈','❤️','🎉','🌸','🌟','💕'][Math.floor(Math.random()*6)];
        b.style.left = Math.random()*100 + 'vw';
        b.style.animationDuration = (Math.random()*9 + 9) + 's';
        b.style.animationDelay = Math.random()*3 + 's';
        container.appendChild(b);
        setTimeout(() => b.remove(), 30000);
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

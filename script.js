// ... Your reactionMemes array and playSound function stay the same ...

// Multiple funny waiting GIFs (random on countdown load)
const waitingMemes = [
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif', // Oops cat
    'https://media.tenor.com/60Z-HjC_Vq8AAAAe/stanley-hudson.png', // Office side-eye
    'https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif', // Spongebob waiting impatiently
    'https://media.giphy.com/media/26gsjCzRq3ltZjH8k/giphy.gif', // Mr Bean checking watch
    'https://media.tenor.com/mEfCiGvbv5wAAAAe/passwordsafe-password.png' // Funny suspense
];

function checkLogin() {
    const password = document.getElementById('password').value;
    if (password.toLowerCase() === 'oursecret') {  // CHANGE TO YOUR PASSWORD
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
        startBirthdayReveal();  // New function for your sequence
    } else {
        document.getElementById('countdown-page').style.display = 'block';
        // Random waiting meme
        const randomWaiting = waitingMemes[Math.floor(Math.random() * waitingMemes.length)];
        document.getElementById('waiting-meme').src = randomWaiting;
        startCountdown(birthday);
        launchConfetti(); // Burst on load
    }
}

function startCountdown(birthday) {
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthday - now;

        if (distance < 0) {
            clearInterval(interval);
            startBirthdayReveal();  // Trigger reveal when time hits
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Bigger, better confetti
function launchConfetti() {
    const duration = 8000; // Longer burst
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

// Birthday reveal sequence
function startBirthdayReveal() {
    const revealDiv = document.getElementById('birthday-reveal');
    revealDiv.style.display = 'block';

    // Fade to black
    setTimeout(() => {
        document.getElementById('black-overlay').style.opacity = 1;
    }, 500);

    // Fireworks (confetti bursts)
    setTimeout(() => {
        for (let i = 0; i < 6; i++) {
            setTimeout(launchConfetti, i * 1200);
        }
    }, 2000);

    // Show cake + wish text
    setTimeout(() => {
        document.getElementById('wish-text').style.display = 'block';
    }, 3000);

    // "Blow harder!"
    setTimeout(() => {
        document.getElementById('wish-text').style.display = 'none';
        document.getElementById('blow-harder').style.display = 'block';
    }, 7000);

    // Final reveal: Happy Birthday + balloons
    setTimeout(() => {
        document.getElementById('birthday-reveal').style.display = 'none';
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti(); // Massive burst
        createFloatingBalloons(30); // Lots of balloons
        bgMusic.volume = 0.5; // Pump up music
    }, 12000); // 5s after blow prompt (total ~12s from start)
}

// Floating balloons (simple emoji version – lots!)
function createFloatingBalloons(count) {
    const container = document.getElementById('balloons-container');
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.innerHTML = ['🎈', '❤️', '🎉', '🌟'][Math.floor(Math.random() * 4)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = (Math.random() * 8 + 8) + 's'; // 8-16s float
        balloon.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), 20000);
    }
}

// ... Your typing sound + meme on key events stay the same ...

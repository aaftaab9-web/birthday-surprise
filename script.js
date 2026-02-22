// Array of fun meme image URLs (free from Giphy/Imgur—add more if you want!)
const memes = [
    'https://media.giphy.com/media/3o7aCSPqXE5C6T8tBC/giphy.gif', // Cat meme
    'https://media.giphy.com/media/26gsjCzRq3ltZjH8k/giphy.gif', // Funny reaction
    'https://media.giphy.com/media/l0HlRnAWXxn0MhKLK/giphy.gif', // Dancing meme
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif', // Oops face
    'https://media.giphy.com/media/26tPplGWjNqSCURja/giphy.gif'  // Silly animal
];

function checkLogin() {
    const password = document.getElementById('password').value;
    if (password.toLowerCase() === 'oursecret') {  // Change 'oursecret' to your actual password
        document.getElementById('login').style.display = 'none';
        showCountdownOrBirthday();
    } else {
        alert('Oops! Try again.');
    }
}

function showCountdownOrBirthday() {
    const birthday = new Date('2026-02-25T00:00:00');  // Adjust year if needed
    const now = new Date();
    
    if (now >= birthday) {
        document.getElementById('birthday-page').style.display = 'block';
        launchConfetti();
    } else {
        document.getElementById('countdown-page').style.display = 'block';
        startCountdown(birthday);
    }
}

function startCountdown(birthday) {
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = birthday - now;
        
        if (distance < 0) {
            clearInterval(interval);
            location.reload();  // Reload to switch to birthday page
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
    const canvas = document.getElementById('confetti-canvas');
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        target: canvas
    });
    setInterval(() => {
        confetti({
            particleCount: 50,
            spread: 100,
            origin: { y: 0.6 },
            target: canvas
        });
    }, 2000);  // Confetti bursts every 2 seconds
}

// Interactive meme: Show random meme on each keystroke in password
document.getElementById('password').addEventListener('keyup', function() {
    const memeContainer = document.getElementById('meme-container');
    const memeImg = document.getElementById('meme-img');
    memeContainer.style.display = 'block';
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    memeImg.src = randomMeme;
});

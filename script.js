function checkLogin() {
    const password = document.getElementById('password').value;
    if (password.toLowerCase() === 'khushikanoor') {  //
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

// Auto-check on load in case already logged in (but for simplicity, we start at login)

const config = window.VALENTINE_CONFIG;

window.addEventListener('DOMContentLoaded', () => {
    document.title = config.pageTitle;
    document.getElementById('valentineTitle').textContent = config.valentineName;

    // Set all question texts and buttons
    const qMap = [
        'first','second','third','fourth','fifth','final'
    ];
    for (let i = 0; i < qMap.length; i++) {
        const q = config.questions[qMap[i]];
        const qNum = i + 1;
        document.getElementById(`question${qNum}Text`).textContent = q.text;
        document.getElementById(`yesBtn${qNum}`).textContent = q.yesBtn || '';
        document.getElementById(`noBtn${qNum}`).textContent = q.noBtn || '';
        if(q.secretAnswer && document.getElementById('secretAnswerBtn')) {
            document.getElementById('secretAnswerBtn').textContent = q.secretAnswer;
        }
    }

    // Love Meter
    const loveMeter = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');
    const startText = document.getElementById('startText');
    startText.textContent = config.questions.second.startText;

    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;
        if (value > 100) {
            extraLove.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';
            
            if (value >= 5000) extraLove.textContent = config.loveMessages.extreme;
            else if (value > 1000) extraLove.textContent = config.loveMessages.high;
            else extraLove.textContent = config.loveMessages.normal;
        } else {
            extraLove.classList.add('hidden');
            loveMeter.style.width = '100%';
        }
    });

    // Floating Hearts/Bears
    const container = document.querySelector('.floating-elements');
    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(emoji => {
        const div = document.createElement('div');
        div.className = config.floatingEmojis.hearts.includes(emoji) ? 'heart' : 'bear';
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });

    function setRandomPosition(el) {
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.animationDuration = parseFloat(config.animations.floatDuration) + Math.random()*5 + 's';
    }

    // Music
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');

    if (config.music.enabled) {
        musicSource.src = config.music.musicUrl;
        bgMusic.volume = config.music.volume;
        bgMusic.load();
        if (config.music.autoplay) {
            bgMusic.play().catch(() => musicToggle.textContent = config.music.startText);
        }
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = config.music.stopText;
            } else {
                bgMusic.pause();
                musicToggle.textContent = config.music.startText;
            }
        });
    } else {
        document.getElementById('musicControls').style.display = 'none';
    }
});

// Show next question
function showNextQuestion(num) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${num}`).classList.remove('hidden');
}

// Move button (No button)
function moveButton(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

// Celebrate
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const c = document.getElementById('celebration');
    c.classList.remove('hidden');
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // Heart explosion
    const container = document.querySelector('.floating-elements');
    for (let i=0; i<50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = config.floatingEmojis.hearts[Math.floor(Math.random()*config.floatingEmojis.hearts.length)];
        heart.className = 'heart';
        setRandomPosition(heart);
        container.appendChild(heart);
    }
}

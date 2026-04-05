// music.js
let globalAudio = null;
let isGlobalPlaying = false;

function initGlobalMusic() {
    if (!globalAudio) {
        globalAudio = new Audio('mysong.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.6;
    }
}

function playGlobalMusic() {
    initGlobalMusic();
    if (!isGlobalPlaying) {
        globalAudio.play().catch(e => console.log('Ошибка: ' + e));
        isGlobalPlaying = true;
    }
}

// Сохраняем состояние музыки при переходах
window.addEventListener('beforeunload', () => {
    if (globalAudio && isGlobalPlaying) {
        localStorage.setItem('musicTime', globalAudio.currentTime);
        localStorage.setItem('musicPlaying', 'true');
    } else {
        localStorage.removeItem('musicPlaying');
    }
});

// Восстанавливаем музыку на новой странице
window.addEventListener('load', () => {
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = localStorage.getItem('musicTime');
    if (wasPlaying) {
        initGlobalMusic();
        if (savedTime) globalAudio.currentTime = parseFloat(savedTime);
        playGlobalMusic();
    }
});
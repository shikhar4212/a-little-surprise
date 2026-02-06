const slides = document.querySelectorAll('.slide');
const overlay = document.getElementById('fadeOverlay');
const clickSfx = document.getElementById('clickSfx');

let current = 0;

const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

function startMusic() {
  if (musicStarted || !bgMusic) return;

  bgMusic.volume = 0.6; // soft
  bgMusic.play().catch(() => {});
  musicStarted = true;
}

// start music on first real interaction
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });


/* ---------- SLIDE SWITCH ---------- */
function goToSlide(i) {
    if (i < 0 || i >= slides.length) return;
  
    overlay.classList.add('show');
  
    setTimeout(() => {
      slides[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
  
      overlay.classList.remove('show');
  
      // ✅ THIS IS THE KEY LINE
      updateYesCursor();
      handleMusicForSlide();
    }, 400);
  }
  

/* ---------- GLOBAL CLICK ---------- */
document.addEventListener('click', e => {
  if (e.target.closest('button')) return;
  if (slides[current].classList.contains('memory-slide')) return;
  goToSlide(current + 1);
  playClick(e.clientX, e.clientY);
});

/* ---------- CLICK FX ---------- */
function playClick(x, y) {
  clickSfx.currentTime = 0;
  clickSfx.play().catch(()=>{});
}

/* ---------- MEMORY COLLAGE ---------- */
const collage = document.querySelector('.collage');
const cards = document.querySelectorAll('.polaroid');
let reveal = 0;

cards.forEach(c => {
  c.style.setProperty('--r', `${Math.random()*10-5}deg`);
});

collage.addEventListener('click', e => {
  e.stopPropagation();
  if (reveal >= cards.length) return;

  const card = cards[reveal];
  const maxX = collage.clientWidth - card.offsetWidth;
  const maxY = collage.clientHeight - card.offsetHeight;

  card.style.left = Math.random()*maxX + 'px';
  card.style.top = Math.random()*maxY + 'px';
  card.classList.add('show');

  playClick(e.clientX, e.clientY);
  reveal++;

  if (reveal === cards.length) {
    setTimeout(() => goToSlide(current + 1), 900);
  }
});

/* ---------- FINAL BUTTONS ---------- */
document.querySelectorAll('.yes-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    goToSlide(current + 1);
  });
});

/* ---------- HEARTS ---------- */
const heartsBg = document.querySelector('.hearts-bg');
setInterval(() => {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '💗';
  h.style.left = Math.random()*100+'%';
  h.style.fontSize = 14+Math.random()*16+'px';
  h.style.animationDuration = 10+Math.random()*10+'s';
  heartsBg.appendChild(h);
  setTimeout(()=>h.remove(),20000);
},700);

/* ==========================
   YES CURSOR — CLEAN & SAFE
========================== */

const yesCursor = document.getElementById('yesCursor');
const valentineSlide = document.querySelector('.valentine-slide');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// smooth follow animation
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;

  yesCursor.style.left = cursorX + 'px';
  yesCursor.style.top = cursorY + 'px';

  requestAnimationFrame(animateCursor);
}

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// visibility based ONLY on active slide
function updateYesCursor() {
  if (valentineSlide.classList.contains('active')) {
    yesCursor.classList.add('show');
  } else {
    yesCursor.classList.remove('show');
  }
}



// initial state
updateYesCursor();
animateCursor();

const cuteCursor = document.getElementById('cuteCursor');


document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCuteCursor() {
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;

  cuteCursor.style.left = cursorX + 'px';
  cuteCursor.style.top = cursorY + 'px';

  requestAnimationFrame(animateCuteCursor);
}

animateCuteCursor();
document.addEventListener('mousedown', () => {
  cuteCursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
});

document.addEventListener('mouseup', () => {
  cuteCursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');
const icon = musicBtn.querySelector('.icon');

let playing = false;

musicBtn.addEventListener('click', e => {
  e.stopPropagation();

  if (!playing) {
    music.volume = 0;
    music.play().catch(() => {});
    fadeAudio(music, { from: 0, to: 0.6, duration: 1800 });

    icon.textContent = '🔊';
    musicBtn.classList.add('playing');
  } else {
    fadeAudio(music, {
      from: music.volume,
      to: 0,
      duration: 1200,
      onComplete: () => music.pause()
    });

    icon.textContent = '🔇';
    musicBtn.classList.remove('playing');
  }

  playing = !playing;
});


function handleMusicForSlide() {
  const isLastSlide = slides[current].classList.contains('love-slide');

  if (isLastSlide && !bgMusic.paused) {
    // soft fade out
    let vol = bgMusic.volume;
    const fadeOut = setInterval(() => {
      vol -= 0.02;
      bgMusic.volume = Math.max(vol, 0);
      if (vol <= 0) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        clearInterval(fadeOut);
      }
    }, 120);
  }
}


document.addEventListener('click', function startMusicOnce() {
  if (!playing) {
    music.volume = 0;
    music.play().catch(() => {});
    fadeAudio(music, { from: 0, to: 0.4, duration: 2500 });
    playing = true;
    musicBtn.classList.add('playing');
    musicBtn.querySelector('.icon').textContent = '🔊';
  }
  document.removeEventListener('click', startMusicOnce);
});

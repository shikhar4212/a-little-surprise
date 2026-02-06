const slides = document.querySelectorAll('.slide');
const overlay = document.getElementById('fadeOverlay');
const clickSfx = document.getElementById('clickSfx');

let current = 0;

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

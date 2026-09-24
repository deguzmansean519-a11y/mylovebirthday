/* =====================================================
   ✏️ EDIT THESE
   ===================================================== */
const CONFIG = {
  name:  " Arianne My Love ",          // her name or nickname
  from:  "Kulotskiee your It Boy",        // your name (shown as "with love, ...")

  // Add as many photos as you like — same folder as this file.
  // Give each one its own little caption that appears once it's scratched clear.
  photos: [
    { src: "images/photo1.png",caption: "The day we met 💛" },
    { src: "images/photo2.png", caption: "My favorite trip with you ✈️" },
    { src: "images/photo3.png", caption: "favorite pic😍" }
  ],

  finaleMessage: "That's every picture I have of us — and I still want a thousand more. I love you.",

  message:
`Happy birthday, my love!

Thank you for being the reason I smile every single day. You make ordinary moments feel special.

I hope this year gives you everything you deserve, Sabay nating tutuparin ang lahat ng pangarap natin always remember love kita lagi lagi sobra sobra.

I love you, always.`
};
/* ===================================================== */

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const rand = (a,b) => a + Math.random()*(b-a);

$('#name').textContent = CONFIG.name;
$('#from').textContent = ' From ' + CONFIG.from;
$('#sign').textContent = '— ' + CONFIG.from;

/* ---------- fairy-lights name scene ---------- */
const BULB_COLORS = ['#ff7a9c','#ffc266','#8fd6ff','#c6a6ff','#8cf0c4','#fff3a0'];

(function buildStrand(){
  const strand = $('#strand');
  for(let i = 0; i < 18; i++){
    const b = document.createElement('i');
    b.style.color = BULB_COLORS[i % BULB_COLORS.length];
    b.style.animationDelay = rand(0,1.8) + 's';
    strand.appendChild(b);
  }
})();

let lightsReady = false;
(function buildLightsName(){
  const el = $('#lightsName');
  const chars = CONFIG.name.split('');
  chars.forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.setProperty('--bulb', BULB_COLORS[i % BULB_COLORS.length]);
    el.appendChild(span);
  });
  const letters = $$('#lightsName .letter');
  letters.forEach((l, i) => setTimeout(() => l.classList.add('lit'), 220 * i + 300));
  const total = 220 * letters.length + 1300;
  setTimeout(() => { $('#lightsSub').classList.add('show'); }, total);
  setTimeout(() => { $('#lightsHint').classList.add('show'); lightsReady = true; }, total + 700);
})();

$('#scene-lights').addEventListener('click', () => {
  if(!lightsReady) return;
  lightsReady = false;
  $('#scene-lights').classList.remove('active');
  $('#scene-gift').classList.add('active');
});

/* ---------- gift box scene ---------- */
let giftOpened = false;
$('#giftBtn').addEventListener('click', () => {
  if(giftOpened) return;
  giftOpened = true;
  $('#giftBtn').classList.add('opened');
  $('#gift').classList.add('open');
  $('#giftHint').classList.remove('show');
  confetti(50);
  setTimeout(() => {
    $('#scene-gift').classList.remove('active');
    $('#scene-cake').classList.add('active');
  }, 1500);
});

/* ---------- floating hearts ---------- */
setInterval(() => {
  const h = document.createElement('span');
  h.className = 'heart';
  h.textContent = '❤';
  h.style.left = rand(0,100) + 'vw';
  h.style.fontSize = rand(12,28) + 'px';
  h.style.animationDuration = rand(7,12) + 's';
  $('#hearts').appendChild(h);
  setTimeout(() => h.remove(), 12500);
}, 800);

/* ---------- confetti ---------- */
function confetti(n = 80){
  for(let i = 0; i < n; i++){
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = rand(0,100) + 'vw';
    c.style.background = `hsl(${rand(0,360)} 85% 65%)`;
    c.style.animationDuration = rand(2.2,4.2) + 's';
    c.style.animationDelay = rand(0,.6) + 's';
    c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5200);
  }
}

/* ---------- cake → garden ---------- */
let opened = false;
$('#cake').addEventListener('click', () => {
  if(opened) return;
  opened = true;
  $('#cake').classList.add('blown');          // blow out the candles
  $('#hint').style.opacity = 0;
  confetti(90);
  setTimeout(() => {
    $('#scene-cake').classList.remove('active');
    $('#scene-garden').classList.add('active');
    growGarden();
  }, 1600);
});

/* ---------- flowers + butterflies ---------- */
const PALETTES = [
  ['#ff5c8a','#ffb3c7'], ['#ffb02e','#ffe08a'], ['#b388ff','#e2d3ff'],
  ['#ff7b54','#ffc2a8'], ['#ffffff','#ffd9e6'], ['#4dabf7','#bfe3ff']
];
const BF_COLORS = [
  ['#ff5c8a','#ffd0dc'], ['#7c5ad6','#d9c8ff'], ['#ff9a3d','#ffe0b8'], ['#2fb8c4','#c4f1f4']
];

function growGarden(){
  const garden = $('#garden');
  const N = Math.max(10, Math.round(innerWidth / 55));
  for(let i = 0; i < N; i++){
    const [c, c2] = PALETTES[Math.floor(rand(0, PALETTES.length))];
    const f = document.createElement('div');
    f.className = 'flower';
    f.style.left = ((i + .5) * (100 / N) + rand(-1.5,1.5)) + '%';
    f.style.setProperty('--h', rand(9,27) + 'vh');
    f.style.setProperty('--s', rand(8,13) + 'px');
    f.style.setProperty('--d', (i * .1 + rand(0,.5)) + 's');
    f.style.setProperty('--c', c);
    f.style.setProperty('--c2', c2);
    let petals = '';
    for(let p = 0; p < 8; p++) petals += `<span class="petal" style="--i:${p}"></span>`;
    f.innerHTML = `<div class="sway"><div class="stem"></div><div class="head">${petals}<span class="core"></span></div></div>`;
    garden.appendChild(f);
  }

  for(let i = 0; i < 7; i++){
    const [c1, c2] = BF_COLORS[i % BF_COLORS.length];
    const b = document.createElement('div');
    b.className = 'bf' + (i % 2 ? ' rev' : '');
    b.style.setProperty('--top', rand(20,62) + 'vh');
    b.style.setProperty('--dur', rand(14,24) + 's');
    b.style.setProperty('--delay', (-rand(0,14)) + 's');   // negative delay → already flying
    b.style.setProperty('--s', rand(9,15) + 'px');
    b.style.setProperty('--c1', c1);
    b.style.setProperty('--c2', c2);
    b.innerHTML = '<div class="bob"><div class="bfbody"><span class="wing l"></span><span class="wing r"></span></div></div>';
    $('#scene-garden').appendChild(b);
  }

  setTimeout(() => $('#actions').classList.add('show'), 1800);
}

/* ---------- modals ---------- */
let typeTimer;
const engaged = { msg:false, flowers:false, scratch:false };
let finaleShown = false;

function openModal(id){
  $('#' + id).classList.add('open');
  if(id === 'm-msg'){ typeMessage(); engaged.msg = true; }
  if(id === 'm-flowers'){ flowerRain(); engaged.flowers = true; }
  if(id === 'm-scratch') setTimeout(() => loadPhoto(photoIndex), 60);
}
function closeModal(m){
  m.classList.remove('open');
  clearInterval(typeTimer);
  maybeShowFinale();
}
$$('[data-open]').forEach(b => b.addEventListener('click', () => openModal(b.dataset.open)));
$$('.modal').forEach(m => {
  m.addEventListener('click', e => { if(e.target === m) closeModal(m); });
  m.querySelector('.close').addEventListener('click', () => closeModal(m));
});
addEventListener('keydown', e => {
  if(e.key === 'Escape') $$('.modal.open').forEach(closeModal);
});

function maybeShowFinale(){
  if(finaleShown) return;
  if(engaged.msg && engaged.flowers && engaged.scratch){
    finaleShown = true;
    $('#finaleNote').textContent = CONFIG.finaleMessage;
    setTimeout(() => {
      $('#m-finale').classList.add('open');
      confettiCannon(110);
      fireworks(4);
    }, 350);
  }
}

/* confetti cannon — two bursts firing from bottom corners */
function confettiCannon(n = 100){
  const colors = ['#ff5c8a','#ffb02e','#b388ff','#4dabf7','#ff7b54','#ffe08a','#ffffff'];
  for(let i = 0; i < n; i++){
    const fromLeft = i % 2 === 0;
    const p = document.createElement('i');
    p.className = 'cannon-piece';
    const w = rand(6,10), h = rand(10,16);
    p.style.width = w + 'px';
    p.style.height = h + 'px';
    p.style.left = (fromLeft ? rand(0,4) : rand(96,100)) + 'vw';
    p.style.background = colors[Math.floor(rand(0,colors.length))];
    p.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    const angle = fromLeft ? rand(-70,-25) : rand(-155,-110); // degrees, up-and-across
    const dist = rand(55,100);
    const rad = angle * Math.PI / 180;
    p.style.setProperty('--tx', Math.cos(rad) * dist + 'vw');
    p.style.setProperty('--ty', Math.sin(rad) * dist + 'vh');
    p.style.setProperty('--rot', rand(180,720) + 'deg');
    p.style.animationDelay = rand(0,.5) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2700);
  }
}

/* fireworks burst effect */
function fireworks(bursts = 5){
  const layer = document.createElement('div');
  layer.className = 'fw';
  document.body.appendChild(layer);
  const colors = ['#ff5c8a','#ffb02e','#b388ff','#4dabf7','#ff7b54','#ffffff'];
  for(let b = 0; b < bursts; b++){
    setTimeout(() => {
      const cx = rand(15,85), cy = rand(15,55);
      const color = colors[Math.floor(rand(0,colors.length))];
      for(let i = 0; i < 22; i++){
        const p = document.createElement('i');
        const angle = (i / 22) * Math.PI * 2, dist = rand(60,140);
        p.style.left = cx + 'vw'; p.style.top = cy + 'vh';
        p.style.color = color;
        p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        layer.appendChild(p);
      }
    }, b * 260);
  }
  setTimeout(() => layer.remove(), bursts * 260 + 1400);
}

/* typewriter message */
function typeMessage(){
  clearInterval(typeTimer);
  const el = $('#typed'); el.textContent = '';
  let i = 0;
  typeTimer = setInterval(() => {
    el.textContent = CONFIG.message.slice(0, ++i);
    if(i >= CONFIG.message.length) clearInterval(typeTimer);
  }, 38);
}

/* flower rain */
function flowerRain(){
  const rain = $('#rain');
  const list = ['🌸','🌷','🌹','🌻','🌺','💮','🪷'];
  for(let i = 0; i < 45; i++){
    const s = document.createElement('span');
    s.textContent = list[Math.floor(rand(0, list.length))];
    s.style.left = rand(0,100) + 'vw';
    s.style.fontSize = rand(20,40) + 'px';
    s.style.animationDuration = rand(3,6) + 's';
    s.style.animationDelay = rand(0,2.5) + 's';
    rain.appendChild(s);
    setTimeout(() => s.remove(), 9000);
  }
}

/* ---------- scratch card gallery ---------- */
const canvas = $('#scratch'), ctx = canvas.getContext('2d', { willReadFrequently:true });
const photo = $('#photo');
let scratching = false, last = null, moves = 0;
let photoIndex = 0;
const revealedPhotos = new Set();

function buildDots(){
  const dots = $('#dots');
  dots.innerHTML = '';
  CONFIG.photos.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot';
    dots.appendChild(d);
  });
  updateDots();
}
function updateDots(){
  $$('#dots .dot').forEach((d, i) => {
    d.classList.toggle('current', i === photoIndex);
    d.classList.toggle('revealed', revealedPhotos.has(i));
  });
}

function loadPhoto(i){
  photoIndex = (i + CONFIG.photos.length) % CONFIG.photos.length;
  const p = CONFIG.photos[photoIndex];
  photo.style.display = '';
  $('#missing').style.display = 'none';
  photo.onerror = () => { photo.style.display = 'none'; $('#missing').style.display = 'flex'; };
  photo.src = p.src;

  const alreadyDone = revealedPhotos.has(photoIndex);
  canvas.classList.toggle('done', alreadyDone);
  $('#tip').style.display = alreadyDone ? 'none' : '';
  $('#scratchCap').classList.toggle('show', alreadyDone);
  $('#scratchCap').textContent = alreadyDone ? '✨ revealed ✨' : '';
  $('#photoCaption').textContent = alreadyDone ? p.caption : '';

  if(!alreadyDone) initScratch();
  updateDots();
}

$('#prevPhoto').addEventListener('click', () => loadPhoto(photoIndex - 1));
$('#nextPhoto').addEventListener('click', () => loadPhoto(photoIndex + 1));

function initScratch(){
  const r = canvas.getBoundingClientRect();
  canvas.width = r.width; canvas.height = r.height;
  ctx.globalCompositeOperation = 'source-over';
  const g = ctx.createLinearGradient(0,0,r.width,r.height);
  g.addColorStop(0,'#cfc4dc'); g.addColorStop(.5,'#f2ecf7'); g.addColorStop(1,'#bdb0cf');
  ctx.fillStyle = g; ctx.fillRect(0,0,r.width,r.height);
  for(let i = 0; i < 160; i++){
    ctx.fillStyle = `rgba(255,255,255,${rand(.15,.5)})`;
    ctx.beginPath(); ctx.arc(rand(0,r.width), rand(0,r.height), rand(1,3), 0, 7); ctx.fill();
  }
  ctx.fillStyle = '#6b4a78';
  ctx.font = '600 22px "Fraunces", Georgia, serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('✨ Scratch here ✨', r.width/2, r.height/2);
}

function pos(e){
  const r = canvas.getBoundingClientRect();
  return { x:(e.clientX - r.left) * (canvas.width / r.width), y:(e.clientY - r.top) * (canvas.height / r.height) };
}
function scratchTo(p){
  ctx.globalCompositeOperation = 'destination-out';
  ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  ctx.lineTo(p.x + .01, p.y + .01);
  ctx.stroke();
  last = p;
}
canvas.addEventListener('pointerdown', e => {
  if(revealedPhotos.has(photoIndex)) return;
  scratching = true; canvas.setPointerCapture(e.pointerId);
  last = pos(e); scratchTo(last);
});
canvas.addEventListener('pointermove', e => {
  if(!scratching || revealedPhotos.has(photoIndex)) return;
  scratchTo(pos(e));
  if(++moves % 8 === 0) checkProgress();
});
['pointerup','pointercancel'].forEach(t => canvas.addEventListener(t, () => { scratching = false; checkProgress(); }));

function checkProgress(){
  if(revealedPhotos.has(photoIndex)) return;
  const d = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let clear = 0, total = 0;
  for(let i = 3; i < d.length; i += 64){ total++; if(d[i] < 128) clear++; }
  if(clear / total > .5) reveal();
}
function reveal(){
  const i = photoIndex;
  revealedPhotos.add(i);
  canvas.classList.add('done');
  $('#tip').style.display = 'none';
  $('#scratchCap').textContent = '✨ revealed ✨';
  $('#scratchCap').classList.add('show');
  $('#photoCaption').textContent = CONFIG.photos[i].caption;
  updateDots();
  confetti(80);

  if(revealedPhotos.size === CONFIG.photos.length){
    engaged.scratch = true;
    setTimeout(maybeShowFinale, 900);
  } else {
    // gently invite her to the next photo
    setTimeout(() => { if(!revealedPhotos.has((i + 1) % CONFIG.photos.length)) loadPhoto(i + 1); }, 1100);
  }
}

buildDots();

let audioCtx = null;
let soundEnabled = true;
function getCtx(){
  if(!audioCtx){ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  if(audioCtx.state === 'suspended'){ audioCtx.resume(); }
  return audioCtx;
}
function tone(freq, duration, type, startGain, glideTo){
  if(!soundEnabled) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if(glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, ctx.currentTime + duration);
  gain.gain.setValueAtTime(startGain || 0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}
function playBoot(){ tone(220, 0.55, 'sine', 0.07, 900); }
function playOpen(){ tone(640, 0.13, 'triangle', 0.06, 900); }
function playClose(){ tone(440, 0.13, 'triangle', 0.05, 200); }
function playClick(){ tone(520, 0.06, 'square', 0.03); }
function playChime(){ tone(880, 0.2, 'sine', 0.05, 1320); }

function toggleTheme(){
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
}

const translations = {
  en: {
    statusHire: 'available for hire',
    trashEmpty: 'trash is empty',
    labelEmail: 'Email',
    labelTrash: 'Trash',
    profileRole: 'Python Developer',
    aboutContent:
'<span class="md-h">## about.md</span>\n\n' +
"I'm <span class=\"md-b\">**Mykhailo Buzynov**</span>, a self-directed Python\n" +
'developer working through a structured, hands-on learning path.\n\n' +
'<span class="md-h">### focus</span>\n' +
'- core fundamentals -> OOP -> async -> bots\n' +
'- clean architecture and disciplined git workflows\n' +
'- shipping real, working tools, not just exercises\n\n' +
'<span class="md-h">### goal</span>\n' +
'Build a portfolio of <span class="md-b">**genuine, deployable projects**</span>\n' +
"that proves I can ship, not just finish a course.",
    skillsCategories: { languages:'Languages', tools:'Tools', concepts:'Concepts', bots:'Bots', web:'Web' },
    skillsStatus: 'actively learning',
    resumeTitle: "resume.pdf isn't ready yet",
    resumeDesc: "I'm putting together a polished version as the project portfolio grows.",
    btnTelegram: 'Message on Telegram',
    btnEmail: 'Send an email',
    comingSoonTitle: 'Nothing pushed yet',
    comingSoonDesc: 'This space will hold real, business-style projects with live GitHub links as they ship.',
    readmeContent:
'you opened the readme.\n\n' +
"there's no hidden treasure here, just a quiet thank-you\n" +
"for poking around. if you made it this far, you're\n" +
"clearly someone who explores -- that's a good trait\n" +
'to have on a team.\n\n' +
'let\'s talk: <a href="https://t.me/mihacb" target="_blank" class="file-link">t.me/mihacb</a>',
    tips: [
      'Like the tech stack? There is more inside the journey folder.',
      'No live projects yet, but they are coming soon -- check back.',
      'Built this whole desktop myself: windows, dragging, all of it.',
      'Hiring or just curious? My contacts are right there on the desktop.',
      'Want to chat about a role? I am reachable on <a href="https://t.me/mihacb" target="_blank">Telegram</a>.'
    ]
  },
  ru: {
    statusHire: 'открыт к предложениям',
    trashEmpty: 'корзина пуста',
    labelEmail: 'Почта',
    labelTrash: 'Корзина',
    profileRole: 'Python-разработчик',
    aboutContent:
'<span class="md-h">## about.md</span>\n\n' +
'Я — <span class="md-b">**Михаил Бузинов**</span>, самостоятельно обучающийся\n' +
'Python-разработчик, который проходит структурированный практический путь обучения.\n\n' +
'<span class="md-h">### фокус</span>\n' +
'- основы -> OOP -> async -> боты\n' +
'- чистая архитектура и дисциплинированная работа с git\n' +
'- реальные рабочие инструменты, а не просто упражнения\n\n' +
'<span class="md-h">### цель</span>\n' +
'Собрать портфолио из <span class="md-b">**настоящих, готовых к использованию\n' +
'проектов**</span>, которые докажут, что я умею делать, а не просто прошёл курс.',
    skillsCategories: { languages:'Языки', tools:'Инструменты', concepts:'Концепции', bots:'Боты', web:'Веб' },
    skillsStatus: 'активно изучаю',
    resumeTitle: 'resume.pdf пока не готов',
    resumeDesc: 'Я собираю полноценную версию по мере роста портфолио проектов.',
    btnTelegram: 'Написать в Telegram',
    btnEmail: 'Написать на почту',
    comingSoonTitle: 'Пока ничего не запушено',
    comingSoonDesc: 'Здесь появятся настоящие проекты в духе реального бизнеса со ссылками на GitHub, как только они будут готовы.',
    readmeContent:
'вы открыли readme.\n\n' +
'здесь нет скрытого сокровища, просто тихое спасибо\n' +
'за то, что заглянули. если вы добрались сюда — вы явно\n' +
'из тех, кто всё исследует, а это хорошая черта\n' +
'для командной работы.\n\n' +
'давайте созвонимся: <a href="https://t.me/mihacb" target="_blank" class="file-link">t.me/mihacb</a>',
    tips: [
      'Понравился стек технологий? В папке journey есть ещё больше.',
      'Готовых проектов пока нет, но они скоро появятся — заходите ещё.',
      'Я сам сделал весь этот рабочий стол: окна, перетаскивание, всё это.',
      'Ищете разработчика или просто любопытно? Мои контакты прямо на столе.',
      'Хотите обсудить вакансию? Я на связи в <a href="https://t.me/mihacb" target="_blank">Telegram</a>.'
    ]
  },
  uk: {
    statusHire: 'відкритий до пропозицій',
    trashEmpty: 'смітник порожній',
    labelEmail: 'Пошта',
    labelTrash: 'Смітник',
    profileRole: 'Python-розробник',
    aboutContent:
'<span class="md-h">## about.md</span>\n\n' +
'Я — <span class="md-b">**Михайло Бузинов**</span>, самостійний Python-розробник,\n' +
'який проходить структурований практичний шлях навчання.\n\n' +
'<span class="md-h">### фокус</span>\n' +
'- основи -> OOP -> async -> боти\n' +
'- чиста архітектура та дисциплінована робота з git\n' +
'- реальні робочі інструменти, а не просто вправи\n\n' +
'<span class="md-h">### мета</span>\n' +
'Зібрати портфоліо із <span class="md-b">**справжніх, готових до використання\n' +
'проєктів**</span>, які доведуть, що я вмію робити, а не просто пройшов курс.',
    skillsCategories: { languages:'Мови', tools:'Інструменти', concepts:'Концепції', bots:'Боти', web:'Веб' },
    skillsStatus: 'активно вивчаю',
    resumeTitle: 'resume.pdf ще не готовий',
    resumeDesc: "Я готую повноцінну версію разом із зростанням портфоліо проєктів.",
    btnTelegram: 'Написати в Telegram',
    btnEmail: 'Написати на пошту',
    comingSoonTitle: 'Поки нічого не запушено',
    comingSoonDesc: "Тут з'являться справжні проєкти у стилі реального бізнесу з посиланнями на GitHub, коли вони будуть готові.",
    readmeContent:
'ви відкрили readme.\n\n' +
'тут немає прихованого скарбу, лише тихе дякую\n' +
'за те, що зазирнули. якщо ви дійшли сюди — ви явно\n' +
'з тих, хто все досліджує, а це хороша риса\n' +
'для командної роботи.\n\n' +
'давайте поговоримо: <a href="https://t.me/mihacb" target="_blank" class="file-link">t.me/mihacb</a>',
    tips: [
      "Сподобався технологічний стек? У папці journey є ще більше.",
      "Готових проєктів поки немає, але вони скоро з'являться -- заходьте ще.",
      'Я сам зробив увесь цей робочий стіл: вікна, перетягування, усе це.',
      'Шукаєте розробника чи просто цікаво? Мої контакти прямо на столі.',
      "Хочете обговорити вакансію? Я на зв'язку в <a href=\"https://t.me/mihacb\" target=\"_blank\">Telegram</a>."
    ]
  }
};

const skillCategories = [
  { key:'languages', skills:[ {icon:'ti-brand-python', name:'Python'} ] },
  { key:'tools', skills:[ {icon:'ti-brand-git', name:'Git'}, {icon:'ti-brand-github', name:'GitHub'}, {icon:'ti-database', name:'SQL'} ] },
  { key:'concepts', skills:[ {icon:'ti-cube', name:'OOP'}, {icon:'ti-timeline', name:'Asyncio'}, {icon:'ti-code', name:'Type Hints'}, {icon:'ti-checks', name:'Mypy'} ] },
  { key:'bots', skills:[ {icon:'ti-robot', name:'aiogram'}, {icon:'ti-brand-telegram', name:'Telegram Bot API'} ] },
  { key:'web', skills:[ {icon:'ti-brand-html5', name:'HTML'}, {icon:'ti-brand-css3', name:'CSS'}, {icon:'ti-brand-javascript', name:'JavaScript'} ] }
];

let currentLang = 'en';
const langOrder = ['en','ru','uk'];
const langLabel = { en:'EN', ru:'RU', uk:'UA' };

function renderSkillsApp(lang){
  const t = translations[lang];
  let html = '<div class="skills-app">';
  skillCategories.forEach((cat) => {
    html += '<div class="skill-section"><div class="skill-section-label">' + t.skillsCategories[cat.key] + '</div><div class="skill-chip-row">';
    cat.skills.forEach((s) => {
      html += '<div class="skill-chip"><div class="skill-chip-icon"><i class="ti ' + s.icon + '"></i></div><span>' + s.name + '</span></div>';
    });
    html += '</div></div>';
  });
  html += '<div class="skills-status"><span class="status-dot"></span>' + t.skillsStatus + '</div></div>';
  document.getElementById('skills-body').innerHTML = html;
}

function applyLanguage(lang){
  const t = translations[lang];
  document.getElementById('status-hire-text').textContent = t.statusHire;
  document.getElementById('trash-empty-text').textContent = t.trashEmpty;
  document.getElementById('email-label').textContent = t.labelEmail;
  document.getElementById('trash-label').textContent = t.labelTrash;

  document.getElementById('about-body').innerHTML =
    '<div class="profile-header"><div class="profile-avatar">MB</div><div><div class="profile-name">Mykhailo Buzynov</div><div class="profile-role">' + t.profileRole + '</div></div></div>' +
    '<hr class="profile-divider">' +
    '<div class="code-block">' + t.aboutContent + '</div>';

  renderSkillsApp(lang);

  document.getElementById('resume-body').innerHTML =
    '<div class="app-card"><div class="app-card-icon"><i class="ti ti-file-type-pdf"></i></div>' +
    '<h3>' + t.resumeTitle + '</h3><p>' + t.resumeDesc + '</p>' +
    '<div class="app-card-actions">' +
    '<a class="app-btn solid" href="https://t.me/mihacb" target="_blank"><i class="ti ti-brand-telegram"></i>' + t.btnTelegram + '</a>' +
    '<a class="app-btn ghost" href="mailto:meshanagg@gmail.com"><i class="ti ti-mail"></i>' + t.btnEmail + '</a>' +
    '</div></div>';

  document.getElementById('coming-soon-body').innerHTML =
    '<div class="app-card"><div class="app-card-icon"><i class="ti ti-rocket"></i></div>' +
    '<h3>' + t.comingSoonTitle + '</h3><p>' + t.comingSoonDesc + '</p></div>';

  document.getElementById('readme-body').innerHTML = t.readmeContent;
}

document.getElementById('sound-toggle').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  document.getElementById('sound-icon').className = soundEnabled ? 'ti ti-volume' : 'ti ti-volume-off';
});

document.getElementById('lang-toggle').addEventListener('click', () => {
  let idx = langOrder.indexOf(currentLang);
  currentLang = langOrder[(idx + 1) % langOrder.length];
  document.getElementById('lang-toggle').textContent = langLabel[currentLang];
  applyLanguage(currentLang);
  playClick();
});

const bootMsgs = ['booting...', 'mounting filesystem...', 'loading desktop...'];
document.getElementById('power-btn').addEventListener('click', () => {
  playBoot();
  const btn = document.getElementById('power-btn');
  const hint = document.getElementById('boot-hint');
  const loader = document.getElementById('boot-loader');
  btn.style.pointerEvents = 'none';
  loader.classList.remove('hidden');
  let step = 0;
  const iv = setInterval(() => {
    hint.textContent = bootMsgs[step];
    step++;
    if(step >= bootMsgs.length){
      clearInterval(iv);
      setTimeout(() => {
        document.getElementById('boot').classList.add('hidden');
        document.getElementById('os').classList.add('active');
        setTimeout(() => { peekCycle(); scheduleNextPeek(); }, 3500);
      }, 300);
    }
  }, 300);
});
document.getElementById('lock-btn').addEventListener('click', () => {
  playClose();
  document.getElementById('os').classList.remove('active');
  document.getElementById('boot').classList.remove('hidden');
  document.getElementById('power-btn').style.pointerEvents = 'auto';
  document.getElementById('boot-hint').textContent = 'click to boot';
  document.getElementById('boot-loader').classList.add('hidden');
});

let zCounter = 10;
let openWindows = [];
let minimizedWindows = {};
let focusedId = null;
let readmeSeen = false;
const desktop = document.getElementById('desktop');

function bringToFront(id){
  const el = document.getElementById('win-' + id);
  if(!el) return;
  zCounter++;
  el.style.zIndex = zCounter;
  focusedId = id;
  renderTaskbar();
}

function openWindow(id){
  const el = document.getElementById('win-' + id);
  if(!el) return;
  const wasHidden = el.style.display !== 'flex';
  el.style.display = 'flex';
  minimizedWindows[id] = false;
  if(!openWindows.includes(id)) openWindows.push(id);
  bringToFront(id);
  if(wasHidden) playOpen();
  if(id === 'readme-txt' && !readmeSeen){
    readmeSeen = true;
    const rect = el.getBoundingClientRect();
    spawnConfetti(rect.left + rect.width/2, rect.top + 20);
  }
}

function closeWindow(id){
  const el = document.getElementById('win-' + id);
  if(el) el.style.display = 'none';
  openWindows = openWindows.filter(w => w !== id);
  delete minimizedWindows[id];
  if(focusedId === id) focusedId = null;
  renderTaskbar();
  playClose();
}

function minimizeWindow(id){
  const el = document.getElementById('win-' + id);
  if(el) el.style.display = 'none';
  minimizedWindows[id] = true;
  renderTaskbar();
  playClick();
}

function maximizeWindow(id){
  const el = document.getElementById('win-' + id);
  if(!el) return;
  if(el.classList.contains('maximized')){
    el.classList.remove('maximized');
    el.style.left = el.dataset.prevLeft;
    el.style.top = el.dataset.prevTop;
    el.style.width = el.dataset.prevWidth;
    el.style.height = el.dataset.prevHeight;
  } else {
    el.dataset.prevLeft = el.style.left;
    el.dataset.prevTop = el.style.top;
    el.dataset.prevWidth = el.style.width;
    el.dataset.prevHeight = el.style.height;
    el.classList.add('maximized');
  }
  bringToFront(id);
  playClick();
}

function renderTaskbar(){
  const bar = document.getElementById('taskbar');
  bar.innerHTML = '';
  openWindows.forEach((id) => {
    const el = document.getElementById('win-' + id);
    const iconClass = el.querySelector('.win-title i').className;
    const name = el.querySelector('.win-title').textContent.trim();
    const pill = document.createElement('div');
    pill.className = 'task-pill' + (focusedId === id && !minimizedWindows[id] ? ' focused' : '');
    pill.innerHTML = '<i class="' + iconClass + '"></i><span>' + name + '</span>';
    pill.onclick = () => {
      if(minimizedWindows[id]){
        el.style.display = 'flex';
        minimizedWindows[id] = false;
        playOpen();
      }
      bringToFront(id);
    };
    bar.appendChild(pill);
  });
}

document.querySelectorAll('.window').forEach((win) => {
  const bar = win.querySelector('.win-bar');
  const id = win.dataset.id;

  win.addEventListener('mousedown', () => bringToFront(id));

  bar.addEventListener('mousedown', (e) => {
    if(e.target.classList.contains('wd')) return;
    bringToFront(id);
    const startX = e.clientX, startY = e.clientY;
    const startLeft = parseInt(win.style.left || '0', 10);
    const startTop = parseInt(win.style.top || '0', 10);
    const deskRect = desktop.getBoundingClientRect();

    function onMove(ev){
      let newLeft = startLeft + (ev.clientX - startX);
      let newTop = startTop + (ev.clientY - startY);
      newLeft = Math.max(-win.offsetWidth + 60, Math.min(newLeft, deskRect.width - 40));
      newTop = Math.max(0, Math.min(newTop, deskRect.height - 36));
      win.style.left = newLeft + 'px';
      win.style.top = newTop + 'px';
    }
    function onUp(){
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
});

const cdot = document.getElementById('cursor-dot');
const cring = document.getElementById('cursor-ring');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my, started = false;

window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px'; cdot.style.top = my + 'px';
  if(!started){ started = true; cdot.style.opacity = 1; cring.style.opacity = 1; }
  if(Math.random() < 0.3){
    const p = document.createElement('div');
    p.className = 'stardust';
    p.style.left = mx + 'px'; p.style.top = my + 'px';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
});
function ringLoop(){
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cring.style.left = rx + 'px'; cring.style.top = ry + 'px';
  requestAnimationFrame(ringLoop);
}
ringLoop();
document.querySelectorAll('a, button, .desktop-icon, .mini-file, .task-pill').forEach((el) => {
  el.addEventListener('mouseenter', () => { cring.style.width='44px'; cring.style.height='44px'; });
  el.addEventListener('mouseleave', () => { cring.style.width='28px'; cring.style.height='28px'; });
});

function spawnConfetti(x, y){
  const colors = ['#dba978', '#f0cfa0', '#ffd34d'];
  for(let i = 0; i < 14; i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    const size = 4 + Math.random() * 4;
    c.style.width = size + 'px';
    c.style.height = size + 'px';
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.background = colors[i % colors.length];
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 20;
    c.style.transition = 'transform 0.9s cubic-bezier(.2,.8,.2,1), opacity 0.9s ease';
    document.body.appendChild(c);
    requestAnimationFrame(() => {
      c.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (Math.random()*360) + 'deg)';
      c.style.opacity = '0';
    });
    setTimeout(() => c.remove(), 950);
  }
}

const fireflyContainer = document.getElementById('fireflies');
for(let i = 0; i < 16; i++){
  const f = document.createElement('div');
  f.className = 'firefly';
  const size = 3 + Math.random() * 3;
  f.style.width = size + 'px';
  f.style.height = size + 'px';
  f.style.left = (Math.random() * 100) + 'vw';
  f.style.top = (Math.random() * 100) + 'vh';
  const driftDur = (7 + Math.random() * 8).toFixed(2);
  const flickerDur = (2 + Math.random() * 3).toFixed(2);
  f.style.animation = 'fireflyDrift ' + driftDur + 's ease-in-out infinite, fireflyFlicker ' + flickerDur + 's ease-in-out infinite';
  f.style.animationDelay = (-Math.random() * 10) + 's, ' + (-Math.random() * 5) + 's';
  fireflyContainer.appendChild(f);
}

function updateClock(){
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const el = document.getElementById('menubar-clock');
  if(el) el.textContent = hh + ':' + mm;
}
updateClock();
setInterval(updateClock, 30000);

const mascot = document.getElementById('mascot');
const mascotFlip = document.getElementById('mascot-flip');
const bubble = document.getElementById('bubble');
const machineEl = document.getElementById('machine');

const peekConfigs = [
  {edge:'top', along:0.18}, {edge:'top', along:0.72},
  {edge:'right', along:0.32}, {edge:'right', along:0.78},
  {edge:'bottom', along:0.22}, {edge:'bottom', along:0.6},
  {edge:'left', along:0.3}, {edge:'left', along:0.7}
];
let lastConfigIdx = -1;
let currentPos = null;
let hideTimer = null;

function computePeek(config, w, h){
  const size = 34;
  const inset = 10;
  const out = 20;
  let hiddenLeft, hiddenTop, peekLeft, peekTop, alongX = null, alongY = null;

  if(config.edge === 'top'){
    alongX = config.along * w;
    hiddenLeft = alongX - size/2;
    hiddenTop = inset;
    peekLeft = hiddenLeft;
    peekTop = -out;
  } else if(config.edge === 'bottom'){
    alongX = config.along * w;
    hiddenLeft = alongX - size/2;
    hiddenTop = h - inset - size;
    peekLeft = hiddenLeft;
    peekTop = h - size + out;
  } else if(config.edge === 'left'){
    alongY = config.along * h;
    hiddenTop = alongY - size/2;
    hiddenLeft = inset;
    peekTop = hiddenTop;
    peekLeft = -out;
  } else {
    alongY = config.along * h;
    hiddenTop = alongY - size/2;
    hiddenLeft = w - inset - size;
    peekTop = hiddenTop;
    peekLeft = w - size + out;
  }

  return { edge: config.edge, hiddenLeft, hiddenTop, peekLeft, peekTop, alongX, alongY };
}

function setMascotPos(left, top, animate){
  mascot.style.transition = animate
    ? 'left .55s cubic-bezier(.2,.8,.2,1), top .55s cubic-bezier(.2,.8,.2,1)'
    : 'none';
  mascot.style.left = left + 'px';
  mascot.style.top = top + 'px';
  if(!animate){ void mascot.offsetWidth; }
}

function setFacing(edge){
  if(edge === 'right'){ mascotFlip.classList.add('facing-left'); }
  else { mascotFlip.classList.remove('facing-left'); }
}

function positionBubble(pos, w, h){
  const bw = 200, bh = 84;
  let bx, by;
  if(pos.edge === 'top'){ bx = pos.alongX - bw/2; by = 14; }
  else if(pos.edge === 'bottom'){ bx = pos.alongX - bw/2; by = h - bh - 14; }
  else if(pos.edge === 'left'){ bx = 14; by = pos.alongY - bh/2; }
  else { bx = w - bw - 14; by = pos.alongY - bh/2; }
  bx = Math.max(10, Math.min(bx, w - bw - 10));
  by = Math.max(10, Math.min(by, h - bh - 10));
  bubble.style.left = bx + 'px';
  bubble.style.top = by + 'px';
}

function peekCycle(){
  let idx = Math.floor(Math.random() * peekConfigs.length);
  if(idx === lastConfigIdx) idx = (idx + 1) % peekConfigs.length;
  lastConfigIdx = idx;
  const config = peekConfigs[idx];

  const rect = machineEl.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  const pos = computePeek(config, w, h);
  currentPos = pos;

  setMascotPos(pos.hiddenLeft, pos.hiddenTop, false);
  setFacing(pos.edge);

  setTimeout(() => {
    setMascotPos(pos.peekLeft, pos.peekTop, true);
    setTimeout(() => { showTip(pos, w, h); }, 480);
  }, 150);
}

function showTip(pos, w, h){
  playChime();
  const list = translations[currentLang].tips;
  const msg = list[Math.floor(Math.random() * list.length)];
  bubble.innerHTML = msg;
  positionBubble(pos, w, h);
  bubble.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => { retract(pos); }, 5000);
}

function retract(pos){
  bubble.classList.remove('show');
  setMascotPos(pos.hiddenLeft, pos.hiddenTop, true);
}

function scheduleNextPeek(){
  const delay = 12000 + Math.random() * 8000;
  setTimeout(() => { peekCycle(); scheduleNextPeek(); }, delay);
}

mascot.addEventListener('click', () => {
  if(currentPos && bubble.classList.contains('show')){
    const rect = machineEl.getBoundingClientRect();
    clearTimeout(hideTimer);
    showTip(currentPos, rect.width, rect.height);
  }
});

applyLanguage('en');

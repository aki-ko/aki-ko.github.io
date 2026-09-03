(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const screens = {
    intro: $('#screenIntro'),
    quiz: $('#screenQuiz'),
    result: $('#screenResult'),
    game: $('#screenGame')
  };

  const QUESTIONS = [
    {
      q: '메뉴에 🔥 표시가 붙어 있다.',
      rail: '마라로드 입구에서\n당신의 첫 반응을 확인합니다.',
      answers: [
        ['일단 피한다', 1],
        ['고민하다 주문한다', 2],
        ['오히려 기대된다', 4]
      ]
    },
    {
      q: '첫입이 생각보다 맵다.',
      rail: '첫입 이후에도\n얼마나 더 들어갈 수 있을까요?',
      answers: [
        ['바로 물부터 찾는다', 1],
        ['맵지만 계속 먹는다', 2],
        ['이 정도면 아직 시작도 안 했다', 4]
      ]
    },
    {
      q: '친구가 “한입만 먹어볼게”라고 한다.',
      rail: '마라로드에서 친구를 만났습니다.\n당신이라면 어떻게 할까요?',
      answers: [
        ['흔쾌히 준다', 1],
        ['제일 매운 부분을 골라준다', 3],
        ['직접 마라로드에 입문시킨다', 4]
      ]
    },
    {
      q: '식사를 끝냈는데 입안이 얼얼하다.',
      rail: '마라로드를 빠져나온 뒤에도\n다시 돌아올 마음이 있나요?',
      answers: [
        ['다시는 안 먹겠다고 다짐한다', 1],
        ['다음에는 조금 덜 맵게 먹어야겠다', 2],
        ['이상하게 또 생각난다', 4]
      ]
    }
  ];

  const RESULTS = {
    tourist: {
      min: 0, max: 6,
      level: 'LEVEL 01', title: '마라로드 관광객', short: '관광객', code: 'VISITOR', status: 'VISITOR', route: 'GATE 01', tolerance: 1,
      description: '아직은 마라로드가 조금 낯선 당신.\n일단 입구까지만 구경하는 중.',
      accent: '#e6503b', base: '#f5dfbf', hat: '#df3f2d', pack: '#22201d', emoji: '🧢',
      portrait: './character-tourist.svg',
      questTitle: '입장 스탬프 모으기', questCopy: '낯선 골목을 천천히 둘러보며 입장 스탬프 3개를 모아보세요.'
    },
    explorer: {
      min: 7, max: 10,
      level: 'LEVEL 02', title: '마라로드 탐험가', short: '탐험가', code: 'EXPLORER', status: 'EXPLORER', route: 'GATE 02', tolerance: 2,
      description: '맵다고 하면서도 계속 가는 타입.\n슬슬 마라로드의 매력을 알아가는 중.',
      accent: '#f2912f', base: '#f0d2aa', hat: '#a45d32', pack: '#80602f', emoji: '🥾',
      portrait: './character-explorer.svg',
      questTitle: '향신료 표식 찾기', questCopy: '골목 깊숙이 숨은 향신료 표식 3개를 찾아 탐험 기록을 완성하세요.'
    },
    resident: {
      min: 11, max: 13,
      level: 'LEVEL 03', title: '마라로드 주민', short: '주민', code: 'RESIDENT', status: 'RESIDENT', route: 'GATE 03', tolerance: 4,
      description: '맵다는 말보다 맛있다는 말이 먼저 나온다면\n이미 꽤 오래 거주한 주민입니다.',
      accent: '#df3f2d', base: '#f1d7ba', hat: '#21110e', pack: '#b33025', emoji: '🏮',
      portrait: './character-resident.svg',
      questTitle: '주민 제보 수집', questCopy: '골목의 마라로드 표식 3개를 모아 오늘의 주민 제보를 완성하세요.'
    },
    local: {
      min: 14, max: 99,
      level: 'LEVEL 04', title: '마라로드 토박이', short: '토박이', code: 'LOCAL', status: 'LOCAL', route: 'GATE 04', tolerance: 5,
      description: '마라로드가 맵다고요?\n당신에게는 그냥 평범한 출근길입니다.',
      accent: '#b9231f', base: '#efd3b5', hat: '#21110e', pack: '#6f1d18', emoji: '🔥',
      portrait: './character-local.svg',
      questTitle: '토박이의 숨은 표식', questCopy: '누구나 찾지 못하는 마라로드 표식 3개를 찾아 토박이 인증을 끝내세요.'
    }
  };

  const state = {
    q: 0,
    answers: [],
    score: 0,
    resultKey: 'tourist',
    game: null,
    toastTimer: null
  };

  function showScreen(name) {
    Object.entries(screens).forEach(([key, node]) => node.classList.toggle('screen--active', key === name));
    const label = { intro: 'ENTRY GATE', quiz: 'ENTRY TEST', result: 'RESIDENT CARD', game: 'SPICE ALLEY' }[name];
    $('#topStage').textContent = label;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (name === 'game') setTimeout(() => $('#gameStage').focus(), 60);
  }

  function restartQuiz() {
    state.q = 0;
    state.answers = [];
    state.score = 0;
    renderQuestion();
    showScreen('quiz');
  }

  function renderQuestion() {
    const data = QUESTIONS[state.q];
    $('#questionIndexLabel').textContent = String(state.q + 1).padStart(2, '0');
    $('#questionNumber').textContent = `QUESTION ${String(state.q + 1).padStart(2, '0')}`;
    $('#quizQuestion').textContent = data.q;
    $('#quizRailCopy').innerText = data.rail;
    $('#progressBar').style.width = `${((state.q + 1) / QUESTIONS.length) * 100}%`;
    $('#quizBack').style.visibility = state.q === 0 ? 'hidden' : 'visible';

    const signal = Math.max(1, Math.min(5, Math.round((state.score / Math.max(1, state.answers.length * 4)) * 5) || 1));
    for (let i = 1; i <= 5; i++) $(`#spiceSignal${i}`).classList.toggle('is-on', i <= signal);

    const container = $('#answers');
    container.innerHTML = '';
    data.answers.forEach(([label, score], idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'answer';
      btn.innerHTML = `<span class="answer__key">${String.fromCharCode(65 + idx)}</span><span>${escapeHTML(label)}</span>`;
      btn.addEventListener('click', () => selectAnswer(score));
      container.appendChild(btn);
    });
  }

  function selectAnswer(score) {
    state.answers[state.q] = score;
    if (state.q < QUESTIONS.length - 1) {
      state.q += 1;
      state.score = state.answers.reduce((a, b) => a + (b || 0), 0);
      renderQuestion();
    } else {
      state.score = state.answers.reduce((a, b) => a + (b || 0), 0);
      determineResult();
      renderResult();
      showScreen('result');
    }
  }

  function determineResult() {
    state.resultKey = Object.keys(RESULTS).find(key => state.score >= RESULTS[key].min && state.score <= RESULTS[key].max) || 'local';
    try { sessionStorage.setItem('maraRoadResult', state.resultKey); } catch (_) {}
  }

  function renderResult() {
    const r = RESULTS[state.resultKey];
    $('#resultLevel').textContent = r.level;
    $('#resultTitle').textContent = r.title;
    $('#resultCode').textContent = r.code;
    $('#resultDescription').textContent = r.description;
    $('#resultStatus').textContent = r.status;
    $('#resultRoute').textContent = r.route;
    $('#resultPortrait').src = r.portrait;
    $('#resultPortrait').alt = `${r.title} 캐릭터`;
    $('#resultSeal').style.borderColor = `${r.accent}aa`;
    $('#resultSeal').style.color = r.accent;
    $('#resultLevel').style.background = r.accent;

    const bars = $('#toleranceBars');
    bars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement('i');
      if (i <= r.tolerance) b.classList.add('is-on');
      bars.appendChild(b);
    }
    $('#shareFeedback').textContent = '';
  }

  function shareResult() {
    const r = RESULTS[state.resultKey];
    const text = `나는 ${r.level} ${r.title}! 너는 마라로드 어디까지 갈 수 있을까?`;
    const url = location.href.split('#')[0];
    if (navigator.share) {
      navigator.share({ title: '마라로드 입장 테스트', text, url }).catch(() => {});
      $('#shareFeedback').textContent = '공유 메뉴를 열었습니다.';
    } else {
      $('#shareFeedback').textContent = `${text}  — 이 페이지 주소를 친구에게 보내보세요.`;
    }
  }

  const MAP_W = 11;
  const MAP_H = 7;
  const BLOCKED = new Set([
    '0,0','1,0','2,0','3,0','4,0','5,0','6,0','7,0','8,0','9,0','10,0',
    '0,1','10,1','0,2','10,2','0,3','10,3','0,4','10,4','0,5','10,5','0,6','1,6','2,6','3,6','4,6','5,6','6,6','7,6','8,6','9,6','10,6',
    '4,2','5,2','7,4'
  ]);
  const ITEMS_BASE = [
    { x: 2, y: 2, emoji: '🌶️', name: '마라 표식' },
    { x: 8, y: 2, emoji: '🌶️', name: '마라 표식' },
    { x: 6, y: 5, emoji: '🌶️', name: '마라 표식' }
  ];
  const NPC = { x: 8, y: 4, emoji: '🧓', name: '마라로드 토박이' };
  const STALL = { x: 2, y: 4, emoji: '🍜', name: '마라 포장마차' };
  const SIGN = { x: 5, y: 1, emoji: '🏮', name: '입장 안내판' };

  function initGame() {
    const r = RESULTS[state.resultKey];
    state.game = {
      x: 5, y: 5,
      collected: 0,
      items: ITEMS_BASE.map(item => ({ ...item, collected: false })),
      completed: false,
      movingTimer: null
    };

    $('#hudPortrait').src = r.portrait;
    $('#hudPortrait').alt = `${r.title} 캐릭터`;
    $('#hudLevel').textContent = r.level;
    $('#hudName').textContent = r.short;
    $('#questTitle').textContent = r.questTitle;
    $('#questCopy').textContent = r.questCopy;
    $('#questProgressText').textContent = '0 / 3';
    $('#questProgressBar').style.width = '0%';
    $('#inventorySlots').innerHTML = '<i>·</i><i>·</i><i>·</i>';
    $('#dialogueSpeaker').textContent = '안내 표지판';
    $('#dialogueText').textContent = '방향키 또는 WASD로 골목을 움직여보세요. 가까운 오브젝트는 Space 또는 조사하기 버튼으로 확인할 수 있습니다.';
    $('#interactButton').textContent = '조사하기';
    $('#modalSprite').textContent = r.emoji;
    $('#modalCopy').textContent = `${r.title} 캐릭터로 마라로드 첫 퀘스트를 완료했습니다.`;

    const player = $('#player');
    player.dataset.avatar = state.resultKey;
    player.style.setProperty('--avatar-base', r.base);
    player.style.setProperty('--avatar-accent', r.accent);
    player.style.setProperty('--avatar-hat', r.hat);
    player.style.setProperty('--avatar-pack', r.pack);
    player.innerHTML = '<i class="player__pack"></i><i class="player__body"></i>';

    renderMap();
    renderGame();
    closeGameModal();
  }

  function pctX(x) { return ((x + 0.5) / MAP_W) * 100; }
  function pctY(y) { return ((y + 0.5) / MAP_H) * 100; }

  function renderMap() {
    const props = $('#mapProps');
    props.innerHTML = '';

    const decorations = [
      { x: 1, y: 1, emoji: '🏮', cls: 'prop--small' },
      { x: 9, y: 1, emoji: '🏮', cls: 'prop--small' },
      { x: 1, y: 5, emoji: '🪴', cls: 'prop--small' },
      { x: 9, y: 5, emoji: '🪑', cls: 'prop--small' },
      { x: 4, y: 2, emoji: '🧱', cls: 'prop--wall' },
      { x: 5, y: 2, emoji: '🧱', cls: 'prop--wall' },
      { x: 7, y: 4, emoji: '📦', cls: 'prop--small' }
    ];
    decorations.forEach(d => addProp(props, d.x, d.y, d.emoji, d.cls));
    addProp(props, STALL.x, STALL.y, STALL.emoji, 'prop--npc', 'stall');
    addProp(props, NPC.x, NPC.y, NPC.emoji, 'prop--npc', 'npc');
    addProp(props, SIGN.x, SIGN.y, SIGN.emoji, 'prop--small', 'sign');

    state.game.items.forEach((item, idx) => {
      const el = addProp(props, item.x, item.y, item.emoji, `prop--item${item.collected ? ' prop--done' : ''}`, `item-${idx}`);
      if (item.collected) el.setAttribute('aria-hidden', 'true');
    });
  }

  function addProp(root, x, y, emoji, cls = '', id = '') {
    const el = document.createElement('div');
    el.className = `prop ${cls}`.trim();
    if (id) el.dataset.prop = id;
    el.textContent = emoji;
    el.style.left = `${pctX(x)}%`;
    el.style.top = `${pctY(y)}%`;
    root.appendChild(el);
    return el;
  }

  function renderGame() {
    const g = state.game;
    const player = $('#player');
    player.style.left = `${pctX(g.x)}%`;
    player.style.top = `${pctY(g.y)}%`;

    $('#questProgressText').textContent = `${g.collected} / 3`;
    $('#questProgressBar').style.width = `${(g.collected / 3) * 100}%`;
    $('#inventorySlots').innerHTML = [0,1,2].map(i => `<i>${i < g.collected ? '🌶️' : '·'}</i>`).join('');

    const near = nearestInteractable();
    const hint = $('#interactHint');
    if (near) {
      hint.classList.add('is-visible');
      hint.style.left = `${pctX(g.x)}%`;
      hint.style.top = `${Math.max(2, pctY(g.y) - 11)}%`;
      $('#interactButton').disabled = false;
      $('#interactButton').textContent = near.type === 'item' ? '획득하기' : near.type === 'npc' ? '대화하기' : '조사하기';
    } else {
      hint.classList.remove('is-visible');
      $('#interactButton').disabled = false;
      $('#interactButton').textContent = '주변 조사하기';
    }
  }

  function distance(ax, ay, bx, by) { return Math.abs(ax - bx) + Math.abs(ay - by); }

  function nearestInteractable() {
    if (!state.game) return null;
    const g = state.game;
    const activeItem = g.items.find((item, idx) => !item.collected && distance(g.x, g.y, item.x, item.y) <= 1 && (item._idx = idx) >= 0);
    if (activeItem) return { type: 'item', item: activeItem, idx: activeItem._idx };
    if (distance(g.x, g.y, NPC.x, NPC.y) <= 1) return { type: 'npc' };
    if (distance(g.x, g.y, STALL.x, STALL.y) <= 1) return { type: 'stall' };
    if (distance(g.x, g.y, SIGN.x, SIGN.y) <= 1) return { type: 'sign' };
    return null;
  }

  function move(dx, dy) {
    if (!state.game || state.game.completed) return;
    const nx = state.game.x + dx;
    const ny = state.game.y + dy;
    if (nx < 0 || nx >= MAP_W || ny < 0 || ny >= MAP_H || BLOCKED.has(`${nx},${ny}`)) {
      say('골목 끝', '이쪽 길은 막혀 있습니다. 다른 방향으로 돌아가보세요.');
      shakeStage();
      return;
    }
    state.game.x = nx;
    state.game.y = ny;
    const p = $('#player');
    p.classList.add('is-walking');
    clearTimeout(state.game.movingTimer);
    state.game.movingTimer = setTimeout(() => p.classList.remove('is-walking'), 180);
    const near = nearestInteractable();
    if (near && near.type === 'item') say('반짝이는 표식', '가까이에 마라로드 표식이 있습니다. 조사해서 획득해보세요.');
    else if (near && near.type === 'npc') say(NPC.name, state.game.collected >= 3 ? '오, 표식을 전부 찾았군. 이제 제법 마라로드 사람 같은데?' : '골목을 잘 살펴봐. 빨간 표식 세 개를 찾으면 인정해주지.');
    else if (near && near.type === 'stall') say(STALL.name, '얼얼한 향이 올라옵니다. 오늘도 주민들이 지나가며 한입씩 챙겨 가는 곳입니다.');
    renderGame();
  }

  function interact() {
    if (!state.game) return;
    const near = nearestInteractable();
    if (!near) {
      say('주변', '지금 위치에는 특별한 것이 없습니다. 골목 안쪽을 더 둘러보세요.');
      return;
    }
    if (near.type === 'item') {
      const item = state.game.items[near.idx];
      if (!item || item.collected) return;
      item.collected = true;
      state.game.collected += 1;
      renderMap();
      renderGame();
      toast(`🌶️ 마라로드 표식 획득 · ${state.game.collected}/3`);
      if (state.game.collected >= 3) {
        say('QUEST UPDATE', '표식 3개를 모두 모았습니다. 이제 오른쪽 골목의 토박이에게 말을 걸어보세요.');
      } else {
        say('아이템 획득', `마라로드 표식을 찾았습니다. 남은 표식 ${3 - state.game.collected}개.`);
      }
    } else if (near.type === 'npc') {
      if (state.game.collected >= 3) {
        state.game.completed = true;
        say(NPC.name, '좋아. 오늘부터 이 골목을 그냥 지나쳐도 되겠어. 마라로드 입장 인증 완료!');
        setTimeout(openGameModal, 400);
      } else {
        say(NPC.name, `아직 ${3 - state.game.collected}개 남았네. 골목 바닥과 포장마차 근처를 잘 살펴봐.`);
      }
    } else if (near.type === 'stall') {
      say(STALL.name, '맵기는 선택이지만, 마라로드에 들어온 이상 한입은 먹어봐야지. 표식은 골목 곳곳에 있어.');
    } else if (near.type === 'sign') {
      say('입장 안내판', '마라로드 규칙: ① 천천히 둘러보기 ② 표식 세 개 찾기 ③ 토박이에게 인증받기.');
    }
  }

  function say(speaker, text) {
    $('#dialogueSpeaker').textContent = speaker;
    $('#dialogueText').textContent = text;
  }

  function shakeStage() {
    const stage = $('#gameStage');
    stage.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 150 });
  }

  function openGameModal() {
    $('#gameModal').classList.add('is-open');
    $('#gameModal').setAttribute('aria-hidden', 'false');
    $('#closeModal').focus();
  }

  function closeGameModal() {
    $('#gameModal').classList.remove('is-open');
    $('#gameModal').setAttribute('aria-hidden', 'true');
  }

  function toast(text) {
    const t = $('#toast');
    t.textContent = text;
    t.classList.add('is-visible');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => t.classList.remove('is-visible'), 1800);
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));
  }

  $('#startTest').addEventListener('click', restartQuiz);
  $('#quizBack').addEventListener('click', () => {
    if (state.q > 0) {
      state.q -= 1;
      state.answers = state.answers.slice(0, state.q + 1);
      state.score = state.answers.slice(0, state.q).reduce((a, b) => a + (b || 0), 0);
      renderQuestion();
    }
  });
  $('#restartTest').addEventListener('click', restartQuiz);
  $('#shareTest').addEventListener('click', shareResult);
  $('#enterGame').addEventListener('click', () => { initGame(); showScreen('game'); });
  $('#exitGame').addEventListener('click', () => showScreen('result'));
  $('#brandHome').addEventListener('click', () => showScreen('intro'));
  $('#interactButton').addEventListener('click', interact);
  $('#interactMobile').addEventListener('click', interact);
  $('#gameHelp').addEventListener('click', () => say('조작법', 'PC에서는 방향키 또는 WASD로 이동하고 Space로 대화/조사합니다. 모바일에서는 화면 아래 방향 버튼과 가운데 ● 버튼을 사용하세요.'));
  $('#closeModal').addEventListener('click', closeGameModal);
  $('#gameModal .modal__backdrop').addEventListener('click', closeGameModal);
  $('#playAgain').addEventListener('click', () => { initGame(); toast('퀘스트를 다시 시작했습니다.'); });
  $('#backToResultFromModal').addEventListener('click', () => { closeGameModal(); showScreen('result'); });

  $$('[data-move]').forEach(btn => btn.addEventListener('click', () => {
    const dir = btn.dataset.move;
    move(dir === 'right' ? 1 : dir === 'left' ? -1 : 0, dir === 'down' ? 1 : dir === 'up' ? -1 : 0);
  }));

  $('#gameStage').addEventListener('keydown', (e) => {
    const controls = {
      ArrowUp: [0,-1], w: [0,-1], W:[0,-1],
      ArrowDown: [0,1], s:[0,1], S:[0,1],
      ArrowLeft: [-1,0], a:[-1,0], A:[-1,0],
      ArrowRight: [1,0], d:[1,0], D:[1,0]
    };
    if (controls[e.key]) {
      e.preventDefault();
      move(...controls[e.key]);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      interact();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('#gameModal').classList.contains('is-open')) closeGameModal();
  });

  try {
    const saved = sessionStorage.getItem('maraRoadResult');
    if (saved && RESULTS[saved]) state.resultKey = saved;
  } catch (_) {}

  renderQuestion();
})();

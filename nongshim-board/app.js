(() => {
  'use strict';

  const STORAGE_POSTS = 'nongshim-board-local-posts-v1';
  const STORAGE_ACTIVITY = 'nongshim-board-activity-v1';

  const seedPosts = [
    {
      id: 382,
      product: '신라면',
      title: '회사 탕비실 신라면 연쇄 실종 사건 — 매주 화요일만 사라집니다',
      author: 'NIGHT_SHIFT_02',
      date: '2026.09.02 23:41',
      location: '서울 / 회사 탕비실',
      report: '3주째 화요일 밤마다 탕비실 신라면이 정확히 한 봉지씩 사라집니다. 야근자는 네 명인데 전부 아니라고 했고, 이상하게 컵라면은 건드리지 않습니다. 지난주에는 전자레인지 시계가 새벽 02:17에서 멈춰 있었습니다.',
      theory: '화요일 심야에만 지구로 들어오는 생명체가 봉지라면 조리법을 익힌 것으로 추정합니다. 컵라면을 가져가지 않는 건 아직 뜨거운 물 사용법을 모르는 것 같습니다.',
      views: 18492,
      credible: 382,
      doubtful: 61,
      evidence: [
        { author: '야근금지', text: '우리 회사도 수요일 아침마다 신라면만 비어 있음. 시간대가 비슷해서 소름.', time: '8분 전' },
        { author: 'packet_sniffer', text: '02:17이면 지난달 서울 북서쪽 미확인 섬광 제보 시간하고 3분 차이입니다.', time: '14분 전' },
        { author: 'NONGSHIM_OFFICIAL', text: '해당 내용은 사실이 아닙니다.', time: '17분 전', official: true },
        { author: 'redsignal', text: '공식 계정이 17분 만에 온 게 제일 강한 증거 같은데요.', time: '15분 전' }
      ]
    },
    {
      id: 371,
      product: '새우깡',
      title: '새우깡 봉지 안쪽 은박을 펴봤는데 별자리처럼 보이는 점들이 있습니다',
      author: 'SHRIMP_SIGNAL',
      date: '2026.09.02 18:03',
      location: '부산 / 자택',
      report: '먹고 난 새우깡 봉지를 버리려다 안쪽 은박에 미세한 점들이 반복되는 걸 발견했습니다. 그냥 인쇄 자국인 줄 알았는데 봉지 세 개를 비교하니 위치가 조금씩 다릅니다. 휴대폰 별자리 앱을 켜고 대충 맞춰보니 북두칠성 쪽과 비슷합니다.',
      theory: '새우깡 봉지는 단순 포장재가 아니라 귀환 좌표를 일회용으로 전달하는 장치일 가능성이 있습니다. 그래서 한 번 먹은 봉지는 다시 쓰지 않는 겁니다.',
      views: 11284,
      credible: 211,
      doubtful: 83,
      evidence: [
        { author: 'foil_hat_real', text: '방금 집에 있는 봉지 펼쳐봤는데 제 건 점 네 개가 일직선입니다. 사진 밝기 올려보는 중.', time: '22분 전' },
        { author: '별자리초보', text: '북두칠성은 아닌 것 같은데, 점이 랜덤이라고 보기엔 묘하게 규칙적이긴 함.', time: '31분 전' }
      ]
    },
    {
      id: 365,
      product: '너구리',
      title: '너구리 면발 통신 케이블설 정리합니다. 굵은 데는 이유가 있음',
      author: 'UDON_PROTOCOL',
      date: '2026.09.02 12:11',
      location: '대전 / 원룸',
      report: '왜 유독 너구리 면발은 굵은지 10년 동안 아무도 제대로 설명하지 않았습니다. 삶기 전 면 두 가닥을 나란히 두고 휴대폰 스피커 옆에 놨더니 알림이 올 때 아주 미세하게 떨리는 걸 봤습니다. 우연이라고 하기엔 정확히 진동 타이밍이 맞았습니다.',
      theory: '면발 내부에 극미세 통신 구조가 있고 끓는 물에 들어가야 활성화되는 것으로 봅니다. 우리가 라면을 끓일 때마다 무언가에게 “식사 시작” 신호를 보내는 셈입니다.',
      views: 9812,
      credible: 294,
      doubtful: 29,
      evidence: [
        { author: 'packet_noodle', text: '전자레인지 옆에서는 떨림 더 심함. 진짜 테스트해본 사람 있음?', time: '1시간 전' },
        { author: '면발연구소', text: '끓이고 나면 신호가 끊긴다는 점까지 확인해야 합니다.', time: '1시간 전' },
        { author: '라면은라면', text: '그냥 굵은 면입니다 여러분.', time: '56분 전' }
      ]
    },
    {
      id: 354,
      product: '짜파게티',
      title: '짜파게티 검은 소스는 밤에 더 진해집니다. 같은 조명에서 비교함',
      author: 'BLACK_BEAN_X',
      date: '2026.09.01 23:58',
      location: '인천 / 주방',
      report: '점심에 끓인 짜파게티와 밤 11시 40분에 끓인 짜파게티를 같은 식탁, 같은 조명, 같은 카메라 설정으로 찍었습니다. 밤 사진의 소스가 명확히 더 검습니다. 가족한테 물어봤더니 맛도 밤에 더 진하다고 했습니다.',
      theory: '짜파게티 소스에는 주변 광량에 반응하는 미확인 물질이 들어 있으며, 야간에 본래 상태로 돌아오는 것으로 추정합니다. 일요일 밤에 특히 활성도가 높을 가능성이 있습니다.',
      views: 8620,
      credible: 162,
      doubtful: 118,
      evidence: [
        { author: 'SundayCook', text: '일요일 밤에 진해지는 건 인정. 근데 월요일이 싫어서 그런 걸 수도.', time: '2시간 전' },
        { author: 'pixel_peeper', text: '사진 EXIF 동일한지 확인 부탁드립니다. 이건 검증 가치 있음.', time: '2시간 전' }
      ]
    },
    {
      id: 347,
      product: '새우깡',
      title: '갈매기들이 사람보다 새우깡 봉지 뜯는 소리를 먼저 알아듣는 이유',
      author: 'GULL_WATCHER',
      date: '2026.09.01 17:22',
      location: '속초 / 방파제',
      report: '방파제에서 새우깡 봉지 꺼내기만 했는데 30m쯤 떨어져 있던 갈매기들이 동시에 고개를 돌렸습니다. 봉지도 아직 안 뜯었습니다. 다른 과자 봉지는 반응이 없었습니다. 다음날 다시 가서 재현했는데 결과가 같았습니다.',
      theory: '갈매기들은 인간이 듣지 못하는 새우깡 패키지 고유 주파수를 감지합니다. 문제는 그 주파수가 왜 존재하는가입니다. 갈매기가 최초 수신자였을 가능성이 있습니다.',
      views: 7451,
      credible: 421,
      doubtful: 44,
      evidence: [
        { author: 'eastsea88', text: '강릉에서도 똑같았습니다. 봉지 꺼내는 순간 모입니다.', time: '3시간 전' },
        { author: 'bird_not_found', text: '갈매기 입장에서는 우리가 새우깡 배송 기사인 셈.', time: '3시간 전' },
        { author: 'radio_noise', text: '봉지 마찰음의 고주파 성분 분석하면 끝날 듯. 누가 녹음 파일 올려주세요.', time: '2시간 전' }
      ]
    },
    {
      id: 331,
      product: '신라면',
      title: '신라면 로고의 빨간색과 지난달 UFO 사진 색값 비교해봤습니다',
      author: 'RED_CHANNEL_255',
      date: '2026.08.31 20:09',
      location: '온라인 / 이미지 분석',
      report: '커뮤니티에 올라온 미확인 비행물체 사진의 붉은 광원을 추출해서 신라면 패키지의 대표 빨간색과 비교했습니다. 압축 오차를 감안하면 생각보다 값이 너무 가깝습니다. 여러 사진 중 유독 한국에서 촬영된 것들이 더 비슷합니다.',
      theory: '붉은 패키지는 브랜드 컬러가 아니라 외부 개체와 통신하기 위한 시각 신호일 수 있습니다. 우리가 매장에서 보는 진열대가 사실상 거대한 비콘이라는 가설입니다.',
      views: 13507,
      credible: 504,
      doubtful: 97,
      evidence: [
        { author: 'color_lab', text: '색공간 통일하고 다시 비교해야 합니다. 그래도 샘플 세 개는 꽤 가까움.', time: '어제' },
        { author: 'mart_worker', text: '야간에 라면 코너 CCTV가 가끔 붉게 플레어 뜨는 건 봤음.', time: '어제' }
      ]
    },
    {
      id: 319,
      product: '너구리',
      title: '다시마가 매번 하나씩만 들어 있는 이유가 너무 명확합니다',
      author: 'KELP_ARCHIVE',
      date: '2026.08.30 14:40',
      location: '제주 / 자택',
      report: '너구리 다섯 봉지를 뜯어 다시마 모양을 촬영했습니다. 전부 크기와 굴곡이 미묘하게 달랐습니다. 당연한 얘기처럼 보이지만 이상한 건, 다섯 장을 순서대로 겹치면 가운데 빈 공간이 원형에 가깝게 만들어진다는 점입니다.',
      theory: '다시마는 다섯 봉지 이상 구매한 사람만 완성할 수 있는 물리적 키 조각일 수 있습니다. 아직 여섯 번째 조각이 필요한지는 확인하지 못했습니다.',
      views: 6319,
      credible: 188,
      doubtful: 72,
      evidence: [
        { author: '5pack_owner', text: '이 글 보고 다섯 개 뜯을 뻔했습니다. 누가 먼저 해주세요.', time: '2일 전' },
        { author: 'seaweedkey', text: '그 원형에 계란 올리면 그냥 맛있을 것 같음.', time: '2일 전' }
      ]
    },
    {
      id: 298,
      product: '짜파게티',
      title: '일요일만 되면 짜파게티 검색량이 오르는 건 방송 때문이 아닙니다',
      author: 'SUNDAY_SIGNAL',
      date: '2026.08.29 11:04',
      location: '온라인 / 검색 기록',
      report: '사람들이 “일요일엔 내가 요리사”라는 말을 오래 들어서 그렇다고 생각하지만 순서가 반대일 가능성을 제기합니다. 일요일마다 먼저 짜파게티 생각이 나고, 그 현상을 설명하기 위해 우리가 광고 문구를 만든 건 아닐까요.',
      theory: '일요일 오전에만 작동하는 집단 식욕 동기화 현상이 존재하며 광고는 원인이 아니라 관측 기록일 수 있습니다.',
      views: 5790,
      credible: 155,
      doubtful: 138,
      evidence: [
        { author: 'weekendchef', text: '이건 말도 안 되는데 지금 짜파게티 먹고 싶어짐.', time: '3일 전' }
      ]
    },
    {
      id: 281,
      product: '기타',
      title: '편의점 농심 진열대 앞에서만 블루투스 기기가 하나 더 잡힙니다',
      author: 'BT_UNKNOWN',
      date: '2026.08.28 01:17',
      location: '수원 / 편의점',
      report: '이어폰 연결하다가 이름 없는 블루투스 기기 하나가 떠서 확인했습니다. 매장 밖으로 5m 정도 나가면 사라지고 라면 진열대로 가면 다시 잡힙니다. 직원에게 물어봤지만 매장 기기는 아니라고 했습니다.',
      theory: '제품별 판매 데이터를 읽는 비콘일 수도 있지만 이름조차 없는 게 이상합니다. 혹시 외부 수신기가 진열대 신호를 중계하는 것일 수 있습니다.',
      views: 12105,
      credible: 337,
      doubtful: 55,
      evidence: [
        { author: 'BLE_scan', text: '기기 MAC 주소 캡처 가능하면 제조사 확인 가능합니다.', time: '4일 전' },
        { author: 'store_404', text: '우리 매장은 안 뜸. 특정 지점만 그런 듯.', time: '4일 전' }
      ]
    },
    {
      id: 267,
      product: '신라면',
      title: '해외여행 갔는데 현지인보다 신라면이 먼저 도착해 있었습니다',
      author: 'EARTH_NOT_FIRST',
      date: '2026.08.26 19:33',
      location: '아이슬란드 / 작은 마트',
      report: '관광객 거의 없는 작은 동네 마트에 들어갔는데 한국 사람은 저뿐이었고 신라면은 있었습니다. 직원에게 언제부터 팔았냐고 물었더니 “기억나지 않을 만큼 오래됐다”고 했습니다. 이상한 건 그 마트가 생긴 연도보다 제품 입고 장부 첫 기록이 더 오래됐다는 겁니다.',
      theory: '농심 유통망은 우리가 알고 있는 지도상의 도로를 사용하지 않을 가능성이 있습니다. 또는 제품이 매장보다 먼저 존재했을 수 있습니다.',
      views: 15222,
      credible: 598,
      doubtful: 41,
      evidence: [
        { author: 'ledger_reader', text: '장부 연도 사진 있으면 거의 특급 자료입니다.', time: '5일 전' },
        { author: 'north_route', text: '북유럽 작은 마을에서 비슷한 경험 있음. 김치는 없는데 신라면은 있었음.', time: '5일 전' }
      ]
    },
    {
      id: 251,
      product: '새우깡',
      title: '새우깡을 정확히 17개 먹으면 왜 다음 한 개가 더 맛있는지 설명이 안 됩니다',
      author: 'COUNT_TO_18',
      date: '2026.08.24 22:18',
      location: '광주 / 자택',
      report: '우연히 세다가 발견했습니다. 1~16개까지는 평범한데 17번째 먹고 난 뒤 18번째가 유난히 맛있습니다. 다음날 새 봉지로 다시 했는데 같았습니다. 친구 두 명에게 블라인드로 시켰더니 한 명도 18번째를 최고라고 골랐습니다.',
      theory: '17개 단위로 미각 적응을 초기화하는 설계가 있는 것으로 의심합니다. 왜 하필 17인지는 아직 모르겠습니다.',
      views: 4461,
      credible: 98,
      doubtful: 129,
      evidence: [
        { author: 'snack_science', text: '표본 두 명은 부족합니다. 저는 오늘부터 실험 들어갑니다.', time: '1주 전' }
      ]
    }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const state = {
    posts: [],
    category: 'ALL',
    search: '',
    sort: 'recent',
    activePostId: null,
    activity: { votes: {}, comments: {}, views: {} }
  };

  const accessScreen = $('#accessScreen');
  const site = $('#site');
  const postList = $('#postList');
  const trendList = $('#trendList');
  const emptyState = $('#emptyState');
  const boardTitle = $('#boardTitle');
  const postModal = $('#postModal');
  const postModalContent = $('#postModalContent');
  const composerModal = $('#composerModal');
  const caseZeroModal = $('#caseZeroModal');
  const toast = $('#toast');

  function safeParse(value, fallback) {
    try { return JSON.parse(value) ?? fallback; } catch (_) { return fallback; }
  }

  function loadState() {
    const localPosts = safeParse(localStorage.getItem(STORAGE_POSTS), []);
    const activity = safeParse(localStorage.getItem(STORAGE_ACTIVITY), { votes: {}, comments: {}, views: {} });
    state.activity = {
      votes: activity && activity.votes ? activity.votes : {},
      comments: activity && activity.comments ? activity.comments : {},
      views: activity && activity.views ? activity.views : {}
    };
    state.posts = [...localPosts, ...seedPosts];
  }

  function saveLocalPosts() {
    const locals = state.posts.filter(post => post.localOnly);
    localStorage.setItem(STORAGE_POSTS, JSON.stringify(locals));
  }

  function saveActivity() {
    localStorage.setItem(STORAGE_ACTIVITY, JSON.stringify(state.activity));
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat('ko-KR').format(Math.max(0, Number(value) || 0));
  }

  function getPost(id) {
    return state.posts.find(post => String(post.id) === String(id));
  }

  function getVoteDelta(post) {
    const vote = state.activity.votes[String(post.id)];
    return {
      credible: vote === 'credible' ? 1 : 0,
      doubtful: vote === 'doubtful' ? 1 : 0
    };
  }

  function getMetrics(post) {
    const delta = getVoteDelta(post);
    const credible = (post.credible || 0) + delta.credible;
    const doubtful = (post.doubtful || 0) + delta.doubtful;
    const credibility = Math.round((credible / Math.max(1, credible + doubtful)) * 100);
    const addedComments = state.activity.comments[String(post.id)] || [];
    const evidenceCount = (post.evidence || []).length + addedComments.length;
    const views = (post.views || 0) + (state.activity.views[String(post.id)] || 0);
    return { credible, doubtful, credibility, evidenceCount, views };
  }

  function getStatus(post) {
    const { credibility, evidenceCount } = getMetrics(post);
    if (credibility >= 90 && evidenceCount >= 2) return { key: 'CLASSIFIED', label: 'CLASSIFIED', className: 'classified' };
    if (credibility >= 78) return { key: 'SUSPICIOUS', label: 'HIGHLY SUSPICIOUS', className: 'suspicious' };
    if (credibility >= 60) return { key: 'INVESTIGATING', label: 'UNDER INVESTIGATION', className: '' };
    return { key: 'UNVERIFIED', label: 'UNVERIFIED', className: '' };
  }

  function filteredPosts() {
    const query = state.search.trim().toLowerCase();
    let posts = state.posts.filter(post => state.category === 'ALL' || post.product === state.category);
    if (query) {
      posts = posts.filter(post => [post.title, post.author, post.product, post.location, post.report, post.theory]
        .some(value => String(value || '').toLowerCase().includes(query)));
    }
    return posts.sort((a, b) => {
      if (state.sort === 'credibility') return getMetrics(b).credibility - getMetrics(a).credibility;
      if (state.sort === 'views') return getMetrics(b).views - getMetrics(a).views;
      if (state.sort === 'evidence') return getMetrics(b).evidenceCount - getMetrics(a).evidenceCount;
      return Number(b.id) - Number(a.id);
    });
  }

  function renderBoard() {
    const posts = filteredPosts();
    boardTitle.textContent = state.category === 'ALL' ? 'ALL REPORTS' : `${state.category} FILES`;
    postList.innerHTML = posts.map(post => {
      const m = getMetrics(post);
      const status = getStatus(post);
      return `
        <article class="post-row ${post.localOnly ? 'post-row--local' : ''}">
          <div class="post-index"><b>#${String(post.id).padStart(4, '0')}</b><span>${escapeHtml(post.product)}</span></div>
          <div class="post-main">
            <button type="button" data-open-post="${escapeHtml(post.id)}">
              <span class="post-meta">
                <span class="product-tag">${escapeHtml(post.product)}</span>
                <span class="status-tag ${status.className}">${status.label}</span>
                ${post.localOnly ? '<span class="local-tag">LOCAL ONLY</span>' : ''}
              </span>
              <span class="post-title">${escapeHtml(post.title)}</span>
              <span class="post-author">${escapeHtml(post.author)} · ${escapeHtml(post.date)}</span>
            </button>
          </div>
          <div class="post-stat"><span>신빙성</span><b>${m.credibility}%</b><div class="credibility-bar"><i style="width:${m.credibility}%"></i></div></div>
          <div class="post-stat"><span>증거</span><b>${formatNumber(m.evidenceCount)}</b></div>
          <div class="post-stat"><span>조회</span><b>${formatNumber(m.views)}</b></div>
        </article>`;
    }).join('');
    emptyState.hidden = posts.length !== 0;
    renderCounters();
    bindPostLinks();
  }

  function renderCounters() {
    $('#archiveCount').textContent = String(state.posts.length + 419).padStart(4, '0');
    $('#classifiedCount').textContent = String(state.posts.filter(post => getStatus(post).key === 'CLASSIFIED').length + 12).padStart(4, '0');
  }

  function renderTrends() {
    const trending = [...state.posts]
      .sort((a, b) => {
        const am = getMetrics(a); const bm = getMetrics(b);
        return (bm.views + bm.evidenceCount * 350 + bm.credibility * 42) - (am.views + am.evidenceCount * 350 + am.credibility * 42);
      })
      .slice(0, 5);
    trendList.innerHTML = trending.map((post, index) => {
      const m = getMetrics(post);
      return `<li><button type="button" data-open-post="${escapeHtml(post.id)}"><b>${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(post.title)}<small>${escapeHtml(post.product)} · 신빙성 ${m.credibility}%</small></span></button></li>`;
    }).join('');
    bindPostLinks(trendList);
  }

  function bindPostLinks(root = document) {
    $$('[data-open-post]', root).forEach(button => {
      if (button.dataset.bound) return;
      button.dataset.bound = '1';
      button.addEventListener('click', () => openPost(button.dataset.openPost));
    });
  }

  function openPost(id) {
    const post = getPost(id);
    if (!post) return;
    state.activePostId = post.id;
    const key = String(post.id);
    state.activity.views[key] = (state.activity.views[key] || 0) + 1;
    saveActivity();
    renderPostModal(post);
    openModal(postModal);
    renderBoard();
    renderTrends();
  }

  function evidenceSceneLabel(post) {
    const map = {
      '새우깡': 'PACKET / ANOMALOUS SURFACE',
      '신라면': 'RED SIGNAL / CCTV FRAME',
      '짜파게티': 'LOW LIGHT / SAUCE SAMPLE',
      '너구리': 'NOODLE / MATERIAL TEST',
      '기타': 'UNIDENTIFIED / FIELD RECORD'
    };
    return map[post.product] || map['기타'];
  }

  function renderPostModal(post) {
    const m = getMetrics(post);
    const status = getStatus(post);
    const activityComments = state.activity.comments[String(post.id)] || [];
    const comments = [...(post.evidence || []), ...activityComments];
    const vote = state.activity.votes[String(post.id)] || '';
    postModalContent.innerHTML = `
      <header class="dossier-head">
        <div class="dossier-head__top"><span>CASE #${String(post.id).padStart(4, '0')} / ${escapeHtml(post.product)}</span><span>${status.label}</span></div>
        <h2 id="postModalTitle">${escapeHtml(post.title)}</h2>
        <p class="dossier-summary">작성자 ${escapeHtml(post.author)} · ${escapeHtml(post.date)} · ${escapeHtml(post.location)}</p>
      </header>
      <div class="dossier-grid">
        <section class="dossier-main">
          <p class="section-title">INCIDENT REPORT</p>
          <p class="report-text">${escapeHtml(post.report)}</p>
          <div class="evidence-visual" aria-label="가상 증거 이미지 표현">
            <div class="evidence-scene"></div>
            <div class="evidence-object"></div>
            <div class="evidence-caption"><strong>EVIDENCE A-${String(post.id).slice(-2)}</strong><br />${escapeHtml(evidenceSceneLabel(post))}<br />FRAME ENHANCED / UNVERIFIED</div>
          </div>
          <div class="theory-box"><b>REPORTER THEORY</b><div class="theory-text">${escapeHtml(post.theory)}</div></div>

          <section class="evidence-comments">
            <p class="section-title">ADDITIONAL EVIDENCE / ${comments.length}</p>
            ${comments.length ? comments.map((comment, index) => `
              <article class="evidence-comment">
                <b>EVIDENCE #${String(index + 1).padStart(2, '0')} · ${comment.official ? '[OFFICIAL?] ' : ''}${escapeHtml(comment.author)}</b>
                <p>${escapeHtml(comment.text)}</p>
                <small>${escapeHtml(comment.time || '방금 전')}</small>
              </article>`).join('') : '<p class="report-text">아직 추가 증거가 없습니다.</p>'}
            <form class="evidence-form" id="evidenceForm">
              <label class="sr-only" for="evidenceText">추가 증거 댓글</label>
              <textarea id="evidenceText" maxlength="240" placeholder="이 사건에 추가할 목격담이나 증거를 남겨주세요. 이 브라우저에만 저장됩니다." required></textarea>
              <button type="submit">+ ADD EVIDENCE</button>
            </form>
          </section>
        </section>
        <aside class="dossier-side">
          <p class="section-title">FILE METADATA</p>
          <dl class="dossier-meta">
            <div><dt>PRODUCT</dt><dd>${escapeHtml(post.product)}</dd></div>
            <div><dt>LOCATION</dt><dd>${escapeHtml(post.location)}</dd></div>
            <div><dt>VIEWS</dt><dd>${formatNumber(m.views)}</dd></div>
            <div><dt>EVIDENCE</dt><dd>${formatNumber(m.evidenceCount)}</dd></div>
            <div><dt>STATUS</dt><dd>${status.label}</dd></div>
          </dl>
          <div class="credibility-card">
            <span>COMMUNITY CREDIBILITY</span>
            <div class="credibility-number">${m.credibility}<small>%</small></div>
            <div class="credibility-bar"><i style="width:${m.credibility}%"></i></div>
            <div class="vote-buttons">
              <button type="button" data-vote="credible" ${vote ? 'disabled' : ''}>신빙성 있음<br />+${formatNumber(m.credible)}</button>
              <button type="button" data-vote="doubtful" ${vote ? 'disabled' : ''}>조작 의심<br />+${formatNumber(m.doubtful)}</button>
            </div>
            ${vote ? `<p style="font-size:8px;color:#6c7067;margin:9px 0 0">이 브라우저의 판단이 기록되었습니다: ${vote === 'credible' ? '신빙성 있음' : '조작 의심'}</p>` : ''}
          </div>
          ${post.localOnly ? '<p style="font-size:9px;color:#796f45;line-height:1.65;margin-top:18px">LOCAL FILE<br />이 게시물은 현재 브라우저에서 작성된 데모 제보입니다. 다른 방문자에게는 표시되지 않습니다.</p>' : ''}
        </aside>
      </div>`;

    $$('[data-vote]', postModalContent).forEach(button => button.addEventListener('click', () => voteOnPost(post.id, button.dataset.vote)));
    const evidenceForm = $('#evidenceForm', postModalContent);
    evidenceForm.addEventListener('submit', event => {
      event.preventDefault();
      const textarea = $('#evidenceText', evidenceForm);
      addEvidence(post.id, textarea.value);
    });
  }

  function voteOnPost(id, type) {
    const key = String(id);
    if (state.activity.votes[key]) {
      showToast('이 브라우저에서는 이미 판단을 남겼습니다.');
      return;
    }
    state.activity.votes[key] = type;
    saveActivity();
    const post = getPost(id);
    renderPostModal(post);
    renderBoard();
    renderTrends();
    showToast(type === 'credible' ? '신빙성 있음으로 기록되었습니다.' : '조작 의심으로 기록되었습니다.');
  }

  function addEvidence(id, rawText) {
    const text = String(rawText || '').trim();
    if (!text) return;
    const key = String(id);
    if (!state.activity.comments[key]) state.activity.comments[key] = [];
    state.activity.comments[key].push({ author: 'LOCAL_WITNESS', text: text.slice(0, 240), time: '방금 전' });
    saveActivity();
    renderPostModal(getPost(id));
    renderBoard();
    renderTrends();
    showToast('추가 증거가 현재 브라우저에 기록되었습니다.');
  }

  function openModal(modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!$$('.modal.is-open').length) document.body.style.overflow = '';
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
  }

  function openComposer() {
    openModal(composerModal);
    setTimeout(() => $('[name="title"]', composerModal)?.focus(), 40);
  }

  function createLocalPost(form) {
    const data = new FormData(form);
    const now = new Date();
    const nextId = Math.max(...state.posts.map(post => Number(post.id) || 0), 500) + 1;
    const post = {
      id: nextId,
      product: String(data.get('product') || '기타'),
      title: String(data.get('title') || '').trim().slice(0, 70),
      author: 'LOCAL_ANONYMOUS',
      date: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      location: String(data.get('location') || '').trim().slice(0, 32),
      report: String(data.get('report') || '').trim().slice(0, 420),
      theory: String(data.get('theory') || '').trim().slice(0, 280),
      views: 1,
      credible: 0,
      doubtful: 0,
      evidence: [],
      localOnly: true
    };
    if (!post.title || !post.location || !post.report || !post.theory) return;
    state.posts.unshift(post);
    saveLocalPosts();
    form.reset();
    state.category = 'ALL';
    state.search = '';
    $$('.category-button').forEach(button => button.classList.toggle('is-active', button.dataset.category === 'ALL'));
    $('#searchInput').value = '';
    closeModal(composerModal);
    renderBoard();
    renderTrends();
    showToast(`CASE #${String(post.id).padStart(4, '0')}이 이 브라우저에 등록되었습니다.`);
    setTimeout(() => openPost(post.id), 250);
  }

  function initializeEvents() {
    $('#accessButton').addEventListener('click', () => {
      accessScreen.style.opacity = '0';
      accessScreen.style.transition = 'opacity .28s ease';
      setTimeout(() => {
        accessScreen.hidden = true;
        site.hidden = false;
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 280);
    });

    $('#homeButton').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    $('#openComposer').addEventListener('click', openComposer);
    $('#openComposerTop').addEventListener('click', openComposer);

    $$('.category-button').forEach(button => button.addEventListener('click', () => {
      state.category = button.dataset.category;
      $$('.category-button').forEach(item => item.classList.toggle('is-active', item === button));
      renderBoard();
    }));

    $('#searchInput').addEventListener('input', event => {
      state.search = event.target.value;
      renderBoard();
    });

    $('#sortSelect').addEventListener('change', event => {
      state.sort = event.target.value;
      renderBoard();
    });

    $$('[data-close-modal]').forEach(element => element.addEventListener('click', () => closeModal(postModal)));
    $$('[data-close-composer]').forEach(element => element.addEventListener('click', () => closeModal(composerModal)));
    $$('[data-close-zero]').forEach(element => element.addEventListener('click', () => closeModal(caseZeroModal)));

    $('#composerForm').addEventListener('submit', event => {
      event.preventDefault();
      createLocalPost(event.currentTarget);
    });

    $('#caseZeroButton').addEventListener('click', () => {
      $('#hiddenReveal').classList.remove('is-visible');
      openModal(caseZeroModal);
    });

    $('#revealRedacted').addEventListener('click', () => {
      $('#hiddenReveal').classList.add('is-visible');
      $('#revealRedacted').style.display = 'none';
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      [postModal, composerModal, caseZeroModal].forEach(modal => {
        if (modal.classList.contains('is-open')) closeModal(modal);
      });
    });
  }

  function startClock() {
    const clock = $('#clockText');
    const render = () => {
      const now = new Date();
      clock.textContent = `NODE 01 ONLINE · ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    };
    render();
    setInterval(render, 1000);
  }

  loadState();
  initializeEvents();
  renderBoard();
  renderTrends();
  startClock();
})();

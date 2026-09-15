// js/app.js - לוגיקת האתר, ניהול מודאלים ועץ השלבים

let currentTrack = null;
let candidateTrack = null;
let activeLesson = null;
let activeCardIndex = 0;

// פונקציית עזר להוצאת פרמטרים מכתובת ה-URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 1. אתחול עמוד תפקידים (roles.html)
function initRolesPage() {
  const container = document.getElementById('rolesGridContainer');
  if (!container) return;

  container.innerHTML = coursesData.tracks.map(track => `
    <article class="role-card">
      <div>
        <div class="role-meta">&gt; ${track.isBaseTrack ? 'entry_level' : 'specialization'}</div>
        <h3>${track.title}</h3>
        <p>${track.roleDesc}</p>
      </div>
      <button class="btn-start-role" onclick="handleRoleSelection('${track.id}')">
        אני רוצה להתחיל ללמוד ←
      </button>
    </article>
  `).join('');
}

// בלחיצה על תפקיד - בדיקה האם זה בסיס או דורש שאלת רקע
function handleRoleSelection(trackId) {
  const track = coursesData.tracks.find(t => t.id === trackId);
  if (!track) return;

  if (track.isBaseTrack) {
    window.location.href = `track.html?id=${track.id}`;
    return;
  }

  candidateTrack = track;
  const nameEl = document.getElementById('selectedRoleName');
  if (nameEl) nameEl.innerText = track.title;
  
  const modal = document.getElementById('backgroundPromptModal');
  if (modal) modal.classList.remove('hidden');
}

// בחירה מתוך פופאפ הרקע
function handleBackgroundChoice(hasBackground) {
  const modal = document.getElementById('backgroundPromptModal');
  if (modal) modal.classList.add('hidden');

  if (hasBackground && candidateTrack) {
    window.location.href = `track.html?id=${candidateTrack.id}`;
  } else {
    window.location.href = `track.html?id=foundations`;
  }
}

// 2. אתחול עמוד מסלול למידה (track.html)
function initTrackPage() {
  const trackId = getQueryParam('id') || 'foundations';
  currentTrack = coursesData.tracks.find(t => t.id === trackId) || coursesData.tracks[0];

  const titleEl = document.getElementById('currentTrackHeading');
  const subEl = document.getElementById('currentTrackSub');
  const badgeEl = document.getElementById('currentTrackBadge');
  const bannerEl = document.getElementById('baseReminderBanner');

  if (titleEl) titleEl.innerText = currentTrack.title;
  if (subEl) subEl.innerText = currentTrack.roleDesc;
  if (badgeEl) badgeEl.innerText = `> ${currentTrack.id}_track`;

  if (bannerEl) {
    bannerEl.style.display = currentTrack.isBaseTrack ? 'none' : 'flex';
  }

  renderDuoPath(currentTrack);
}

// ציור שלבי הדואלינגו
function renderDuoPath(track) {
  const container = document.getElementById('duoPathContainer');
  if (!container) return;

  const positions = ['pos-center', 'pos-right', 'pos-left'];

  container.innerHTML = track.lessons.map((lesson, index) => {
    const posClass = positions[index % positions.length];
    return `
      <div class="duo-node ${posClass}" onclick="openLessonModal('${lesson.id}')">
        <div class="duo-circle">
          ${index + 1}
        </div>
        <div class="duo-title">${lesson.title}</div>
        <div class="duo-sub">&gt; ${lesson.category}</div>
      </div>
    `;
  }).join('');
}

// פתיחת מודאל שיעור
function openLessonModal(lessonId) {
  if (!currentTrack) return;
  activeLesson = currentTrack.lessons.find(l => l.id === lessonId);
  if (!activeLesson) return;

  document.getElementById('modalCategory').innerText = `> ${activeLesson.category}`;
  document.getElementById('modalTitle').innerText = activeLesson.title;

  switchModalTab('videos');
  changeVideoTier('taste');

  activeCardIndex = 0;
  updateCardView();

  document.getElementById('labInstruction').innerText = activeLesson.lab.instruction;
  document.getElementById('labSnippet').innerText = activeLesson.lab.snippet;
  document.getElementById('labLink').href = activeLesson.lab.link;
  document.getElementById('labCredit').innerText = activeLesson.lab.credit;

  const qList = document.getElementById('interviewQuestionsList');
  qList.innerHTML = activeLesson.interviewQuestions.map(item => `
    <div class="interview-item">
      <div class="interview-q">שאלה: ${item.q}</div>
      <div class="interview-a">תשובה מומלצת: ${item.a}</div>
    </div>
  `).join('');

  document.getElementById('projectIdea').innerText = activeLesson.projectIdea;
  document.getElementById('lessonModal').classList.remove('hidden');
}

function closeLessonModal() {
  const video = document.getElementById('videoPlayer');
  if (video) video.pause();
  const modal = document.getElementById('lessonModal');
  if (modal) modal.classList.add('hidden');
}

function switchModalTab(tabId) {
  ['videos', 'cards', 'lab', 'interview'].forEach(t => {
    const pane = document.getElementById(`tabContent-${t}`);
    const btn = document.getElementById(`tabBtn-${t}`);
    if (pane && btn) {
      if (t === tabId) {
        pane.classList.remove('hidden');
        btn.classList.add('active');
      } else {
        pane.classList.add('hidden');
        btn.classList.remove('active');
      }
    }
  });
}

function changeVideoTier(tier) {
  if (!activeLesson) return;
  ['taste', 'deep', 'expert'].forEach(t => {
    const btn = document.getElementById(`tierBtn-${t}`);
    if (btn) {
      if (t === tier) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  const videoData = activeLesson.videos[tier];
  const player = document.getElementById('videoPlayer');
  const source = document.getElementById('videoSource');

  if (source && player) {
    source.src = videoData.url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    player.load();
  }
  const desc = document.getElementById('videoDescription');
  if (desc) desc.innerText = videoData.desc;
}

function flipCard() {
  const card = document.getElementById('flashcardInner');
  if (card) card.classList.toggle('rotate-y-180');
}

function updateCardView() {
  const inner = document.getElementById('flashcardInner');
  if (inner) inner.classList.remove('rotate-y-180');
  if (!activeLesson || !activeLesson.cards.length) return;

  const card = activeLesson.cards[activeCardIndex];
  document.getElementById('cardTerm').innerText = card.term;
  document.getElementById('cardDefinition').innerText = card.def;
  document.getElementById('cardCounter').innerText = `${activeCardIndex + 1} / ${activeLesson.cards.length}`;
}

function nextCard() {
  if (!activeLesson) return;
  activeCardIndex = (activeCardIndex + 1) % activeLesson.cards.length;
  updateCardView();
}

function prevCard() {
  if (!activeLesson) return;
  activeCardIndex = (activeCardIndex - 1 + activeLesson.cards.length) % activeLesson.cards.length;
  updateCardView();
}

// מאזיני סגירת מודאל
window.addEventListener('DOMContentLoaded', () => {
  const lessonModal = document.getElementById('lessonModal');
  if (lessonModal) {
    lessonModal.addEventListener('click', function(e) {
      if (e.target === this) closeLessonModal();
    });
  }

  const bgModal = document.getElementById('backgroundPromptModal');
  if (bgModal) {
    bgModal.addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  }
});

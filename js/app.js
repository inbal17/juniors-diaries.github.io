// js/app.js - לוגיקת האתר עם רשת ביטחון מובנית (Fail-Safe)

let currentTrack = null;
let candidateTrack = null;
let activeLesson = null;
let activeCardIndex = 0;

// === רשת ביטחון (עותק גיבוי מובנה למקרה ש-courses.js נפגם) ===
const fallbackCoursesData = {
  tracks: [
    {
      id: "foundations",
      title: "בסיס חובה לכל תפקיד",
      isBaseTrack: true,
      roleDesc: "שער הכניסה לעולם הסייבר! תקשורת מחשבים, מערכות הפעלה ועקרונות אבטחה בסיסיים.",
      lessons: [
        {
          id: "net-osi",
          title: "מודל OSI ופרוטוקולי תקשורת",
          category: "networking",
          videos: {
            taste: { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", desc: "טעימה (2 דקות): מודל 7 השכבות ו-TCP מול UDP." },
            deep: { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", desc: "צלילה לעומק (10 דקות): לחיצת יד משולשת וניתוח כותרות IP." },
            expert: { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", desc: "הופכת למומחית (30 דקות): ניתוח תעבורה ואיתור אנומליות." }
          },
          cards: [{ term: "TCP Handshake", def: "לחיצת יד משולשת (SYN, SYN-ACK, ACK) להקמת חיבור אמין." }],
          lab: { instruction: "ניתוח קובץ PCAP ב-Wireshark לאיתור דומיין חשוד.", snippet: "wireshark capture.pcap", link: "https://www.wireshark.org", credit: "Wireshark Sample" },
          interviewQuestions: [{ q: "מה ההבדל בין TCP ל-UDP?", a: "TCP אמין ומבטיח הגעה, UDP מהיר ללא בדיקת הגעה." }],
          projectIdea: "כתיבת סקריפט Python ב-Scapy להאזנה לתעבורת DNS."
        }
      ]
    },
    {
      id: "security-research",
      title: "חוקרת אבטחה (Security Research)",
      roleDesc: "הנדסה לאחור (Reverse Engineering), ניתוח נוזקות, מציאת חולשות Zero-Day ופיתוח Exploits.",
      lessons: [
        {
          id: "reverse-eng",
          title: "מבוא להנדסה לאחור ו-Assembly",
          category: "reverse_engineering",
          videos: {
            taste: { url: "", desc: "2 דקות: איך קוד הופך לבינארי ומה עושה Decompiler." },
            deep: { url: "", desc: "10 דקות: אוגרים, ה-Stack ופקודות בסיס ב-x86." },
            expert: { url: "", desc: "30 דקות: פתיחת קובץ CrackMe ב-Ghidra ועקיפת בדיקה." }
          },
          cards: [{ term: "Decompiler", def: "כלי המתרגם שפת מכונה חזרה לקוד דמוי C." }],
          lab: { instruction: "פתחי קובץ בינארי ב-Ghidra ואתרי את תנאי הסיסמה.", snippet: "ghidraRun", link: "https://ghidra-sre.org", credit: "Ghidra Lab" },
          interviewQuestions: [{ q: "מה ההבדל בין ניתוח סטטי לדינמי?", a: "סטטי בודק קוד בלי להריץ, דינמי מריץ בסביבה מבודדת." }],
          projectIdea: "ניתוח דוגמת נוזקה בלתי מזיקה וכתיבת דוח IOC."
        }
      ]
    },
    {
      id: "soc-analyst",
      title: "אנליסטית SOC (Blue Team)",
      roleDesc: "תחקור התראות מרובות ממערכות SIEM, ניתוח לוגים, זיהוי מתקפות ובלימה ראשונית.",
      lessons: [
        {
          id: "soc-logs",
          title: "ניתוח לוגים ו-Windows Event IDs",
          category: "blue_team",
          videos: {
            taste: { url: "", desc: "2 דקות: מה רואה אנליסטית SOC מול המסך." },
            deep: { url: "", desc: "10 דקות: אירועים קריטיים: 4624 מול 4625." },
            expert: { url: "", desc: "30 דקות: שרשרת תקיפה מלאה בלוגים." }
          },
          cards: [{ term: "Event ID 4625", def: "ניסיון התחברות שנכשל ב-Windows." }],
          lab: { instruction: "נתחי קובץ Evtx ומצאי את ה-IP שתקף ב-Brute Force.", snippet: "Get-WinEvent -Path ./Sec.evtx", link: "https://tryhackme.com", credit: "TryHackMe" },
          interviewQuestions: [{ q: "כיצד תבדילי בין שכחת סיסמה למתקפת Brute Force?", a: "לפי תדירות ניסיונות בשנייה ומקור ה-IP." }],
          projectIdea: "הקמת סביבת Wazuh מקומית ותחקור אירוע."
        }
      ]
    },
    {
      id: "appsec",
      title: "בודקת חדירות ו-AppSec (Red Team)",
      roleDesc: "בדיקת עמידות אפליקציות ואתרים, דימוי תקיפות (OWASP Top 10) וכתיבת דוחות תיקון.",
      lessons: [
        {
          id: "sqli-lesson",
          title: "חולשות הזרקת קוד (SQL Injection)",
          category: "appsec_redteam",
          videos: {
            taste: { url: "", desc: "2 דקות: עקיפת אימות בעזרת שאילתה פשוטה." },
            deep: { url: "", desc: "10 דקות: In-band מול Blind SQLi." },
            expert: { url: "", desc: "30 דקות: עקיפת WAF וכתיבת Remediation." }
          },
          cards: [{ term: "Prepared Statements", def: "הפרדת הקוד משאילתת המשתמש למניעת SQLi." }],
          lab: { instruction: "עקיפת אימות ב-PortSwigger Academy.", snippet: "admin' --", link: "https://portswigger.net", credit: "PortSwigger" },
          interviewQuestions: [{ q: "איך מונעים SQLi בקוד?", a: "שימוש ב-Parameterized Queries ו-ORM." }],
          projectIdea: "פיתוח אפליקציה פגיעה ותיקון הקוד ב-GitHub."
        }
      ]
    },
    {
      id: "grc",
      title: "מנהלת רגולציה וסיכונים (GRC)",
      roleDesc: "החיבור בין הסייבר הטכני לניהול, עבודה מול תקנים (ISO 27001), וקביעת מדיניות אבטחה.",
      lessons: [
        {
          id: "grc-risk",
          title: "מתודולוגיית ניהול והערכת סיכונים",
          category: "grc_compliance",
          videos: {
            taste: { url: "", desc: "2 דקות: איום, חולשה וסיכון." },
            deep: { url: "", desc: "10 דקות: בניית מטריצת סיכונים." },
            expert: { url: "", desc: "30 דקות: הכנה מלאה להסמכת ISO 27001." }
          },
          cards: [{ term: "Risk Formula", def: "Risk = Threat × Vulnerability × Impact" }],
          lab: { instruction: "בניית מסמך הערכת סיכונים לסטארט-אפ.", snippet: "Asset: DB | Threat: Ransomware", link: "https://csrc.nist.gov", credit: "NIST" },
          interviewQuestions: [{ q: "מהן 4 הדרכים לטיפול בסיכון?", a: "הפחתה, העברה, קבלה, או הימנעות." }],
          projectIdea: "כתיבת מדיניות אבטחת מידע ארגונית."
        }
      ]
    }
  ]
};

// פונקציה שמבטיחה שהנתונים קיימים תמיד
function getSafeCoursesData() {
  if (typeof coursesData !== 'undefined' && coursesData && Array.isArray(coursesData.tracks) && coursesData.tracks.length > 0) {
    return coursesData;
  }
  console.warn("Using fallback courses data to prevent blank screen.");
  return fallbackCoursesData;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// === Gamification ===
function getCompletedLessons() {
  try {
    return JSON.parse(localStorage.getItem('completedLessons') || '[]');
  } catch (e) {
    return [];
  }
}

function getUserXP() {
  try {
    return parseInt(localStorage.getItem('userXP') || '0', 10);
  } catch (e) {
    return 0;
  }
}

function addXP(amount) {
  const current = getUserXP();
  const updated = Math.max(0, current + amount);
  localStorage.setItem('userXP', updated.toString());
  updateXPDisplay();
}

function updateXPDisplay() {
  const xpBadge = document.getElementById('userXPBadge');
  if (xpBadge) {
    xpBadge.innerText = `⚡ ${getUserXP()} XP`;
  }
}

// 1. אתחול עמוד תפקידים (roles.html) מוגן משגיאות
function initRolesPage() {
  try {
    const container = document.getElementById('rolesGridContainer');
    if (!container) return;

    const data = getSafeCoursesData();
    const specializationTracks = data.tracks.filter(track => !track.isBaseTrack);

    container.innerHTML = specializationTracks.map(track => `
      <article class="role-card">
        <div>
          <div class="role-meta">&gt; specialization</div>
          <h3>${track.title || 'תפקיד'}</h3>
          <p>${track.roleDesc || ''}</p>
        </div>
        <button class="btn-start-role" onclick="handleRoleSelection('${track.id}')">
          אני רוצה להתחיל ללמוד ←
        </button>
      </article>
    `).join('');
  } catch (err) {
    console.error("Error in initRolesPage:", err);
  }
}

function handleRoleSelection(trackId) {
  const data = getSafeCoursesData();
  const track = data.tracks.find(t => t.id === trackId);
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

function handleBackgroundChoice(hasBackground) {
  const modal = document.getElementById('backgroundPromptModal');
  if (modal) modal.classList.add('hidden');

  if (hasBackground && candidateTrack) {
    window.location.href = `track.html?id=${candidateTrack.id}`;
  } else {
    window.location.href = `track.html?id=foundations`;
  }
}

// 2. אתחול עמוד מסלול למידה (track.html) מוגן משגיאות
function initTrackPage() {
  try {
    const data = getSafeCoursesData();
    const trackId = getQueryParam('id') || 'foundations';
    currentTrack = data.tracks.find(t => t.id === trackId) || data.tracks[0];

    const titleEl = document.getElementById('currentTrackHeading');
    const subEl = document.getElementById('currentTrackSub');
    const badgeEl = document.getElementById('currentTrackBadge');
    const bannerEl = document.getElementById('baseReminderBanner');

    if (titleEl) titleEl.innerText = currentTrack.title || '';
    if (subEl) subEl.innerText = currentTrack.roleDesc || '';
    if (badgeEl) badgeEl.innerText = `> ${currentTrack.id}_track`;

    if (bannerEl) {
      bannerEl.style.display = currentTrack.isBaseTrack ? 'none' : 'flex';
    }

    renderDuoPath(currentTrack);
    updateXPDisplay();
  } catch (err) {
    console.error("Error in initTrackPage:", err);
  }
}

function renderDuoPath(track) {
  try {
    const container = document.getElementById('duoPathContainer');
    if (!container) return;

    const positions = ['pos-center', 'pos-right', 'pos-left'];
    const completed = getCompletedLessons();
    const validLessons = (track.lessons || []).filter(l => l && l.id && l.title);

    if (validLessons.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); padding:30px;">עדיין לא נוספו שיעורים למסלול זה.</p>`;
      return;
    }

    container.innerHTML = validLessons.map((lesson, index) => {
      const posClass = positions[index % positions.length];
      const isDone = completed.includes(lesson.id);

      return `
        <div class="duo-node ${posClass}" onclick="openLessonModal('${lesson.id}')">
          <div class="duo-circle ${isDone ? 'duo-done' : ''}">
            ${isDone ? '✓' : index + 1}
          </div>
          <div class="duo-title">${lesson.title}</div>
          <div class="duo-sub">&gt; ${lesson.category || 'lesson'}</div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error("Error in renderDuoPath:", err);
  }
}

function openLessonModal(lessonId) {
  if (!currentTrack || !currentTrack.lessons) return;
  activeLesson = currentTrack.lessons.find(l => l.id === lessonId);
  if (!activeLesson) return;

  document.getElementById('modalCategory').innerText = `> ${activeLesson.category || 'general'}`;
  document.getElementById('modalTitle').innerText = activeLesson.title || 'שיעור';

  switchModalTab('videos');
  changeVideoTier('taste');

  activeCardIndex = 0;
  updateCardView();

  const lab = activeLesson.lab || {};
  document.getElementById('labInstruction').innerText = lab.instruction || 'אין הוראות כרגע.';
  document.getElementById('labSnippet').innerText = lab.snippet || '';
  document.getElementById('labLink').href = lab.link || '#';
  document.getElementById('labCredit').innerText = lab.credit || '';

  const qList = document.getElementById('interviewQuestionsList');
  const questions = activeLesson.interviewQuestions || [];
  qList.innerHTML = questions.map(item => `
    <div class="interview-item">
      <div class="interview-q">שאלה: ${item.q || ''}</div>
      <div class="interview-a">תשובה מומלצת: ${item.a || ''}</div>
    </div>
  `).join('');

  document.getElementById('projectIdea').innerText = activeLesson.projectIdea || 'בניית פרויקט אישי ל-GitHub בנושא זה.';

  updateCompletionButton();
  document.getElementById('lessonModal').classList.remove('hidden');
}

function closeLessonModal() {
  const video = document.getElementById('videoPlayer');
  if (video) video.pause();
  const modal = document.getElementById('lessonModal');
  if (modal) modal.classList.add('hidden');
}

function updateCompletionButton() {
  const btn = document.getElementById('btnToggleCompletion');
  if (!btn || !activeLesson) return;

  const completed = getCompletedLessons();
  const isDone = completed.includes(activeLesson.id);

  if (isDone) {
    btn.innerText = "ביטול סימון סיום שיעור (הסרת ✓)";
    btn.style.background = "var(--bg-card)";
    btn.style.border = "1px solid var(--slate)";
    btn.style.color = "var(--text-muted)";
  } else {
    btn.innerText = "סיימתי את השיעור בהצלחה! ✓ (+50 XP)";
    btn.style.background = "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)";
    btn.style.border = "1px solid var(--accent)";
    btn.style.color = "#ffffff";
  }
}

function toggleLessonCompletion() {
  if (!activeLesson) return;

  let completed = getCompletedLessons();
  const isDone = completed.includes(activeLesson.id);

  if (isDone) {
    completed = completed.filter(id => id !== activeLesson.id);
    localStorage.setItem('completedLessons', JSON.stringify(completed));
    addXP(-50);
    alert("סימון השיעור הוסר (הופחתו 50 XP)");
  } else {
    completed.push(activeLesson.id);
    localStorage.setItem('completedLessons', JSON.stringify(completed));
    addXP(50);
    alert("אלופה! סיימת את השיעור וצברת 50 XP! 🛡️⚡");
  }

  updateCompletionButton();
  renderDuoPath(currentTrack);
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

  const videos = activeLesson.videos || {};
  const videoData = videos[tier] || {};
  const player = document.getElementById('videoPlayer');
  const source = document.getElementById('videoSource');

  if (source && player) {
    source.src = videoData.url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    player.load();
  }
  const desc = document.getElementById('videoDescription');
  if (desc) desc.innerText = videoData.desc || 'סרטון הדרכה לשיעור זה.';
}

function flipCard() {
  const card = document.getElementById('flashcardInner');
  if (card) card.classList.toggle('rotate-y-180');
}

function updateCardView() {
  const inner = document.getElementById('flashcardInner');
  if (inner) inner.classList.remove('rotate-y-180');
  
  const cards = (activeLesson && activeLesson.cards) || [];
  if (cards.length === 0) {
    document.getElementById('cardTerm').innerText = "אין כרטיסיות";
    document.getElementById('cardDefinition').innerText = "לא נוספו כרטיסיות לשיעור זה.";
    document.getElementById('cardCounter').innerText = "0 / 0";
    return;
  }

  const card = cards[activeCardIndex] || cards[0];
  document.getElementById('cardTerm').innerText = card.term || '';
  document.getElementById('cardDefinition').innerText = card.def || '';
  document.getElementById('cardCounter').innerText = `${activeCardIndex + 1} / ${cards.length}`;
}

function nextCard() {
  const cards = (activeLesson && activeLesson.cards) || [];
  if (cards.length === 0) return;
  activeCardIndex = (activeCardIndex + 1) % cards.length;
  updateCardView();
}

function prevCard() {
  const cards = (activeLesson && activeLesson.cards) || [];
  if (cards.length === 0) return;
  activeCardIndex = (activeCardIndex - 1 + cards.length) % cards.length;
  updateCardView();
}

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

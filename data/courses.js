// data/courses.js - קובץ נתוני המסלולים והשיעורים
// להוספת תפקיד או שיעור חדש - פשוט מוסיפים כאן אובייקט חדש!
const coursesData = {
  tracks: [
    {
      id: "foundations",
      title: "בסיס חובה לכל תפקיד",
      isBaseTrack: true,
      roleDesc: "שער הכניסה לעולם הסייבר! כל מה שג'וניורית חייבת לדעת עוד לפני שבחרה התמחות ספציפית: מודל OSI, תקשורת מחשבים, מערכות הפעלה לינוקס ועקרונות אבטחה בסיסיים.",
      lessons: [
        {
          id: "net-osi",
          title: "מודל OSI ופרוטוקולי תקשורת",
          category: "networking",
          videos: {
            taste: {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
              desc: "טעימה (2 דקות): למה בכלל צריך 7 שכבות ומדוע TCP שונה מ-UDP באינטואיציה פשוטה."
            },
            deep: {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
              desc: "צלילה לעומק (10 דקות): פירוק תהליך ה-Three-way handshake, ניתוח כותרות IP ודגלי תקשורת."
            },
            expert: {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              desc: "הופכת למומחית (30 דקות): ניתוח תעבורת רשת אמיתית, איתור אנומליות ופישינג ברמת הפאקטות, וחקירת DNS Tunneling מא' ועד ת'."
            }
          },
          cards: [
            { term: "TCP Handshake", def: "לחיצת יד משולשת: SYN, SYN-ACK, ACK המקימה חיבור אמין ומאומת בין שני מחשבים לפני העברת המידע." },
            { term: "DNS (Port 53)", def: "פרוטוקול לתרגום שמות מתחם (Domains) לכתובות IP. עובד בדרך כלל על גבי UDP." },
            { term: "ARP Poisoning", def: "מתקפת Man-in-the-Middle בה תוקף שולח הודעות ARP מזויפות לרשת כדי לשייך את כתובת ה-MAC שלו ל-IP של הראוטר." }
          ],
          lab: {
            instruction: "הורידי קובץ תעבורת רשת (PCAP), פתחי ב-Wireshark ונחי את בקשות ה-DNS כדי לגלות איזה דומיין זדוני נדגם ברשת.",
            snippet: "wireshark capture.pcap\n# סינון מומלץ לחבילות שאילתה:\ndns.flags.response == 0",
            link: "https://www.wireshark.org",
            credit: "באדיבות Wireshark Sample Captures"
          },
          interviewQuestions: [
            { q: "מה ההבדל בין TCP ל-UDP ומתי נעדיף כל אחד?", a: "TCP אמין ומבטיח סדר והגעת מידע (HTTP, SSH). UDP מוותר על אמינות לטובת מהירות וזמן אמת (סטרימינג, VoIP, DNS)." },
            { q: "מה קורה ברמת הרשת בשנייה שאת לוחצת Enter בדפדפן?", a: "תרגום DNS, פתיחת חיבור TCP בלחיצת יד משולשת, לחיצת יד TLS/HTTPS, ושליחת בקשת HTTP GET." }
          ],
          projectIdea: "בניית סקריפט פייתון קצר (בעזרת Scapy) שסורק ומאזין לרשת הביתית ומתריע כשנשלחות שאילתות DNS לאתרים חשודים."
        },
        {
          id: "os-linux",
          title: "יסודות לינוקס והרשאות קבצים",
          category: "operating_systems",
          videos: {
            taste: { url: "", desc: "טעימה (2 דקות): מבנה מערכת הקבצים בלינוקס ומדוע הכל נחשב קובץ." },
            deep: { url: "", desc: "צלילה לעומק (10 דקות): הרשאות קבצים (rwx), משמעות chmod מספרית, ופקודות ניהול תהליכים." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): הסבר מעמיק על הרשאות מיוחדות (SUID, SGID), מנגנוני בידוד וזיהוי הסלמת הרשאות (Privilege Escalation)." }
          },
          cards: [
            { term: "chmod 755", def: "הרשאת קריאה, כתיבה והרצה לבעלים (7), והרשאות קריאה והרצה בלבד לקבוצה ולשאר (5, 5)." },
            { term: "SUID Bit", def: "ביט הרשאה מיוחד המאפשר לקובץ לרוץ תחת ההרשאות של בעליו (למשל root) ולא תחת המשתמש שהריץ אותו." }
          ],
          lab: {
            instruction: "התחברי ב-SSH למשחק Bandit והשלימי את שלבים 0 עד 4 על מנת לחפש סיסמאות מוחבאות בקבצים נסתרים.",
            snippet: "ssh bandit0@bandit.labs.overthewire.org -p 2220",
            link: "https://overthewire.org/wargames/bandit/",
            credit: "באדיבות פרויקט OverTheWire"
          },
          interviewQuestions: [
            { q: "איך תאתרי בלינוקס קבצים עם הרשאת SUID?", a: "בעזרת הפקודה: find / -perm -4000 -type f 2>/dev/null" }
          ],
          projectIdea: "כתיבת כלי Bash שמבצע בדיקת Hardening בסיסית על שרת לינוקס ומייצר דוח עם רשימת משתמשים בעלי הרשאות sudo חריגות."
        }
      ]
    },
    {
      id: "soc-analyst",
      title: "אנליסטית SOC (Blue Team)",
      roleDesc: "שומרי הסף של הארגון בזמן אמת. התפקיד כולל תחקור התראות מרובות ממערכות SIEM, ניתוח לוגים של שרתים ותחנות קצה, זיהוי מתקפות Brute Force ופישינג, ופעולות בלימה ראשוניות.",
      lessons: [
        {
          id: "soc-logs",
          title: "ניתוח לוגים ו-Windows Event IDs",
          category: "blue_team",
          videos: {
            taste: { url: "", desc: "טעימה (2 דקות): מה רואה אנליסטית SOC מול המסך ולמה לוגים הם הראיה החשובה ביותר?" },
            deep: { url: "", desc: "צלילה לעומק (10 דקות): האירועים הקריטיים ב-Security Log: אירוע 4624 (התחברות) מול 4625 (כישלון)." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): ניתוח שרשרת תקיפה מלאה בלוגים – החל מ-Pass-the-Hash ועד הרצת פקודות PowerShell חבויות." }
          },
          cards: [
            { term: "Event ID 4625", def: "אירוע ברישום האבטחה של Windows המעיד על ניסיון התחברות שנכשל (Failed Logon)." },
            { term: "Logon Type 10", def: "סוג התחברות מרחוק באמצעות פרוטוקול RDP." }
          ],
          lab: {
            instruction: "נתחי קובץ Evtx של אירועי Windows ומצאי את ה-IP שתקף את השרת ב-Brute Force.",
            snippet: "Get-WinEvent -Path ./Sec.evtx | Where-Object {$_.Id -eq 4625}",
            link: "https://tryhackme.com",
            credit: "תרגול מומלץ ב-TryHackMe (Windows Event Logs)"
          },
          interviewQuestions: [
            { q: "כיצד תבדילי בין משתמש ששכח סיסמה לבין התקפת Brute Force אמיתית?", a: "תדירות ניסיונות (עשרות בשנייה), שעות לא שגרתיות, ומקור ה-IP ממנו מגיעה הבקשה." }
          ],
          projectIdea: "הקמת סביבת Wazuh או Elastic מקומית במעבדה וירטואלית והדגמת תחקור התראת סייבר עם דוח ממצאים מקצועי."
        }
      ]
    },
    {
      id: "appsec",
      title: "בודקת חדירות ו-AppSec (Red Team)",
      roleDesc: "ההאקרים הטובים! בדיקת העמידות של אפליקציות, אתרי אינטרנט ותשתיות על ידי דימוי תקיפות אמיתיות (OWASP Top 10), איתור חולשות קוד, פריצה מבוקרת וכתיבת דוחות המלצה לתיקון.",
      lessons: [
        {
          id: "sqli-lesson",
          title: "חולשות הזרקת קוד (SQL Injection)",
          category: "appsec_redteam",
          videos: {
            taste: { url: "", desc: "טעימה (2 דקות): איך שאילתת SQL פשוטה עוקפת מסך התחברות שלם?" },
            deep: { url: "", desc: "צלילה לעומק (10 דקות): ההבדל בין In-band, Blind ו-Time-based SQLi." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): עקיפת מנגנוני WAF, איתור נקודות הזרקה מורכבות וכתיבת המלצות Remediation לפיתוח." }
          },
          cards: [
            { term: "' OR '1'='1", def: "ביטוי קלאסי ב-SQLi שמחזיר אמת (True) ובכך עוקף מנגנון אימות." },
            { term: "Prepared Statements", def: "ההגנה החזקה ביותר נגד SQLi: הפרדת הקוד משאילתת המשתמש על ידי פרמטריזציה." }
          ],
          lab: {
            instruction: "היכנסי ל-PortSwigger Web Security Academy ותרגלי עקיפת אימות בעזרת SQL Injection בסיסי.",
            snippet: "admin' --",
            link: "https://portswigger.net/web-security/sql-injection",
            credit: "באדיבות PortSwigger Web Security Academy"
          },
          interviewQuestions: [
            { q: "כיצד מונעים SQL Injection ברמת קוד?", a: "שימוש ב-Parameterized Queries / Prepared Statements ושימוש ב-ORM מאובטח." }
          ],
          projectIdea: "פיתוח אפליקציה פגיעה מכוונת (Vulnerable App) ב-Node.js/Flask והדגמת תיקון החולשה בקוד (לפני ואחרי) ב-GitHub."
        }
      ]
    },
    {
      id: "grc",
      title: "מנהלת רגולציה וסיכונים (GRC)",
      roleDesc: "החיבור בין עולם הסייבר הטכני לבין עולם הניהול, החוק והעסקים. התפקיד כולל עבודה מול תקנים בינלאומיים (ISO 27001, SOC 2, HIPAA), ניהול סיכוני ספקים, וקביעת מדיניות אבטחה ארגונית.",
      lessons: [
        {
          id: "grc-risk",
          title: "מתודולוגיית ניהול והערכת סיכונים",
          category: "grc_compliance",
          videos: {
            taste: { url: "", desc: "טעימה (2 דקות): מה ההבדל בין איום, חולשה וסיכון בעולם הסייבר?" },
            deep: { url: "", desc: "צלילה לעומק (10 דקות): בניית מטריצת סיכונים (Likelihood vs Impact) וטבלת Risk Register." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): תהליך הכנה מלא למבדק הסמכה ISO 27001 בארגון מורכב." }
          },
          cards: [
            { term: "Risk = Threat × Vulnerability × Impact", def: "נוסחת הערכת הסיכון הקלאסית באבטחת מידע." },
            { term: "Statement of Applicability (SoA)", def: "מסמך יסוד ב-ISO 27001 המגדיר אילו בקרות מיושמות בארגון ומדוע." }
          ],
          lab: {
            instruction: "בני מסמך הערכת סיכונים עבור חברת סטארט-אפ המאחסנת מידע רפואי בענן.",
            snippet: "Asset: Patient DB | Threat: Ransomware | Control: Offline Backups & MFA",
            link: "https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final",
            credit: "מבוסס על מתודולוגיית NIST SP 800-30"
          },
          interviewQuestions: [
            { q: "מהן ארבע הדרכים להתמודד עם סיכון סייבר (Risk Treatment)?", a: "הפחתה (Mitigate), העברה (Transfer - כמו ביטוח), קבלה (Accept), או הימנעות (Avoid)." }
          ],
          projectIdea: "כתיבת מסמך מדיניות אבטחת מידע ארגוני מלא (Information Security Policy) מותאם לחברת SaaS להצגה בפורטפוליו."
        }
      ]
    }
  ]
};

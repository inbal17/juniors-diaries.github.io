// data/courses.js - קובץ נתוני המסלולים והשיעורים
const coursesData = {
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
            taste: {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
              desc: "טעימה (2 דקות): למה צריך 7 שכבות ומה ההבדל בין TCP ל-UDP."
            },
            deep: {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
              desc: "צלילה לעומק (10 דקות): לחיצת יד משולשת, ניתוח כותרות IP ודגלי תקשורת."
            },
            expert: {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              desc: "הופכת למומחית (30 דקות): ניתוח תעבורת רשת אמיתית ואיתור אנומליות ו-DNS Tunneling."
            }
          },
          cards: [
            { term: "TCP Handshake", def: "לחיצת יד משולשת (SYN, SYN-ACK, ACK) המקימה חיבור אמין בין מחשבים." },
            { term: "DNS (Port 53)", def: "פרוטוקול תרגום שמות מתחם (Domains) לכתובות IP." },
            { term: "ARP Poisoning", def: "מתקפת Man-in-the-Middle לזיוף כתובות MAC ברשת המקומית." }
          ],
          lab: {
            instruction: "הורידי קובץ PCAP ונחי בקשות DNS ב-Wireshark כדי לאתר דומיין זדוני.",
            snippet: "wireshark capture.pcap\n# dns.flags.response == 0",
            link: "https://www.wireshark.org",
            credit: "באדיבות Wireshark Sample Captures"
          },
          interviewQuestions: [
            { q: "מה ההבדל בין TCP ל-UDP ומתי נעדיף כל אחד?", a: "TCP אמין ומבטיח הגעה (HTTP). UDP מהיר ללא בדיקת הגעה (סטרימינג, DNS)." }
          ],
          projectIdea: "בניית סקריפט Python בעזרת Scapy שמאזין לתעבורת הרשת ומתריע על שאילתות DNS חשודות."
        },
        {
          id: "os-linux",
          title: "יסודות לינוקס והרשאות קבצים",
          category: "operating_systems",
          videos: {
            taste: { url: "", desc: "טעימה (2 דקות): מבנה מערכת הקבצים בלינוקס ומדוע הכל נחשב קובץ." },
            deep: { url: "", desc: "צלילה לעומק (10 דקות): הרשאות קבצים (chmod, rwx) וניהול תהליכים." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): הרשאות מיוחדות (SUID) והסלמת הרשאות." }
          },
          cards: [
            { term: "chmod 755", def: "הרשאת קריאה, כתיבה והרצה לבעלים (7), וקריאה והרצה בלבד לשאר (5)." },
            { term: "SUID Bit", def: "הרשאה המאפשרת לקובץ לרוץ בהרשאות של הבעלים (כמו root) ולא של המריץ." }
          ],
          lab: {
            instruction: "התחברי ב-SSH למשחק Bandit והשלימי שלבים 0 עד 4 לאיתור סיסמאות מוחבאות.",
            snippet: "ssh bandit0@bandit.labs.overthewire.org -p 2220",
            link: "https://overthewire.org/wargames/bandit/",
            credit: "באדיבות OverTheWire"
          },
          interviewQuestions: [
            { q: "איך תאתרי בלינוקס קבצים עם הרשאת SUID?", a: "find / -perm -4000 -type f 2>/dev/null" }
          ],
          projectIdea: "כתיבת כלי Bash שמבצע בדיקת Hardening בסיסית ומאתר קבצי SUID חריגים."
        }
      ]
    },
    {
      id: "security-research",
      title: "חוקרת אבטחה (Security Research)",
      roleDesc: "העמקה בקרביים של מערכות הפעלה ותוכנות: הנדסה לאחור (Reverse Engineering), ניתוח נוזקות (Malware Analysis), מציאת חולשות Zero-Day ופיתוח Exploits.",
      lessons: [
        {
          id: "reverse-eng",
          title: "מבוא להנדסה לאחור ו-Assembly",
          category: "reverse_engineering",
          videos: {
            taste: { url: "", desc: "טעימה (2 דקות): איך קוד הופך לקובץ בינארי ומה עושה Decompiler?" },
            deep: { url: "", desc: "צלילה לעומק (10 דקות): היכרות עם אוגרים (Registers), ה-Stack ופקודות Assembly בסיסיות ב-x86." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): פתיחת קובץ CrackMe ב-Ghidra, ניתוח זרימת הפונקציות ועקיפת בדיקת סיסמה." }
          },
          cards: [
            { term: "Register (EAX/RAX)", def: "תא זיכרון מהיר בתוך המעבד המשמש לחישובים והחזרת ערכים מפונקציות." },
            { term: "Decompiler", def: "כלי שלוקח שפת מכונה (Assembly) ומתרגם אותה חזרה לקוד קריא דמוי C (למשל Ghidra או IDA)." },
            { term: "Buffer Overflow", def: "חולשת זיכרון בה כתיבה מעבר לגודל המערך דורסת זיכרון סמוך ומאפשרת שינוי זרימת התוכנית." }
          ],
          lab: {
            instruction: "הורידי קובץ בינארי פשוט, פתחי אותו ב-Ghidra ואתרי את התנאי (JNZ/JZ) המאשר את הסיסמה.",
            snippet: "ghidraRun\n# חיפוש מחרוזות: Strings -> 'Password Valid'",
            link: "https://ghidra-sre.org",
            credit: "תרגול מבוסס אתגר Ghidra CrackMe"
          },
          interviewQuestions: [
            { q: "מה ההבדל בין ניתוח סטטי (Static Analysis) לניתוח דינמי (Dynamic Analysis)?", a: "ניתוח סטטי בודק את הקוד/בינארי בלי להריץ אותו. ניתוח דינמי מריץ את התוכנה בסביבה מבודדת (Sandbox) ובודק התנהגות בזמן אמת." },
            { q: "מה קורה ב-Stack בעת קריאה לפונקציה?", a: "הפרמטרים נדחפים, כתובת החזרה (Return Address) נשמרת, ומסגרת הפונקציה (Stack Frame) מוקמת עבור המשתנים המקומיים." }
          ],
          projectIdea: "ניתוח דוגמת נוזקה בלתי מזיקה (כמו EICAR Test File או דוגמת מעבדה) וכתיבת דוח ניתוח טכני עם מדדי IOC וזרימת ביצוע."
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
            deep: { url: "", desc: "צלילה לעומק (10 דקות): אירועי Security Log קריטיים: 4624 מול 4625." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): ניתוח שרשרת תקיפה מלאה בלוגים – מ-Pass-the-Hash ועד PowerShell חבוי." }
          },
          cards: [
            { term: "Event ID 4625", def: "אירוע ב-Windows המעיד על כישלון בהתחברות (Failed Logon)." },
            { term: "Logon Type 10", def: "התחברות מרחוק באמצעות פרוטוקול RDP." }
          ],
          lab: {
            instruction: "נתחי קובץ Evtx של Windows ומצאי את ה-IP שתקף את השרת ב-Brute Force.",
            snippet: "Get-WinEvent -Path ./Sec.evtx | Where-Object {$_.Id -eq 4625}",
            link: "https://tryhackme.com",
            credit: "באדיבות TryHackMe (Windows Event Logs)"
          },
          interviewQuestions: [
            { q: "כיצד תבדילי בין משתמש ששכח סיסמה לבין התקפת Brute Force?", a: "תדירות ניסיונות (עשרות בשנייה), שעות לא שגרתיות וכתובת ה-IP של המקור." }
          ],
          projectIdea: "הקמת סביבת Wazuh או Elastic מקומית במעבדה וירטואלית ותחקור התראת סייבר עם דוח ממצאים."
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
            expert: { url: "", desc: "הופכת למומחית (30 דקות): עקיפת WAF וכתיבת המלצות Remediation לפיתוח." }
          },
          cards: [
            { term: "' OR '1'='1", def: "ביטוי קלאסי ב-SQLi שמחזיר אמת (True) ובכך עוקף אימות." },
            { term: "Prepared Statements", def: "ההגנה המובילה נגד SQLi: הפרדת הקוד משאילתת המשתמש על ידי פרמטריזציה." }
          ],
          lab: {
            instruction: "תרגלי עקיפת אימות בעזרת SQL Injection בסיסי ב-PortSwigger Academy.",
            snippet: "admin' --",
            link: "https://portswigger.net/web-security/sql-injection",
            credit: "באדיבות PortSwigger Web Security Academy"
          },
          interviewQuestions: [
            { q: "כיצד מונעים SQL Injection ברמת קוד?", a: "שימוש ב-Parameterized Queries / Prepared Statements ו-ORM מאובטח." }
          ],
          projectIdea: "פיתוח אפליקציה פגיעה מכוונת ב-Flask/Node.js והדגמת תיקון החולשה בקוד ב-GitHub."
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
            deep: { url: "", desc: "צלילה לעומק (10 דקות): בניית מטריצת סיכונים (Likelihood vs Impact)." },
            expert: { url: "", desc: "הופכת למומחית (30 דקות): תהליך הכנה מלא למבדק הסמכה ISO 27001." }
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
            { q: "מהן ארבע הדרכים להתמודד עם סיכון סייבר?", a: "הפחתה (Mitigate), העברה (Transfer), קבלה (Accept), או הימנעות (Avoid)." }
          ],
          projectIdea: "כתיבת מסמך מדיניות אבטחת מידע ארגוני מלא (Information Security Policy) מותאם לחברת SaaS."
        }
      ]
    }
  ]
};

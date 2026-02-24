
/* =============================================
   STUDY PLANNER — Adaptive Scheduling Engine
   All bugs fixed, production-ready
   ============================================= */
'use strict';

// =============================================
// CONSTANTS & FR DATA
// =============================================
const COLORS = ['#f59e0b','#10b981','#3b82f6','#f43f5e','#8b5cf6','#06b6d4','#ec4899','#84cc16'];
const STORAGE_KEY = 'studyPlanner_v3';

const FR_LECTURES_RAW = [
  {n:'01', name:'Intro to IND AS',                   dur:'02:03:00'},
  {n:'02', name:'Part 1 - Sch 3 & IND AS 16',        dur:'02:00:00'},
  {n:'02', name:'Part 2 - IND AS 16',                 dur:'01:54:00'},
  {n:'03', name:'Part 1 - IND AS 16',                 dur:'01:32:00'},
  {n:'03', name:'Part 2 - IND AS 16',                 dur:'01:54:00'},
  {n:'04', name:'Part 1 - IND AS 16',                 dur:'01:50:00'},
  {n:'04', name:'Part 2 - IND AS 38',                 dur:'02:11:00'},
  {n:'05', name:'Part 1 - IND AS 38',                 dur:'01:34:00'},
  {n:'05', name:'Part 2 - IND AS 38',                 dur:'00:36:00'},
  {n:'06', name:'Part 1 - IND AS 40',                 dur:'00:58:00'},
  {n:'06', name:'Part 2 - IND AS 40',                 dur:'01:25:00'},
  {n:'07', name:'Part 1 - IND AS 36',                 dur:'01:29:00'},
  {n:'07', name:'Part 2 - IND AS 36',                 dur:'01:59:00'},
  {n:'08', name:'Part 1 - IND AS 36',                 dur:'02:08:00'},
  {n:'08', name:'Part 2 - IND AS 36',                 dur:'01:11:00'},
  {n:'09', name:'Part 1 - Ind AS 105',                dur:'00:54:00'},
  {n:'09', name:'Part 2 - Ind AS 105',                dur:'01:37:00'},
  {n:'09', name:'Part 3 - Ind AS 105',                dur:'00:27:00'},
  {n:'10', name:'Part 1 - IND AS 41',                 dur:'01:54:00'},
  {n:'10', name:'Part 2 - IND AS 41',                 dur:'00:44:00'},
  {n:'10', name:'Part 3 - IND AS 41',                 dur:'00:05:00'},
  {n:'11', name:'Part 1 - IND AS 2',                  dur:'01:12:00'},
  {n:'11', name:'Part 2 - IND AS 2',                  dur:'00:56:00'},
  {n:'11', name:'Part 3 - IND AS 2',                  dur:'00:25:00'},
  {n:'12', name:'Part 1 - Financial Instruments',     dur:'02:01:00'},
  {n:'12', name:'Part 2 - Financial Instruments',     dur:'02:03:00'},
  {n:'13', name:'Part 1 - Financial Instruments',     dur:'01:44:00'},
  {n:'13', name:'Part 2 - Financial Instruments',     dur:'01:27:00'},
  {n:'14', name:'Part 1 - Financial Instruments',     dur:'01:50:00'},
  {n:'14', name:'Part 2 - Financial Instruments',     dur:'01:59:00'},
  {n:'15', name:'Part 1 - Financial Instruments',     dur:'01:16:00'},
  {n:'15', name:'Part 2 - Financial Instruments',     dur:'01:14:00'},
  {n:'16', name:'Part 1 - Financial Instruments',     dur:'00:38:00'},
  {n:'16', name:'Part 2 - Financial Instruments',     dur:'02:28:00'},
  {n:'17', name:'Part 1 - Financial Instruments',     dur:'02:13:00'},
  {n:'17', name:'Part 2 - Financial Instruments',     dur:'01:38:00'},
  {n:'18', name:'Part 1 - Financial Instruments',     dur:'01:35:00'},
  {n:'18', name:'Part 2 - Financial Instruments',     dur:'01:59:00'},
  {n:'19', name:'Financial Instruments',              dur:'02:33:00'},
  {n:'20', name:'Ind AS 20 - Govt Grants',            dur:'02:10:00'},
  {n:'21', name:'Part 1 - Ind AS 12',                 dur:'01:58:00'},
  {n:'21', name:'Part 2 - Ind AS 12',                 dur:'02:04:00'},
  {n:'22', name:'Ind AS 12',                          dur:'02:15:00'},
  {n:'23', name:'Part 1 - Ind AS 12',                 dur:'02:23:00'},
  {n:'23', name:'Part 2 - Ind AS 12',                 dur:'00:16:00'},
  {n:'23', name:'Part 3 - Ind 12 Vs AS 22',           dur:'00:13:00'},
  {n:'24', name:'Part 1 - Ind AS 1',                  dur:'01:05:00'},
  {n:'24', name:'Part 2 - Ind AS 1',                  dur:'01:00:00'},
  {n:'25', name:'Part 1 - Ind AS 10',                 dur:'02:15:00'},
  {n:'25', name:'Part 2 - Ind AS 10',                 dur:'00:09:00'},
  {n:'26', name:'Part 1 - Ind AS 8',                  dur:'01:14:00'},
  {n:'26', name:'Part 2 - Ind AS 8',                  dur:'00:43:00'},
  {n:'27', name:'Part 1 - Ind AS 37',                 dur:'02:17:00'},
  {n:'27', name:'Part 2 - Ind AS 37',                 dur:'00:03:00'},
  {n:'28', name:'Part 1 - IND AS 23',                 dur:'01:21:00'},
  {n:'28', name:'Part 2 - IND AS 23',                 dur:'01:40:00'},
  {n:'29', name:'Part 1 - IND AS 23',                 dur:'01:41:00'},
  {n:'29', name:'Part 2 - Ind AS 19',                 dur:'02:32:00'},
  {n:'30', name:'Part 1 - Ind AS 19',                 dur:'02:00:00'},
  {n:'30', name:'Part 2 - Ind AS 19',                 dur:'00:34:00'},
  {n:'31', name:'Part 1 - IND AS 108',                dur:'02:04:00'},
  {n:'31', name:'Part 2 - IND AS 34',                 dur:'01:16:00'},
  {n:'31', name:'Part 3 - IND AS 34',                 dur:'00:05:00'},
  {n:'32', name:'Ind AS 116 - Leases',                dur:'02:32:00'},
  {n:'33', name:'Ind AS 116 - Leases',                dur:'02:01:00'},
  {n:'34', name:'Ind AS 116 - Leases',                dur:'02:41:00'},
  {n:'35', name:'Part 1 - Ind AS 116',                dur:'02:13:00'},
  {n:'35', name:'Part 2 - Ind AS 116',                dur:'00:48:00'},
  {n:'35', name:'Part 3 - Ind AS 116 Vs AS 19',       dur:'00:11:00'},
  {n:'36', name:'IND AS 102 - Share Based Payment',   dur:'02:33:00'},
  {n:'37', name:'Part 1 - IND AS 102',                dur:'02:27:00'},
  {n:'37', name:'Part 2 - IND AS 102',                dur:'00:21:00'},
  {n:'37', name:'Part 3 - IND AS 102',                dur:'00:31:00'},
  {n:'38', name:'Part 1 - IND AS 103',                dur:'01:48:00'},
  {n:'38', name:'Part 2 - IND AS 103',                dur:'02:01:00'},
  {n:'39', name:'Part 1 - IND AS 103',                dur:'01:26:00'},
  {n:'40', name:'Part 1 - IND AS 103',                dur:'02:11:00'},
  {n:'40', name:'Part 2 - IND AS 103',                dur:'01:41:00'},
  {n:'41', name:'Part 1 - IND AS 103',                dur:'01:46:00'},
  {n:'41', name:'Part 2 - IND AS 103',                dur:'01:30:00'},
  {n:'42', name:'Part 1 - IND AS 103',                dur:'01:30:00'},
  {n:'42', name:'Part 2 - IND AS 103',                dur:'01:44:00'},
  {n:'43', name:'Part 1 - IND AS 27 & 110',           dur:'01:41:00'},
  {n:'43', name:'Part 2 - IND AS 110',                dur:'01:41:00'},
  {n:'44', name:'Part 1 - IND AS 110',                dur:'01:34:00'},
  {n:'44', name:'Part 2 - IND AS 110',                dur:'02:10:00'},
  {n:'45', name:'Part 1 - IND AS 110',                dur:'02:15:00'},
  {n:'45', name:'Part 2 - IND AS 110',                dur:'01:19:00'},
  {n:'46', name:'Part 1 - IND AS 110',                dur:'01:32:00'},
  {n:'46', name:'Part 2 - IND AS 110',                dur:'01:11:00'},
  {n:'47', name:'Part 1 - IND AS 110',                dur:'01:51:00'},
  {n:'47', name:'Part 2 - IND AS 110',                dur:'01:12:00'},
  {n:'48', name:'Part 1 - IND AS 110',                dur:'02:41:00'},
  {n:'49', name:'Part 1 - IND AS 111',                dur:'02:38:00'},
  {n:'49', name:'Part 2 - IND AS 111',                dur:'00:46:00'},
  {n:'50', name:'Part 1 - IND AS 28',                 dur:'01:08:00'},
  {n:'50', name:'Part 2 - IND AS 28',                 dur:'02:03:00'},
  {n:'51', name:'IND AS 28',                          dur:'02:44:00'},
  {n:'52', name:'Part 1 - IND AS 24',                 dur:'02:08:00'},
  {n:'52', name:'Part 2 - IND AS 113',                dur:'01:45:00'},
  {n:'53', name:'Part 1 - IND AS 7',                  dur:'02:07:00'},
  {n:'53', name:'Part 2 - IND AS 7',                  dur:'02:07:00'},
  {n:'54', name:'Part 1 - IND AS 7',                  dur:'02:33:00'},
  {n:'54', name:'Part 2 - IND AS 21',                 dur:'02:19:00'},
  {n:'55', name:'Part 1 - IND AS 21',                 dur:'01:45:00'},
  {n:'55', name:'Part 2 - IND AS 21',                 dur:'01:41:00'},
  {n:'56', name:'Part 1 - Ind AS 33',                 dur:'01:35:00'},
  {n:'56', name:'Part 2 - Ind AS 33',                 dur:'02:25:00'},
  {n:'57', name:'Part 1 - Ind AS 33',                 dur:'02:26:00'},
  {n:'57', name:'Part 2 - Ind AS 33',                 dur:'00:17:00'},
  {n:'58', name:'Part 1 - Ind AS 115',                dur:'02:32:00'},
  {n:'58', name:'Part 2 - Ind AS 115',                dur:'02:53:00'},
  {n:'59', name:'Part 1 - Ind AS 115',                dur:'02:55:00'},
  {n:'59', name:'Part 2 - Ind AS 115',                dur:'02:05:00'},
  {n:'60', name:'Part 1 - Ind AS 115',                dur:'02:23:00'},
  {n:'60', name:'Part 2 - Ind AS 115',                dur:'00:10:00'},
];

// =============================================
// TIME UTILITIES  (all local-timezone)
// =============================================
const Time = {
  toSeconds(str) {
    if (!str) return 0;
    const parts = String(str).trim().split(':').map(Number);
    if (parts.some(isNaN)) return 0;
    if (parts.length === 3) return parts[0]*3600 + parts[1]*60 + parts[2];
    if (parts.length === 2) return parts[0]*3600 + parts[1]*60;
    return 0;
  },
  toHMS(s) {
    s = Math.max(0, Math.floor(Number(s) || 0));
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  },
  toDisplay(s) {
    s = Math.max(0, Math.floor(Number(s) || 0));
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60);
    if (!h && !m) return '0m';
    if (!h) return `${m}m`;
    if (!m) return `${h}h`;
    return `${h}h ${m}m`;
  },
  // Local date (not UTC — critical for India UTC+5:30)
  today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },
  addDays(dateStr, days) {
    const [y,m,d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m-1, d+days);
    return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  },
  diffDays(a, b) {
    const [ay,am,ad] = a.split('-').map(Number);
    const [by,bm,bd] = b.split('-').map(Number);
    return Math.round((new Date(by,bm-1,bd) - new Date(ay,am-1,ad)) / 86400000);
  },
  // Local day-of-week (not UTC)
  dayOfWeek(dateStr) {
    const [y,m,d] = dateStr.split('-').map(Number);
    return new Date(y, m-1, d).getDay();
  },
  formatDate(dateStr) {
    if (!dateStr) return '—';
    const [y,m,d] = dateStr.split('-').map(Number);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${String(d).padStart(2,'0')} ${months[m-1]} ${y}`;
  },
  dayName(dateStr) {
    return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][this.dayOfWeek(dateStr)];
  }
};

// =============================================
// STORAGE
// =============================================
const Store = {
  data: null,
  load() {
    try { this.data = JSON.parse(localStorage.getItem(STORAGE_KEY)); }
    catch(e) { this.data = null; }
    return this.data;
  },
  save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); }
    catch(e) { console.error('Save failed:', e); }
  },
  init() {
    const today = Time.today();
    const subId = 'sub_fr';
    this.data = {
      settings: { startDate: today, dailyStudyHours: 6, bufferDayOfWeek: 0 },
      subjects: [{
        id: subId, name: 'FR', fullName: 'Financial Reporting (CA Final)',
        deadline: Time.addDays(today, 120), examDate: '',
        dailyHours: 6, priority: 1, color: COLORS[0], createdAt: today
      }],
      lectures: FR_LECTURES_RAW.map((l, i) => ({
        id: `lec_${i+1}`, subjectId: subId, sequence: i+1,
        lectureNum: l.n, name: l.name,
        duration: Time.toSeconds(l.dur),
        remaining: Time.toSeconds(l.dur),
        status: 'pending',        // pending | partial | complete
        completedOn: null,
        todayStudied: 0,          // seconds studied today (resets each day)
        todayDate: null,          // date of last study session for this lecture
      })),
      schedule: {},
      notes: {},   // { lectureId: [ { id, text, type, createdAt } ] }
      meta: { initialized: true, version: 4 }
    };
    this.save();
  }
};

// =============================================
// SCHEDULING ENGINE
// =============================================
const Scheduler = {
  TOLERANCE: 0.80,

  /**
   * buildSchedule(forceRebuildToday)
   *
   * forceRebuildToday=false (default):
   *   Preserve today's entries as-is (used after completing a session —
   *   we don't want to wipe done/partial_done marks).
   *
   * forceRebuildToday=true:
   *   Wipe today's scheduled entries and rebuild them using the current
   *   settings (hours, buffer day). Then re-apply any done/partial_done
   *   marks from lecture.todayStudied — so work already logged today is
   *   never lost. Used when the user changes daily hours, buffer day, etc.
   */
  buildSchedule(forceRebuildToday = false) {
    const { settings, subjects, lectures } = Store.data;
    const today = Time.today();
    const todayHasEntries = (Store.data.schedule[today] || []).length > 0;

    // Preserve past days always.
    // Preserve today only when NOT forcing a rebuild.
    const preserved = {};
    Object.entries(Store.data.schedule).forEach(([date, entries]) => {
      if (date < today) preserved[date] = entries;
    });
    if (todayHasEntries && !forceRebuildToday) preserved[today] = Store.data.schedule[today];

    const newSchedule = { ...preserved };

    // Build queues from all incomplete lectures
    const queues = this._buildQueues(lectures, subjects);
    const capMap  = this._calcCapacity(subjects, settings.dailyStudyHours);

    // Start from today if: first run ever, OR we're force-rebuilding today.
    // Otherwise start from tomorrow (normal session-complete rebuild).
    let date  = (todayHasEntries && !forceRebuildToday) ? Time.addDays(today, 1) : today;
    const max = Time.addDays(today, 730);
    let safety = 0;

    while (date <= max && safety < 800) {
      safety++;

      if (settings.bufferDayOfWeek !== -1 && Time.dayOfWeek(date) === settings.bufferDayOfWeek) {
        date = Time.addDays(date, 1);
        continue;
      }

      if (!subjects.some(s => queues[s.id]?.length > 0)) break;

      const dayEntries = [];

      subjects
        .slice()
        .sort((a, b) => (a.priority||99) - (b.priority||99))
        .forEach(subj => {
          const queue = queues[subj.id];
          if (!queue?.length) return;

          let cap = Math.round((capMap[subj.id] || 0) * 3600);

          while (cap > 0 && queue.length > 0) {
            const item = queue[0];
            if (item.remaining <= 0) { queue.shift(); continue; }

            const tol = Math.floor(item.remaining * this.TOLERANCE);

            if (cap >= item.remaining) {
              dayEntries.push({
                lectureId: item.id, subjectId: subj.id,
                plannedSeconds: item.remaining, status: 'scheduled',
                isContinuation: item.isContinuation,
              });
              cap -= item.remaining;
              queue.shift();
            } else if (cap >= tol) {
              // ≥80% capacity → absorb full lecture (no tiny leftover)
              dayEntries.push({
                lectureId: item.id, subjectId: subj.id,
                plannedSeconds: item.remaining, status: 'scheduled',
                isContinuation: item.isContinuation,
              });
              cap = 0;
              queue.shift();
            } else {
              // Split
              dayEntries.push({
                lectureId: item.id, subjectId: subj.id,
                plannedSeconds: cap, status: 'scheduled',
                isContinuation: item.isContinuation,
              });
              item.remaining -= cap;
              // From here on this lecture is a "continuation" in subsequent days
              item.isContinuation = true;
              cap = 0;
            }
          }
        });

      if (dayEntries.length > 0) newSchedule[date] = dayEntries;
      date = Time.addDays(date, 1);
    }

    // When force-rebuilding today, restore any done/partial_done marks from
    // lecture data so work already logged today is not lost from the UI.
    if (forceRebuildToday) {
      if (!newSchedule[today]) newSchedule[today] = [];

      // Pass 1: update existing entries that were studied today
      newSchedule[today].forEach(entry => {
        const lec = lectures.find(l => l.id === entry.lectureId);
        if (!lec || lec.todayDate !== today || !lec.todayStudied) return;
        entry.completedSeconds = lec.todayStudied;
        entry.status = lec.status === 'complete' ? 'done' : 'partial_done';
      });

      // Pass 2: inject entries for lectures studied today that are MISSING from the
      // rebuilt schedule. This happens for complete lectures — they are excluded from
      // the queue so the scheduler never emits an entry for them, but they still need
      // to show as "Done" in Today's Plan.
      lectures.forEach(lec => {
        if (lec.todayDate !== today || !lec.todayStudied) return;
        if (newSchedule[today].some(e => e.lectureId === lec.id)) return; // already present
        newSchedule[today].unshift({
          lectureId: lec.id,
          subjectId: lec.subjectId,
          plannedSeconds: lec.todayStudied,
          completedSeconds: lec.todayStudied,
          status: lec.status === 'complete' ? 'done' : 'partial_done',
          isContinuation: false,
        });
      });
    }

    Store.data.schedule = newSchedule;
  },

  _buildQueues(lectures, subjects) {
    const bySubject = {};
    subjects.forEach(s => { bySubject[s.id] = []; });
    lectures.forEach(l => { if (bySubject[l.subjectId]) bySubject[l.subjectId].push(l); });

    const queues = {};
    Object.keys(bySubject).forEach(subId => {
      const sorted = bySubject[subId].slice().sort((a, b) => a.sequence - b.sequence);
      const queue  = [];
      for (const lec of sorted) {
        if (lec.status === 'complete') continue;
        // isContinuation = lecture was already partially done before being queued
        queue.push({ id: lec.id, remaining: lec.remaining, isContinuation: lec.status === 'partial' });
      }
      queues[subId] = queue;
    });
    return queues;
  },

  _calcCapacity(subjects, totalHours) {
    const cap = {};
    if (!subjects.length) return cap;
    // Both single and multi-subject: use each subject's own dailyHours setting.
    // Fall back to global totalHours for a subject only if dailyHours is not set.
    // This means: FR=2.5h, global=8h → FR gets 2.5h/day, NOT 8h.
    subjects.forEach(sub => { cap[sub.id] = sub.dailyHours || totalHours; });
    return cap;
  },

  getTodayPlan() {
    const today = Time.today();
    return (Store.data.schedule[today] || []).map(entry => {
      const lec  = Store.data.lectures.find(l => l.id === entry.lectureId);
      const subj = Store.data.subjects.find(s => s.id === entry.subjectId);
      return (lec && subj) ? { ...entry, lecture: lec, subject: subj } : null;
    }).filter(Boolean);
  },

  /**
   * Complete today's planned session for a lecture.
   * Marks exactly the planned portion as done — not the whole lecture.
   */
  completeSession(lectureId) {
    const today = Time.today();
    const entry = (Store.data.schedule[today] || []).find(e => e.lectureId === lectureId);
    const lec   = Store.data.lectures.find(l => l.id === lectureId);
    if (!lec || entry?.status === 'done') return;

    const planned = entry ? entry.plannedSeconds : lec.remaining;
    const done    = Math.min(planned, lec.remaining);

    lec.remaining  = Math.max(0, lec.remaining - done);
    lec.status     = lec.remaining === 0 ? 'complete' : 'partial';
    if (lec.status === 'complete') lec.completedOn = today;

    // Track today's studied time — ACCUMULATE (not replace) because the user
    // may have already logged a partial session today before clicking Done.
    // e.g. partial 1h then Done (remaining 1h) → todayStudied should be 2h total.
    if (lec.todayDate === today) {
      lec.todayStudied += done;          // ADD to existing partial
    } else {
      lec.todayDate    = today;
      lec.todayStudied = done;
    }

    if (entry) {
      entry.completedSeconds = (entry.completedSeconds || 0) + done;
      entry.status = lec.status === 'complete' ? 'done' : 'partial_done';
    }

    this.buildSchedule();
    Store.save();
  },

  /**
   * FIX (Bug 2): Partial entry uses "replace" semantics, not "add".
   * If user already logged 1h today and now logs 2h, the total becomes 2h (not 3h).
   * We restore previous today's progress, then apply the new amount.
   */
  partialComplete(lectureId, completedSeconds) {
    const today = Time.today();
    const lec   = Store.data.lectures.find(l => l.id === lectureId);
    const entry = (Store.data.schedule[today] || []).find(e => e.lectureId === lectureId);
    if (!lec || entry?.status === 'done') return false; // return false = caller can detect no-op

    // Restore previous partial for today (replace, not add)
    const prevDone = (lec.todayDate === today) ? lec.todayStudied : 0;
    lec.remaining  = Math.min(lec.duration, lec.remaining + prevDone);

    // Apply new amount
    const done    = Math.min(completedSeconds, lec.remaining);
    lec.remaining = Math.max(0, lec.remaining - done);
    lec.status    = lec.remaining === 0 ? 'complete' : 'partial';
    if (lec.status === 'complete') lec.completedOn = today;

    this._trackStudied(lec, today, done);

    if (entry) {
      entry.completedSeconds = done;
      entry.status = lec.status === 'complete' ? 'done' : 'partial_done';
    }

    this.buildSchedule();
    Store.save();
    return true;
  },

  // Track how much was studied today on a lecture (used for replace-semantics partial)
  _trackStudied(lec, today, done) {
    if (lec.todayDate === today) {
      lec.todayStudied = done; // replace (not accumulate)
    } else {
      lec.todayDate    = today;
      lec.todayStudied = done;
    }
  },

  getStats() {
    const today = Time.today();
    const { lectures, subjects, settings, schedule } = Store.data;

    const totalSecs     = lectures.reduce((s, l) => s + l.duration, 0);
    const completedSecs = lectures.reduce((s, l) => s + (l.duration - l.remaining), 0);
    const pendingSecs   = lectures.reduce((s, l) => s + l.remaining, 0);

    // Backlog = incomplete lectures that were already scheduled in a past day
    const pastIds = new Set();
    Object.entries(schedule).forEach(([d, es]) => {
      if (d < today) es.forEach(e => pastIds.add(e.lectureId));
    });
    const backlogSecs = lectures
      .filter(l => pastIds.has(l.id) && l.status !== 'complete')
      .reduce((s, l) => s + l.remaining, 0);

    // Nearest deadline — include OVERDUE ones (deadline < today) so we can warn
    const allDeadlines = subjects.filter(s => s.deadline).map(s => s.deadline).sort();
    const firstDeadline = allDeadlines[0] || null;
    const isOverdue     = firstDeadline ? firstDeadline < today : false;
    const calDaysLeft   = firstDeadline ? Time.diffDays(today, firstDeadline) : 0;
    // calDaysLeft is negative when overdue; clamp for study-days loop

    // FIX (Bug 5): Include today in the study days count
    let studyDaysLeft = 0;
    if (firstDeadline && calDaysLeft >= 0) {
      // Start from i=0 so today is included; cap at actual days remaining
      for (let i = 0; i <= calDaysLeft; i++) {
        if ((settings.bufferDayOfWeek === -1 || Time.dayOfWeek(Time.addDays(today, i)) !== settings.bufferDayOfWeek)) studyDaysLeft++;
      }
    }
    const requiredDailySecs = studyDaysLeft > 0 ? Math.ceil(pendingSecs / studyDaysLeft) : 0;
    const onTrack = requiredDailySecs <= settings.dailyStudyHours * 3600;

    // Estimated completion date
    const futureDates  = Object.keys(schedule).filter(d => d >= today).sort();
    const completionDate = futureDates.length ? futureDates[futureDates.length - 1] : null;

    // Per-subject stats (including per-subject need/day calculation)
    const subjectStats = subjects.map(sub => {
      const lecs = lectures.filter(l => l.subjectId === sub.id);
      const total = lecs.reduce((s, l) => s + l.duration, 0);
      const done  = lecs.reduce((s, l) => s + (l.duration - l.remaining), 0);
      const subPending = total - done;
      // FIX (Bug 4): Distinguish "in progress" from "next to start"
      const inProgress = lecs.find(l => l.status === 'partial') || null;
      const nextUp     = lecs.find(l => l.status === 'pending') || null;

      // Per-subject: hours/day needed to finish by this subject's deadline
      let subRequiredDailySecs = 0;
      let subStudyDaysLeft = 0;
      if (sub.deadline && sub.deadline >= today && subPending > 0) {
        const subCalDays = Time.diffDays(today, sub.deadline);
        for (let i = 0; i <= subCalDays; i++) {
          if ((settings.bufferDayOfWeek === -1 || Time.dayOfWeek(Time.addDays(today, i)) !== settings.bufferDayOfWeek)) subStudyDaysLeft++;
        }
        subRequiredDailySecs = subStudyDaysLeft > 0 ? Math.ceil(subPending / subStudyDaysLeft) : 0;
      }

      // Estimated finish date for this subject from the schedule
      const subFutureDates = Object.keys(schedule)
        .filter(d => d >= today && (schedule[d] || []).some(e => e.subjectId === sub.id))
        .sort();
      const subCompletionDate = subFutureDates.length ? subFutureDates[subFutureDates.length - 1] : null;

      return {
        ...sub, total, done, pending: subPending,
        pct: total > 0 ? Math.round((done / total) * 100) : 0,
        completedCount: lecs.filter(l => l.status === 'complete').length,
        totalCount: lecs.length,
        inProgress, nextUp,
        subRequiredDailySecs, subStudyDaysLeft, subCompletionDate,
        subOnTrack: subRequiredDailySecs > 0 && subRequiredDailySecs <= (sub.dailyHours || 0) * 3600,
      };
    });

    // Today's aggregate
    const todayEntries    = schedule[today] || [];
    const todayDone       = todayEntries.filter(e => e.status === 'done' || e.status === 'partial_done').length;
    const todayStudiedSecs= todayEntries.reduce((s, e) => s + (e.completedSeconds || 0), 0);

    return {
      totalSecs, completedSecs, pendingSecs, backlogSecs,
      requiredDailySecs, studyDaysLeft, calDaysLeft, firstDeadline, isOverdue,
      completionDate, onTrack,
      pct: totalSecs > 0 ? Math.round((completedSecs / totalSecs) * 100) : 0,
      subjectStats,
      todayDone, todayTotal: todayEntries.length, todayStudiedSecs,
    };
  },

  getWeeklyStats() {
    const today = Time.today();
    const { schedule, lectures, subjects, settings } = Store.data;

    // Build last-7-days array (index 0 = 6 days ago, index 6 = today)
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date   = Time.addDays(today, -i);
      const isFuture = date > today;
      const isBuffer = settings.bufferDayOfWeek !== -1 && Time.dayOfWeek(date) === settings.bufferDayOfWeek;
      const entries  = schedule[date] || [];

      const plannedSecs  = entries.reduce((s, e) => s + e.plannedSeconds, 0);
      const studiedSecs  = entries.reduce((s, e) => s + (e.completedSeconds || 0), 0);
      const doneCount    = entries.filter(e => e.status === 'done').length;
      const partialCount = entries.filter(e => e.status === 'partial_done').length;
      const missedCount  = !isFuture && date !== today
        ? entries.filter(e => e.status === 'scheduled').length : 0;

      days.push({
        date, dayName: Time.dayName(date), formatted: Time.formatDate(date),
        plannedSecs, studiedSecs, doneCount, partialCount, missedCount,
        totalCount: entries.length, isBuffer, isFuture,
        pct: plannedSecs > 0 ? Math.min(100, Math.round((studiedSecs / plannedSecs) * 100)) : 0,
      });
    }

    // Streak: consecutive non-buffer days with study activity, going backwards
    let streak = 0;
    const todayEntries2 = schedule[today] || [];
    const studiedToday  = todayEntries2.some(e => e.status === 'done' || e.status === 'partial_done');
    const startOffset   = studiedToday ? 0 : 1; // include today if already studied
    for (let i = startOffset; i <= 365; i++) {
      const d = Time.addDays(today, -i);
      if (settings.bufferDayOfWeek !== -1 && Time.dayOfWeek(d) === settings.bufferDayOfWeek) continue;
      const es = schedule[d] || [];
      if (es.some(e => e.status === 'done' || e.status === 'partial_done')) streak++;
      else break;
    }

    // Aggregate week totals
    const weekStudiedSecs = days.reduce((s, d) => s + d.studiedSecs, 0);
    const weekPlannedSecs = days.reduce((s, d) => s + d.plannedSecs, 0);
    const weekDone        = days.reduce((s, d) => s + d.doneCount, 0);
    const weekMissed      = days.reduce((s, d) => s + d.missedCount, 0);
    const completionRate  = weekPlannedSecs > 0
      ? Math.round((weekStudiedSecs / weekPlannedSecs) * 100) : 0;

    // Per-subject breakdown for the week
    const subjectWeekly = subjects.map(sub => {
      let weekStudied = 0, weekLecsDone = 0;
      days.forEach(d => {
        const entries = schedule[d.date] || [];
        entries.forEach(e => {
          if (e.subjectId !== sub.id) return;
          weekStudied  += (e.completedSeconds || 0);
          if (e.status === 'done') weekLecsDone++;
        });
      });
      return { ...sub, weekStudied, weekLecsDone };
    });

    // Best day this week (most studied)
    const studyDays = days.filter(d => !d.isBuffer && d.studiedSecs > 0);
    const bestDay   = studyDays.length
      ? studyDays.reduce((a, b) => b.studiedSecs > a.studiedSecs ? b : a)
      : null;

    return {
      days, streak, weekStudiedSecs, weekPlannedSecs,
      weekDone, weekMissed, completionRate, subjectWeekly, bestDay,
    };
  }
};

// =============================================
// PDF IMPORT ENGINE
// =============================================
const PDFImport = {
  _loaded: false,

  /** Lazy-load PDF.js from CDN the first time it's needed */
  loadLib() {
    if (this._loaded && window.pdfjsLib) return Promise.resolve(true);
    return new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      s.onload  = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        this._loaded = true;
        resolve(true);
      };
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  },

  /** Extract raw text from a PDF File object */
  async extractText(file) {
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    let out = '';
    for (let p = 1; p <= pdf.numPages; p++) {
      const page    = await pdf.getPage(p);
      const content = await page.getTextContent();
      // Group items by approximate Y position so rows stay together
      const byY = {};
      content.items.forEach(it => {
        const y = Math.round(it.transform[5]);
        byY[y] = (byY[y] || '') + it.str + ' ';
      });
      Object.keys(byY).sort((a,b) => b-a).forEach(y => { out += byY[y].trim() + '\n'; });
    }
    return out;
  },

  /** Parse raw text into [{num, name, durSecs, durStr, selected}] */
  parse(text) {
    const lines = text.split('\n')
      .map(l => l.replace(/\s+/g, ' ').trim())
      .filter(l => l.length >= 5);

    const results = [];
    const seen    = new Set();

    // Duration patterns (matched at end of string)
    const durPat = [
      /(\d{1,3}:\d{2}(?::\d{2})?)$/,          // HH:MM or HH:MM:SS
      /(\d{1,3}h\s*\d{0,2}m?)$/i,              // 2h 30m
      /(\d{1,3})\s*hrs?\b/i,                   // 2 hr
      /(\d{1,3}):\d{2}\s*(?:hrs?|min|m)?\s*$/i, // loose time
    ];

    const toSecs = raw => {
      raw = raw.trim();
      if (/^\d{1,3}:\d{2}(:\d{2})?$/.test(raw)) {
        const p = raw.split(':').map(Number);
        return p.length === 3 ? p[0]*3600+p[1]*60+p[2] : p[0]*3600+p[1]*60;
      }
      const hm = raw.match(/(\d+)h\s*(\d*)/i);
      if (hm) return parseInt(hm[1])*3600 + (parseInt(hm[2]||'0')||0)*60;
      const hr = raw.match(/(\d+)\s*hrs?/i);
      if (hr) return parseInt(hr[1])*3600;
      return 0;
    };

    for (const line of lines) {
      // Skip obvious header / footer lines
      if (/^(no\.?|sl\.?|sr\.?|lec|session|topic|duration|subject|page|total|s\.no)/i.test(line)) continue;

      let durSecs = 0, durRaw = '', rest = line;

      // Try to pluck duration from end of line
      for (const pat of durPat) {
        const m = rest.match(pat);
        if (m) { durRaw = m[1] || m[0]; durSecs = toSecs(durRaw); rest = rest.slice(0, rest.lastIndexOf(durRaw)).trim(); break; }
      }

      if (durSecs < 60) continue; // skip lines with no valid duration

      // Try to pluck lecture number from start
      const numM = rest.match(/^(\d{1,3})[.\s)]+/);
      let num = '', name = rest;
      if (numM) { num = numM[1]; name = rest.slice(numM[0].length).trim(); }

      // Clean name
      name = name.replace(/^[-–—|:.\s]+|[-–—|:.\s]+$/g, '').trim();
      if (name.length < 3 || /^\d+$/.test(name)) continue;

      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      results.push({ num: num || String(results.length+1), name, durSecs,
                     durStr: Time.toHMS(durSecs), selected: true });
    }

    return results;
  },
};

// =============================================
// MODAL
// =============================================
const Modal = {
  _overlayFn: null,
  show(html, onConfirm) {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    content.innerHTML = html;
    overlay.classList.add('active');

    if (this._overlayFn) overlay.removeEventListener('click', this._overlayFn);
    this._overlayFn = e => { if (e.target === overlay) this.close(); };
    overlay.addEventListener('click', this._overlayFn);

    content.querySelector('.btn-cancel')?.addEventListener('click', () => this.close());
    const confirmBtn = content.querySelector('.btn-confirm');
    if (confirmBtn && onConfirm) {
      confirmBtn.addEventListener('click', () => {
        if (onConfirm() !== false) this.close();
      });
    }
  },
  close() {
    const mc = document.getElementById('modal-content');
    if (mc) mc.classList.remove('modal-wide');
    document.getElementById('modal-overlay').classList.remove('active');
  }
};

// =============================================
// TOAST
// =============================================
const Toast = {
  _t: null,
  show(msg, type = 'success') {
    clearTimeout(this._t);
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `toast toast-${type} show`;
    this._t = setTimeout(() => el.classList.remove('show'), 3200);
  }
};

// =============================================
// UI / NAVIGATION
// =============================================
const UI = {
  page: 'dashboard',
  navigate(page) {
    this.page = page;
    document.querySelectorAll('.nav-item').forEach(el =>
      el.classList.toggle('active', el.dataset.page === page));
    document.querySelectorAll('.page').forEach(el => {
      if (el.id === `page-${page}`) el.classList.add('active');
      else el.classList.remove('active');
    });
    // Reset scroll to top so every page starts fresh
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'instant' });
    this._isNavigating = true;
    this.render();
    this._isNavigating = false;
  },
  render() {
    const pageEl = document.getElementById(`page-${this.page}`);
    if (this._isNavigating && pageEl) pageEl.classList.add('page-entering');
    ({ dashboard: Pages.dashboard, today: Pages.today, subjects: Pages.subjects,
       lectures: Pages.lectures, analytics: Pages.analytics, settings: Pages.settings,
       notes: Pages.notes }[this.page] || (() => {})).call(Pages);
    if (this._isNavigating) {
      this.animateProgressBars();
      if (pageEl) setTimeout(() => pageEl.classList.remove('page-entering'), 450);
    }
  },
  /**
   * Animate progress bars from 0 → actual width so the fill transition runs
   * visibly every time a page renders. Works because innerHTML= creates fresh
   * DOM nodes, so we can reset width before the browser paints.
   */
  animateProgressBars() {
    requestAnimationFrame(() => {
      // Animate both standard progress fills and weekly review studied bars
      const bars = document.querySelectorAll('.progress-bar-fill, .wr-bar-studied, .wr-bar-planned');
      bars.forEach(bar => {
        const target = bar.style.width;
        bar.style.transition = 'none';
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          bar.style.transition = '';
          bar.style.width = target;
        });
      });
    });
  },
  progressBar(pct, color) {
    return `<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${Math.min(100,Math.max(0,pct))}%;background:${color||'var(--primary)'}"></div></div>`;
  },
  badge(text, type) { return `<span class="badge badge-${type}">${text}</span>`; }
};

// =============================================
// PAGE RENDERERS
// =============================================
const Pages = {

  dashboard() {
    const stats = Scheduler.getStats();
    const { settings, subjects } = Store.data;
    const today = Time.today();
    const bufName = settings.bufferDayOfWeek === -1 ? 'None' : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][settings.bufferDayOfWeek];

    // ── Exam Countdown ──────────────────────────────────────
    // Find the earliest exam date across all subjects
    const examDates = subjects
      .filter(s => s.examDate && s.examDate >= today)
      .map(s => ({ name: s.fullName || s.name, color: s.color, date: s.examDate,
                   days: Time.diffDays(today, s.examDate) }))
      .sort((a, b) => a.days - b.days);
    const nextExam = examDates[0] || null;

    // Urgency: 0-100 scale based on days remaining vs total window
    let countdownHtml = '';
    if (!nextExam) {
      // Show a prompt card so the section isn't blank
      countdownHtml = `
        <div class="countdown-card">
          <div class="cd-header">
            <div>
              <div class="cd-title">Exam Countdown</div>
              <div class="cd-urgency-label" style="color:var(--text3)">No exam dates set</div>
            </div>
            <div class="cd-big-days">
              <span class="cd-days-num" style="color:var(--text3)">—</span>
              <span class="cd-days-text">days left</span>
            </div>
          </div>
          <div class="cd-progress-wrap">
            <div class="cd-progress-fill" style="width:0%;background:var(--border)"></div>
          </div>
          <div style="padding-top:10px;font-size:13px;color:var(--text3)">
            Add an Exam Date in <strong>Settings → Subject Configuration</strong> to activate the countdown.
          </div>
        </div>`;
    } else {
      const totalWindow = subjects[0]?.createdAt
        ? Math.max(1, Time.diffDays(subjects[0].createdAt, nextExam.date))
        : 180;
      const urgencyPct  = Math.min(100, Math.round(((totalWindow - nextExam.days) / totalWindow) * 100));
      const urgencyColor = nextExam.days <= 14 ? 'var(--red)'
                         : nextExam.days <= 30 ? 'var(--yellow)'
                         : 'var(--green)';
      const urgencyLabel = nextExam.days <= 14 ? 'Critical Zone'
                         : nextExam.days <= 30 ? 'High Urgency'
                         : nextExam.days <= 60 ? 'Stay Consistent'
                         : 'Good Pace';

      // Build per-exam rows if multiple
      const allExamRows = examDates.map(e =>
        `<div class="cd-exam-row">
          <span class="cd-exam-dot" style="background:${e.color}"></span>
          <span class="cd-exam-name">${e.name}</span>
          <span class="cd-exam-date">${Time.formatDate(e.date)}</span>
          <span class="cd-exam-days" style="color:${e.days<=14?'var(--red)':e.days<=30?'var(--yellow)':'var(--text)'}">${e.days}d</span>
        </div>`).join('');

      // Hours/day widget
      const hoursEl = stats.requiredDailySecs > 0
        ? `<div class="cd-stat"><span class="cd-stat-val">${Time.toDisplay(stats.requiredDailySecs)}</span><span class="cd-stat-label">need/day</span></div>`
        : '';

      countdownHtml = `
        <div class="countdown-card">
          <div class="cd-header">
            <div>
              <div class="cd-title">Exam Countdown</div>
              <div class="cd-urgency-label" style="color:${urgencyColor}">${urgencyLabel}</div>
            </div>
            <div class="cd-big-days">
              <span class="cd-days-num" style="color:${urgencyColor}">${nextExam.days}</span>
              <span class="cd-days-text">days left</span>
            </div>
          </div>
          <div class="cd-progress-wrap">
            <div class="cd-progress-fill" style="width:${urgencyPct}%;background:${urgencyColor}"></div>
          </div>
          <div class="cd-stats-row">
            <div class="cd-stat"><span class="cd-stat-val">${stats.pct}%</span><span class="cd-stat-label">complete</span></div>
            <div class="cd-stat"><span class="cd-stat-val">${stats.studyDaysLeft}</span><span class="cd-stat-label">study days left</span></div>
            ${hoursEl}
            <div class="cd-stat"><span class="cd-stat-val">${Time.toDisplay(stats.pendingSecs)}</span><span class="cd-stat-label">remaining</span></div>
          </div>
          ${examDates.length > 0 ? `<div class="cd-exams">${allExamRows}</div>` : ''}
        </div>`;
    }

    let alertHtml = '';
    if (stats.firstDeadline) {
      if (stats.isOverdue) {
        alertHtml = `<div class="alert alert-error"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> DEADLINE OVERDUE by ${Math.abs(stats.calDaysLeft)} day${Math.abs(stats.calDaysLeft)!==1?'s':''}! ${Time.toDisplay(stats.pendingSecs)} still remaining. <button class="btn btn-xs btn-outline" onclick="Actions.handleBacklog()">Fix plan →</button></div>`;
      } else if (stats.calDaysLeft <= 14) {
        alertHtml = `<div class="alert alert-error"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Deadline in ${stats.calDaysLeft} day${stats.calDaysLeft!==1?'s':''}! ${stats.onTrack?'On track <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':'BEHIND — act now!'}</div>`;
      } else if (!stats.onTrack && stats.studyDaysLeft > 0) {
        alertHtml = `<div class="alert alert-warn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Behind schedule. Need ${Time.toDisplay(stats.requiredDailySecs)}/day with ${stats.studyDaysLeft} study days left. <button class="btn btn-xs btn-outline" onclick="Actions.handleBacklog()">Fix →</button></div>`;
      } else if (stats.backlogSecs > 0) {
        alertHtml = `<div class="alert alert-warn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> ${Time.toDisplay(stats.backlogSecs)} backlog from missed sessions. <button class="btn btn-xs btn-outline" onclick="Actions.handleBacklog()">Handle →</button></div>`;
      }
    }

    // Icon SVGs for metric cards
    const svgBook    = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
    const svgCheck   = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    const svgClock   = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const svgAlert   = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    const svgTarget  = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
    const svgBar     = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;

    // FIX: Correctly distinguish in-progress vs next-up
    const subjectCards = stats.subjectStats.map(s => {
      let nextLine = '';
      if (s.inProgress) {
        nextLine = `<div class="sp-next sp-inprogress"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg> In progress: <em>${s.inProgress.name}</em></div>`;
      } else if (s.nextUp) {
        nextLine = `<div class="sp-next"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg> Up next: <em>${s.nextUp.name}</em></div>`;
      } else {
        nextLine = `<div class="sp-next sp-done"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> All complete!</div>`;
      }

      let needHtml = '';
      if (s.subRequiredDailySecs > 0 && s.pending > 0) {
        const isOver = !s.subOnTrack;
        needHtml = `
          <div class="sp-need${isOver ? ' warn-need' : ''}">
            <div>
              <div class="sp-need-val">${Time.toDisplay(s.subRequiredDailySecs)}</div>
              <div class="sp-need-label">NEED / STUDY DAY${isOver ? ' !' : ''}</div>
            </div>
            <div class="sp-need-finish">Finish: ${Time.formatDate(s.subCompletionDate || s.deadline)}</div>
          </div>`;
      } else if (s.pending === 0) {
        needHtml = `<div class="sp-need"><div class="sp-need-val" style="color:var(--green)">Done</div><div class="sp-need-label">All lectures complete</div></div>`;
      }

      return `
      <div class="subject-progress-card">
        <div class="sp-header">
          <span class="sp-dot" style="background:${s.color}"></span>
          <strong class="sp-name">${s.fullName||s.name}</strong>
          <span class="sp-pct">${s.pct}%</span>
        </div>
        ${UI.progressBar(s.pct, s.color)}
        <div class="sp-meta">
          <span>${s.completedCount}/${s.totalCount} lectures</span>
          <span>${Time.toDisplay(s.done)} / ${Time.toDisplay(s.total)}</span>
        </div>
        ${nextLine}
        ${needHtml}
      </div>`;
    }).join('');

    document.getElementById('page-dashboard').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Dashboard</h1>
          <p class="page-subtitle">Overview of your study progress</p>
        </div>
        <div class="page-header-right">
          <span class="date-badge">${Time.dayName(today)}, ${Time.formatDate(today)}</span>
        </div>
      </div>
      ${alertHtml}
      ${countdownHtml}
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-card-top">
            <span class="metric-label">Total Content</span>
            <div class="metric-icon-box">${svgBook}</div>
          </div>
          <div class="metric-value">${Time.toDisplay(stats.totalSecs)}</div>
          <div class="metric-sub">Full course duration</div>
        </div>
        <div class="metric-card accent-card">
          <div class="metric-card-top">
            <span class="metric-label">Completed</span>
            <div class="metric-icon-box">${svgCheck}</div>
          </div>
          <div class="metric-value">${Time.toDisplay(stats.completedSecs)}</div>
          <div class="metric-sub">${stats.pct}% of total done</div>
        </div>
        <div class="metric-card">
          <div class="metric-card-top">
            <span class="metric-label">Remaining</span>
            <div class="metric-icon-box">${svgClock}</div>
          </div>
          <div class="metric-value">${Time.toDisplay(stats.pendingSecs)}</div>
          <div class="metric-sub">Content left to watch</div>
        </div>
        <div class="metric-card ${stats.backlogSecs > 0 ? 'warn-card' : ''}">
          <div class="metric-card-top">
            <span class="metric-label">Backlog</span>
            <div class="metric-icon-box">${svgAlert}</div>
          </div>
          <div class="metric-value">${Time.toDisplay(stats.backlogSecs)}</div>
          <div class="metric-sub">${stats.backlogSecs > 0 ? 'From missed sessions' : 'All clear!'}</div>
        </div>
        <div class="metric-card ${!stats.onTrack && stats.studyDaysLeft > 0 ? 'warn-card' : ''}">
          <div class="metric-card-top">
            <span class="metric-label">Daily Target</span>
            <div class="metric-icon-box">${svgTarget}</div>
          </div>
          <div class="metric-value">${stats.requiredDailySecs > 0 ? Time.toDisplay(stats.requiredDailySecs) : '—'}</div>
          <div class="metric-sub">${stats.onTrack ? 'On track <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : stats.studyDaysLeft > 0 ? 'Behind — act now' : '—'}</div>
        </div>
        <div class="metric-card accent-card">
          <div class="metric-card-top">
            <span class="metric-label">Progress</span>
            <div class="metric-icon-box">${svgBar}</div>
          </div>
          <div class="metric-value">${stats.pct}%</div>
          <div class="metric-sub">${stats.completionDate ? 'Est. finish: ' + Time.formatDate(stats.completionDate) : 'Overall completion'}</div>
        </div>
      </div>
      <div class="section-title">Subject Progress</div>
      <div class="subject-progress-list">${subjectCards}</div>
      <div class="section-title">Plan Info</div>
      <div class="info-grid">
        <div class="info-card"><span class="info-label">Start Date</span><span class="info-value">${Time.formatDate(settings.startDate)}</span></div>
        <div class="info-card"><span class="info-label">Daily Target</span><span class="info-value">${settings.dailyStudyHours}h / study day</span></div>
        <div class="info-card"><span class="info-label">Study Days Left</span><span class="info-value">${stats.studyDaysLeft > 0 ? stats.studyDaysLeft : '—'}</span></div>
        <div class="info-card"><span class="info-label">Rest Day</span><span class="info-value">${settings.bufferDayOfWeek === -1 ? 'None' : bufName + 's (weekly)'}</span></div>
        <div class="info-card"><span class="info-label">Nearest Deadline</span><span class="info-value">${stats.firstDeadline ? Time.formatDate(stats.firstDeadline) : '—'}</span></div>
        <div class="info-card"><span class="info-label">Today</span><span class="info-value">${stats.todayDone}/${stats.todayTotal} done · ${Time.toDisplay(stats.todayStudiedSecs)} studied</span></div>
      </div>`;
  },

  today() {
    const today = Time.today();
    const isBuffer = Store.data.settings.bufferDayOfWeek !== -1 && Time.dayOfWeek(today) === Store.data.settings.bufferDayOfWeek;
    const entries  = Scheduler.getTodayPlan();
    const totalSched  = entries.reduce((s, e) => s + e.plannedSeconds, 0);
    const doneCount   = entries.filter(e => e.status === 'done' || e.status === 'partial_done').length;
    const studiedSecs = entries.reduce((s, e) => s + (e.completedSeconds || 0), 0);

    let content;
    if (isBuffer) {
      content = `<div class="empty-state"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;color:var(--green)"><path d="M2 22a8 8 0 0 1 8-8h1a8 8 0 0 0 8-8 8 8 0 0 0-8 8H9a8 8 0 0 1-8 8"/><path d="M17 6.5A4.5 4.5 0 0 0 12.5 2"/></svg><strong>Rest Day</strong><br><small>Your weekly buffer. Come back tomorrow refreshed.</small></div>`;
    } else if (!entries.length) {
      content = `<div class="empty-state"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px;color:var(--green)"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><strong>All clear!</strong><br><small>You may have completed everything, or the schedule hasn't been built yet. Check Settings.</small></div>`;
    } else {
      content = entries.map(entry => {
        const lec     = entry.lecture;
        const subj    = entry.subject;
        const isDone    = entry.status === 'done';
        const isPartial = entry.status === 'partial_done';

        const statusBadge = isDone    ? UI.badge('Done <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>', 'success')
                          : isPartial ? UI.badge('Partial',  'warn')
                          :             UI.badge('Pending',  'info');

        // isContinuation = already partially done before today
        // plannedSeconds < remaining && !isDone = splits today (continues tomorrow)
        let splitBadge = '';
        if (entry.isContinuation) {
          splitBadge = UI.badge('Continuation', 'warn');
        } else if (entry.plannedSeconds < lec.remaining && !isDone) {
          splitBadge = UI.badge('Continues Tomorrow', 'info');
        }

        const cardClass = isDone ? 'card-done' : isPartial ? 'card-partial' : '';

        const checkSvg = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
        const logSvg   = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

        return `<div class="lecture-card ${cardClass}">
          <div class="lc-left"><div class="lc-seq">${lec.lectureNum}</div></div>
          <div class="lc-body">
            <span class="lc-subject-tag" style="color:${subj.color};background:${subj.color}18">${subj.name}</span>
            <div class="lc-name">${lec.name}</div>
            <div class="lc-meta">
              <span>Today: <strong>${Time.toDisplay(entry.plannedSeconds)}</strong></span>
              <span>Remaining: <strong>${Time.toHMS(lec.remaining)}</strong></span>
              ${statusBadge}
              ${splitBadge}
            </div>
            ${(isDone || isPartial) && entry.completedSeconds
              ? `<div class="lc-done-note"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Studied ${Time.toDisplay(entry.completedSeconds)} today</div>` : ''}
          </div>
          <div class="lc-actions">
            ${!isDone
              ? `<button class="btn-circle btn-circle-check" title="Mark Done" onclick="Actions.completeSession('${lec.id}')">${checkSvg}</button>
                 <button class="btn-circle btn-circle-log"   title="Log Time"  onclick="Actions.showPartial('${lec.id}')">${logSvg}</button>`
              : `<button class="btn-circle btn-circle-done" disabled>${checkSvg}</button>`}
          </div>
        </div>`;
      }).join('');
    }

    document.getElementById('page-today').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Today's Plan</h1>
          <p class="page-subtitle">Target: ${Time.toDisplay(totalSched)} of study${isBuffer ? ' · Rest Day' : ''}</p>
        </div>
        <div class="page-header-right">
          <span class="date-badge">${Time.dayName(today)}, ${Time.formatDate(today)}</span>
        </div>
      </div>
      ${!isBuffer && entries.length ? `
        <div class="today-summary">
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> ${entries.length} lecture${entries.length!==1?'s':''}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${Time.toDisplay(totalSched)}</span>
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${doneCount}/${entries.length} done</span>
          ${studiedSecs ? `<span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 6-8 8-8 14a8 8 0 0 0 16 0c0-6-8-8-8-14z"/></svg> ${Time.toDisplay(studiedSecs)} studied</span>` : ''}
        </div>` : ''}
      <div class="lectures-list">${content}</div>`;
  },

  subjects() {
    const { subjects, lectures } = Store.data;
    const cards = subjects.map(sub => {
      const lecs  = lectures.filter(l => l.subjectId === sub.id);
      const total = lecs.reduce((s,l) => s+l.duration, 0);
      const done  = lecs.reduce((s,l) => s+(l.duration-l.remaining), 0);
      const pct   = total > 0 ? Math.round((done/total)*100) : 0;

      return `<div class="subject-card">
        <div class="sc-header">
          <div class="sc-title">
            <div class="sc-color-bar" style="background:${sub.color}"></div>
            <div class="sc-name-wrap">
              <div class="sc-name">${sub.fullName||sub.name}</div>
              <span class="sc-code">${sub.name}</span>
            </div>
          </div>
          <div class="sc-acts">
            <button class="btn btn-sm btn-outline" onclick="Actions.editSubject('${sub.id}')" title="Edit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit</button>
            ${subjects.length > 1 ? `<button class="btn btn-sm btn-danger" onclick="Actions.deleteSubject('${sub.id}')"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>` : ''}
          </div>
        </div>
        <div class="sc-stats">
          <div class="sc-stat"><span class="sc-label">Progress</span><strong>${pct}%</strong></div>
          <div class="sc-stat"><span class="sc-label">Lectures</span><strong>${lecs.filter(l=>l.status==='complete').length} / ${lecs.length}</strong></div>
          <div class="sc-stat"><span class="sc-label">Studied</span><strong>${Time.toDisplay(done)}</strong></div>
          <div class="sc-stat"><span class="sc-label">Remaining</span><strong>${Time.toDisplay(total-done)}</strong></div>
          <div class="sc-stat"><span class="sc-label">Deadline</span><strong>${Time.formatDate(sub.deadline)}</strong></div>
          <div class="sc-stat"><span class="sc-label">Exam</span><strong>${Time.formatDate(sub.examDate)}</strong></div>
          <div class="sc-stat"><span class="sc-label">Daily Hours</span><strong>${sub.dailyHours}h</strong></div>
          <div class="sc-stat"><span class="sc-label">Priority</span><strong>#${sub.priority}</strong></div>
        </div>
        <div class="sc-prog">${UI.progressBar(pct, sub.color)}</div>
      </div>`;
    }).join('');

    document.getElementById('page-subjects').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Subjects</h1>
          <p class="page-subtitle">Manage your curriculum and target dates</p>
        </div>
        <button class="btn btn-primary" onclick="Actions.addSubject()">+ Add Subject</button>
      </div>
      <div class="subjects-list">${cards||'<div class="empty-state">No subjects yet.</div>'}</div>`;
  },

  lectures() {
    const { lectures, subjects } = Store.data;

    // Save scroll position BEFORE wiping innerHTML.
    // The page div itself doesn't scroll — the inner table-wrap does.
    // We must save from table-wrap (the actual scrolling container).
    const pageEl    = document.getElementById('page-lectures');
    const tableWrap = document.querySelector('#page-lectures .table-wrap');
    const savedScroll = tableWrap ? tableWrap.scrollTop : 0;

    // Read filters before wiping innerHTML
    const fSub    = document.getElementById('lec-filter-sub')?.value    || '';
    const fStatus = document.getElementById('lec-filter-status')?.value || '';
    const fSearch = document.getElementById('lec-search')?.value        || '';

    const filtered = lectures.filter(l => {
      if (fSub    && l.subjectId !== fSub)   return false;
      if (fStatus && l.status    !== fStatus) return false;
      if (fSearch) {
        const q = fSearch.toLowerCase();
        if (!l.name.toLowerCase().includes(q) && !l.lectureNum.includes(q)) return false;
      }
      return true;
    });

    const subOpts = subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    const rows = filtered.map(lec => {
      const subj    = subjects.find(s => s.id === lec.subjectId);
      const donePct = lec.duration > 0 ? Math.round(((lec.duration-lec.remaining)/lec.duration)*100) : 100;
      const dotCls  = {complete:'dot-done', partial:'dot-partial', pending:'dot-pending'}[lec.status] || 'dot-pending';
      const stLabel = {complete:'Done', partial:'Partial', pending:'Pending'}[lec.status] || 'Pending';

      return `<tr class="${lec.status==='complete'?'row-done':''}">
        <td class="td-mono muted">${lec.sequence}</td>
        <td><span class="lec-num-badge">${lec.lectureNum}</span></td>
        <td class="td-name">
          <span class="lec-name-txt">${lec.name}</span>
          <div class="lec-prog-mini">${UI.progressBar(donePct, subj?.color)}</div>
        </td>
        <td><span style="color:${subj?.color};font-weight:600">${subj?.name||'—'}</span></td>
        <td class="td-mono">${Time.toHMS(lec.duration)}</td>
        <td class="td-mono">${Time.toHMS(lec.remaining)}</td>
        <td><span class="status-dot ${dotCls}"></span>${stLabel}</td>
        <td>
          <div class="row-btns">
            ${lec.status!=='complete' ? `<button class="btn btn-xs btn-success" onclick="Actions.markLecComplete('${lec.id}')" title="Mark Done"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></button>` : ''}
            ${lec.status!=='complete' ? `<button class="btn btn-xs btn-outline" onclick="Actions.showPartial('${lec.id}')" title="Log Time"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></button>` : ''}
            <button class="btn btn-xs btn-note" onclick="Actions.addNoteToLecture('${lec.id}')" title="Add Note"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg></button>
            <button class="btn btn-xs btn-outline" onclick="Actions.editLecture('${lec.id}')" title="Edit"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="btn btn-xs btn-danger" onclick="Actions.deleteLecture('${lec.id}')" title="Delete"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
          </div>
        </td>
      </tr>`;
    }).join('') || `<tr><td colspan="8" class="empty-row">No lectures match filters.</td></tr>`;

    document.getElementById('page-lectures').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Lectures <span class="count-badge">${filtered.length}/${lectures.length}</span></h1>
          <p class="page-subtitle">Master list of all content</p>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-outline" onclick="Actions.importPDF()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Import PDF</button>
          <button class="btn btn-primary" onclick="Actions.addLecture()">+ Add Lecture</button>
        </div>
      </div>
      <div class="table-controls">
        <div class="search-wrap">
          <span class="search-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
          <input id="lec-search" class="input-search" placeholder="Search lectures…" value="${fSearch}" oninput="Pages.lectures()">
        </div>
        <select id="lec-filter-sub"    class="input-select" onchange="Pages.lectures()"><option value="">All Subjects</option>${subOpts}</select>
        <select id="lec-filter-status" class="input-select" onchange="Pages.lectures()">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>#</th><th>Lec</th><th>Name</th><th>Subject</th><th>Duration</th><th>Remaining</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;

    if (fSub)    document.getElementById('lec-filter-sub').value    = fSub;
    if (fStatus) document.getElementById('lec-filter-status').value = fStatus;

    // Restore scroll on the table-wrap (the actual scrolling container),
    // not the page div. Must happen after innerHTML is fully set.
    if (savedScroll > 0) {
      const newTableWrap = document.querySelector('#page-lectures .table-wrap');
      if (newTableWrap) newTableWrap.scrollTop = savedScroll;
    }
  },


  // ─────────────────────────────────────────
  // ANALYTICS (merged Heatmap + Weekly Review)
  // ─────────────────────────────────────────
  analytics() {
    // ── Weekly data ──────────────────────────────────────────────
    const ws   = Scheduler.getWeeklyStats();
    const from = ws.days[0]?.formatted ?? '';
    const to   = ws.days[6]?.formatted ?? '';
    const maxSecs = ws.days.length ? Math.max(...ws.days.map(d => Math.max(d.plannedSecs, d.studiedSecs)), 1) : 1;

    const dayRows = ws.days.map(d => {
      if (d.isBuffer) return `
        <div class="wr-day">
          <div class="wr-day-label"><span class="wr-day-name">${d.dayName}</span><span class="wr-day-date">${d.date.slice(5)}</span></div>
          <div class="wr-day-bar-wrap"><div class="wr-rest-label">Rest Day</div></div>
          <div class="wr-day-hours">—</div>
        </div>`;
      const pWidth = Math.round((d.plannedSecs / maxSecs) * 100);
      const sWidth = Math.round((d.studiedSecs / maxSecs) * 100);
      const isToday = d.date === Time.today();
      let cls = '';
      if (d.studiedSecs === 0 && d.plannedSecs > 0 && !d.isFuture && !isToday) cls = 'wr-day-missed';
      else if (d.pct >= 100) cls = 'wr-day-great';
      return `
        <div class="wr-day ${cls}${isToday ? ' wr-day-today' : ''}">
          <div class="wr-day-label">
            <span class="wr-day-name">${d.dayName}${isToday ? ' <em>today</em>' : ''}</span>
            <span class="wr-day-date">${d.date.slice(5)}</span>
          </div>
          <div class="wr-day-bar-wrap">
            <div class="wr-bar-planned" style="width:${pWidth}%"></div>
            <div class="wr-bar-studied" style="width:${sWidth}%"></div>
            ${d.missedCount > 0 ? `<span class="wr-missed-tag">${d.missedCount} missed</span>` : ''}
          </div>
          <div class="wr-day-hours">
            ${d.studiedSecs > 0 ? `<span class="wr-h-done">${Time.toDisplay(d.studiedSecs)}</span>` : '<span class="wr-h-none">—</span>'}
            ${d.plannedSecs > 0 ? `<span class="wr-h-plan">/ ${Time.toDisplay(d.plannedSecs)}</span>` : ''}
          </div>
        </div>`;
    }).join('');

    const subjRows = ws.subjectWeekly.map(s => {
      if (!s.weekStudied && !s.weekLecsDone) return '';
      return `<div class="wr-subj-row">
        <span class="wr-subj-dot" style="background:${s.color}"></span>
        <span class="wr-subj-name">${s.name}</span>
        <span class="wr-subj-stat">${s.weekLecsDone} lecture${s.weekLecsDone!==1?'s':''} done</span>
        <span class="wr-subj-time">${Time.toDisplay(s.weekStudied)}</span>
      </div>`;
    }).join('') || '<div class="wr-empty-sub">No subject data this week yet.</div>';

    const { schedule, lectures, subjects, settings } = Store.data;
    let missedHtml = '';
    ws.days.filter(d => d.missedCount > 0).forEach(d => {
      (schedule[d.date] || []).filter(e => e.status === 'scheduled').forEach(e => {
        const lec  = lectures.find(l => l.id === e.lectureId);
        const subj = subjects.find(s => s.id === e.subjectId);
        if (!lec || !subj) return;
        missedHtml += `<div class="wr-missed-row">
          <span class="wr-missed-dot" style="background:${subj.color}"></span>
          <span class="wr-missed-name">${lec.name}</span>
          <span class="wr-missed-date">${d.dayName} · ${Time.toDisplay(e.plannedSeconds)}</span>
        </div>`;
      });
    });

    // ── Heatmap data ──────────────────────────────────────────────
    const today     = Time.today();
    const startDate = Time.addDays(today, -364);
    const dayMap    = {};
    let maxStudied  = 1;
    Object.entries(schedule).forEach(([date, entries]) => {
      if (date < startDate || date > today) return;
      const studied = entries.reduce((s, e) => s + (e.completedSeconds || 0), 0);
      const planned = entries.reduce((s, e) => s + e.plannedSeconds, 0);
      dayMap[date]  = { studied, planned };
      if (studied > maxStudied) maxStudied = studied;
    });
    const totalStudied = Object.values(dayMap).reduce((s, d) => s + d.studied, 0);
    const activeDays   = Object.values(dayMap).filter(d => d.studied > 0).length;
    let streak = 0;
    const todayStudied = (dayMap[today]?.studied || 0) > 0;
    // Start at i=0 to include today when it has study data; post-loop bump removed (was double-counting)
    const streakStart  = todayStudied ? 0 : 1;
    for (let i = streakStart; i <= 365; i++) {
      const d = Time.addDays(today, -i);
      if (settings.bufferDayOfWeek !== -1 && Time.dayOfWeek(d) === settings.bufferDayOfWeek) continue;
      const entry = dayMap[d];
      if (entry && entry.studied > 0) streak++;
      else break;
    }
    let bestDay = null, bestSecs = 0;
    Object.entries(dayMap).forEach(([date, d]) => {
      if (d.studied > bestSecs) { bestSecs = d.studied; bestDay = date; }
    });
    const heatColor = (studied) => {
      if (!studied) return 'var(--heat-0)';
      const pct = studied / maxStudied;
      if (pct < 0.25) return 'var(--heat-1)';
      if (pct < 0.50) return 'var(--heat-2)';
      if (pct < 0.75) return 'var(--heat-3)';
      return 'var(--heat-4)';
    };
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const [sy, sm, sd] = startDate.split('-').map(Number);
    const padded = new Date(sy, sm - 1, sd).getDay();
    const cells = [];
    for (let i = -padded; i < 365 + (7 - ((364 + padded + 1) % 7 || 7)); i++) {
      const date    = Time.addDays(startDate, i);
      const inRange = date >= startDate && date <= today;
      cells.push({ date, inRange, data: inRange ? (dayMap[date] || { studied: 0, planned: 0 }) : null });
    }
    const monthLabelCols = {};
    cells.forEach((cell, idx) => {
      if (!cell.inRange) return;
      const [,m,d] = cell.date.split('-').map(Number);
      if (d === 1 || idx === padded) monthLabelCols[Math.floor(idx / 7)] = monthNames[m - 1];
    });
    const numCols = Math.ceil(cells.length / 7);
    let gridHtml = '';
    for (let col = 0; col < numCols; col++) {
      gridHtml += `<div class="hm-col"><div class="hm-month-label">${monthLabelCols[col] || ''}</div>`;
      for (let row = 0; row < 7; row++) {
        const cell = cells[col * 7 + row];
        if (!cell) { gridHtml += `<div class="hm-cell hm-empty"></div>`; continue; }
        if (!cell.inRange) { gridHtml += `<div class="hm-cell"></div>`; continue; }
        const studiedH = cell.data.studied > 0 ? Time.toDisplay(cell.data.studied) : 'No study';
        const bg = cell.data.studied > 0 ? heatColor(cell.data.studied) : 'var(--heat-0)';
        gridHtml += `<div class="hm-cell${cell.date === today ? ' hm-today' : ''}" style="background:${bg}" title="${Time.formatDate(cell.date)}: ${studiedH}" onclick="HeatmapUI.showDay('${cell.date}')"></div>`;
      }
      gridHtml += `</div>`;
    }
    const dowLabels = ['S','M','T','W','T','F','S'].map(d => `<div class="hm-dow-label">${d}</div>`).join('');
    const monthBreakdown = [];
    for (let m = 5; m >= 0; m--) {
      const ref = new Date(); ref.setDate(1); ref.setMonth(ref.getMonth() - m);
      const y = ref.getFullYear(), mo = ref.getMonth();
      let secs = 0, days = 0;
      Object.entries(dayMap).forEach(([date, d]) => {
        const [dy, dm] = date.split('-').map(Number);
        if (dy === y && dm === mo + 1) { secs += d.studied; if (d.studied > 0) days++; }
      });
      monthBreakdown.push({ label: monthNames[mo] + ' ' + y, secs, days });
    }
    const maxMonthSecs = Math.max(1, ...monthBreakdown.map(m => m.secs));
    const monthBars = monthBreakdown.map(m => {
      const pct = Math.round((m.secs / maxMonthSecs) * 100);
      return `<div class="hm-month-bar-row">
        <div class="hm-month-bar-label">${m.label}</div>
        <div class="hm-month-bar-track"><div class="hm-month-bar-fill progress-bar-fill" style="width:${pct}%"></div></div>
        <div class="hm-month-bar-val">${Time.toDisplay(m.secs)}<span class="hm-month-days">${m.days}d</span></div>
      </div>`;
    }).join('');

    document.getElementById('page-analytics').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Analytics</h1>
          <p class="page-subtitle">Weekly progress & 12-month study activity</p>
        </div>
        <div class="wr-streak-badge${streak>0?' wr-streak-active':''}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 6-8 8-8 14a8 8 0 0 0 16 0c0-6-8-8-8-14z"/></svg> ${streak} day streak
        </div>
      </div>

      <div class="section-title">This Week  <span style="font-size:11px;color:var(--text3);font-weight:400;text-transform:none;letter-spacing:0">${from} — ${to}</span></div>
      <div class="metrics-grid">
        <div class="metric-card accent-card">
          <div class="metric-card-top"><span class="metric-label">Studied This Week</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          </div>
          <div class="metric-value">${Time.toDisplay(ws.weekStudiedSecs)}</div>
          <div class="metric-sub">of ${Time.toDisplay(ws.weekPlannedSecs)} planned</div>
        </div>
        <div class="metric-card">
          <div class="metric-card-top"><span class="metric-label">Sessions Done</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          </div>
          <div class="metric-value">${ws.weekDone}</div>
          <div class="metric-sub">Lectures completed</div>
        </div>
        <div class="metric-card ${ws.completionRate < 70 && ws.weekPlannedSecs > 0 ? 'warn-card' : ''}">
          <div class="metric-card-top"><span class="metric-label">Completion Rate</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          </div>
          <div class="metric-value">${ws.weekPlannedSecs > 0 ? ws.completionRate + '%' : '—'}</div>
          <div class="metric-sub">${ws.completionRate < 70 && ws.weekPlannedSecs > 0 ? 'Below target' : 'This week'}</div>
        </div>
        <div class="metric-card ${ws.weekMissed > 0 ? 'warn-card' : ''}">
          <div class="metric-card-top"><span class="metric-label">Missed Sessions</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          </div>
          <div class="metric-value">${ws.weekMissed}</div>
          <div class="metric-sub">${ws.weekMissed > 0 ? 'Need to catch up' : 'All good!'}</div>
        </div>
      </div>

      <div class="section-title">All-Time Stats</div>
      <div class="metrics-grid">
        <div class="metric-card accent-card">
          <div class="metric-card-top"><span class="metric-label">Total Studied</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          </div>
          <div class="metric-value">${Time.toDisplay(totalStudied)}</div>
          <div class="metric-sub">Past 12 months</div>
        </div>
        <div class="metric-card">
          <div class="metric-card-top"><span class="metric-label">Active Days</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
          </div>
          <div class="metric-value">${activeDays}</div>
          <div class="metric-sub">Days with study logged</div>
        </div>
        <div class="metric-card">
          <div class="metric-card-top"><span class="metric-label">Day Streak</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c0 6-8 8-8 14a8 8 0 0 0 16 0c0-6-8-8-8-14z"/></svg></div>
          </div>
          <div class="metric-value">${streak}</div>
          <div class="metric-sub">Consecutive study days</div>
        </div>
        <div class="metric-card">
          <div class="metric-card-top"><span class="metric-label">Best Day</span>
            <div class="metric-icon-box"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
          </div>
          <div class="metric-value">${bestDay ? Time.toDisplay(bestSecs) : '—'}</div>
          <div class="metric-sub">${bestDay ? Time.formatDate(bestDay) : 'No data yet'}</div>
        </div>
      </div>

      <div class="section-title">Day-by-Day This Week</div>
      <div class="wr-legend">
        <span class="wr-legend-item"><span class="wr-legend-dot wr-legend-planned"></span>Planned</span>
        <span class="wr-legend-item"><span class="wr-legend-dot wr-legend-studied"></span>Studied</span>
      </div>
      <div class="wr-days-chart">${dayRows}</div>

      <div class="section-title">Subject Breakdown</div>
      <div class="wr-subj-list">${subjRows}</div>

      ${missedHtml ? `<div class="section-title">Missed Sessions</div><div class="wr-missed-list">${missedHtml}</div>` : ''}

      <div class="section-title">12-Month Contribution Grid</div>
      <div class="hm-legend-row">
        <span class="hm-legend-label">Less</span>
        <span class="hm-legend-cell" style="background:var(--heat-0)"></span>
        <span class="hm-legend-cell" style="background:var(--heat-1)"></span>
        <span class="hm-legend-cell" style="background:var(--heat-2)"></span>
        <span class="hm-legend-cell" style="background:var(--heat-3)"></span>
        <span class="hm-legend-cell" style="background:var(--heat-4)"></span>
        <span class="hm-legend-label">More</span>
      </div>
      <div class="hm-grid-container">
        <div class="hm-dow-col">${dowLabels}</div>
        <div class="hm-grid" id="hm-grid">${gridHtml}</div>
      </div>
      <div id="hm-day-popup" class="hm-day-popup" style="display:none"></div>

      <div class="section-title">Monthly Breakdown</div>
      <div class="hm-month-bars">${monthBars}</div>`;
  },

  settings() {
    const { settings, subjects } = Store.data;
    const darkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const bufOpts = [
      { label: 'No Rest Day', val: -1 },
      { label: 'Sunday',    val: 0 },
      { label: 'Monday',    val: 1 },
      { label: 'Tuesday',   val: 2 },
      { label: 'Wednesday', val: 3 },
      { label: 'Thursday',  val: 4 },
      { label: 'Friday',    val: 5 },
      { label: 'Saturday',  val: 6 },
    ].map(o => `<option value="${o.val}" ${settings.bufferDayOfWeek===o.val?'selected':''}>${o.label}</option>`).join('');

    const subRows = subjects.map(sub => `
      <div class="ss-row">
        <div class="ss-name" style="color:${sub.color}">${sub.fullName||sub.name}</div>
        <label class="ss-field">Daily Hours
          <input type="number" class="input-sm" value="${sub.dailyHours}" min="0.5" max="24" step="0.5"
            onchange="Actions.setSubjectProp('${sub.id}','dailyHours',parseFloat(this.value))">
        </label>
        <label class="ss-field">Deadline
          <input type="date" class="input-sm" value="${sub.deadline||''}"
            onchange="Actions.setSubjectProp('${sub.id}','deadline',this.value)">
        </label>
        <label class="ss-field">Exam Date
          <input type="date" class="input-sm" value="${sub.examDate||''}"
            onchange="Actions.setSubjectProp('${sub.id}','examDate',this.value)">
        </label>
        <label class="ss-field">Priority
          <input type="number" class="input-sm" value="${sub.priority}" min="1" max="10"
            onchange="Actions.setSubjectProp('${sub.id}','priority',parseInt(this.value))">
        </label>
      </div>`).join('');

    document.getElementById('page-settings').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Settings</h1>
          <p class="page-subtitle">Configure your study plan parameters</p>
        </div>
      </div>
      <div class="settings-section">
        <div class="settings-card-header">
          <div class="settings-card-title">General</div>
          <div class="settings-card-desc">Key dates and global study parameters</div>
        </div>
        <div class="settings-card-body">
          <div class="settings-row">
            <label class="settings-label">Study Start Date</label>
            <input type="date" class="input-field" value="${settings.startDate}" onchange="Actions.setSetting('startDate',this.value)">
          </div>
          <div class="settings-row">
            <label class="settings-label">Daily Study Hours</label>
            <input type="number" class="input-field" value="${settings.dailyStudyHours}" min="0.5" max="24" step="0.5"
              onchange="Actions.setSetting('dailyStudyHours',parseFloat(this.value))">
            <span class="settings-hint">Reference total — used for backlog alerts. Actual scheduling uses per-subject hours below.</span>
          </div>
          <div class="settings-row">
            <label class="settings-label">Weekly Rest Day</label>
            <select class="input-field" onchange="Actions.setSetting('bufferDayOfWeek',parseInt(this.value))">${bufOpts}</select>
            <span class="settings-hint">Always kept free — no lectures scheduled on this day</span>
          </div>
        </div>
      </div>
      <div class="settings-section">
        <div class="settings-card-header">
          <div class="settings-card-title">Subject Configuration</div>
          <div class="settings-card-desc">Daily hours here directly controls how many hours/day each subject gets scheduled.</div>
        </div>
        <div class="settings-card-body">
          <p class="ss-note">For multiple subjects, hours should add up to your intended daily total.</p>
          ${subRows}
        </div>
      </div>
      <div class="settings-section">
        <div class="settings-card-header">
          <div class="settings-card-title">Appearance</div>
          <div class="settings-card-desc">Customize the look and feel of the app</div>
        </div>
        <div class="settings-card-body">
          <div class="settings-row">
            <label class="settings-label">Theme</label>
            <div class="theme-toggle-group">
              <button class="theme-btn ${!darkMode ? 'active' : ''}" onclick="Actions.setTheme('light')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                Light
              </button>
              <button class="theme-btn ${darkMode ? 'active' : ''}" onclick="Actions.setTheme('dark')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="settings-section danger-zone">
        <div class="settings-card-header">
          <div class="settings-card-title" style="color:var(--red)">Danger Zone</div>
          <div class="settings-card-desc">Irreversible actions — proceed with caution.</div>
        </div>
        <div class="settings-card-body">
          <div class="settings-row">
            <button class="btn btn-danger" onclick="Actions.resetApp()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> Reset All Data</button>
            <span class="settings-hint">Deletes all progress and settings permanently.</span>
          </div>
        </div>
      </div>`;
  },

  // ─────────────────────────────────────────
  // HEATMAP CALENDAR
  // ─────────────────────────────────────────

  // ─────────────────────────────────────────
  // NOTES & DOUBTS LOG
  // ─────────────────────────────────────────
  notes() {
    const { lectures, subjects } = Store.data;
    const notes  = Store.data.notes || {};

    // Read current filter
    const fSub    = document.getElementById('notes-filter-sub')?.value   || '';
    const fType   = document.getElementById('notes-filter-type')?.value  || '';
    const fSearch = document.getElementById('notes-search')?.value       || '';

    // Build flat list: { note, lecture, subject }
    let allNotes = [];
    lectures.forEach(lec => {
      const subj  = subjects.find(s => s.id === lec.subjectId);
      const lecNotes = notes[lec.id] || [];
      lecNotes.forEach(n => allNotes.push({ note: n, lec, subj }));
    });

    // Apply filters
    if (fSub)    allNotes = allNotes.filter(x => x.lec.subjectId === fSub);
    if (fType)   allNotes = allNotes.filter(x => x.note.type === fType);
    if (fSearch) {
      const q = fSearch.toLowerCase();
      allNotes = allNotes.filter(x =>
        x.note.text.toLowerCase().includes(q) ||
        x.lec.name.toLowerCase().includes(q));
    }

    // Sort newest first
    allNotes.sort((a, b) => b.note.createdAt.localeCompare(a.note.createdAt));

    const subOpts = subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    // Global totals across ALL notes (not filtered) — shown in stat cards
    let allNotesGlobal = [];
    lectures.forEach(lec => {
      (notes[lec.id] || []).forEach(n => allNotesGlobal.push(n));
    });
    const totalNotes  = allNotesGlobal.filter(n => n.type === 'note').length;
    const totalDoubts = allNotesGlobal.filter(n => n.type === 'doubt').length;
    const totalKey    = allNotesGlobal.filter(n => n.type === 'key').length;

    const svgNote  = `<svg class="type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
    const svgDoubt = `<svg class="type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    const svgKey   = `<svg class="type-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const typeIcon  = { note: svgNote, doubt: svgDoubt, key: svgKey };
    const typeLabel = { note: 'Note', doubt: 'Doubt', key: 'Key Point' };
    const typeBadge = { note: 'badge-info', doubt: 'badge-warn', key: 'badge-success' };

    const noteCards = allNotes.map(({ note, lec, subj }) => `
      <div class="note-card" data-note-id="${note.id}" data-lec-id="${lec.id}">
        <div class="note-card-header">
          <span class="lc-subject-tag" style="color:${subj?.color||'#888'};background:${subj?.color||'#888'}18">${subj?.name||'?'}</span>
          <span class="note-lec-name">${lec.name}</span>
          <span class="badge ${typeBadge[note.type]}">${typeIcon[note.type]} ${typeLabel[note.type]}</span>
          <span class="note-date">${Time.formatDate(note.createdAt)}</span>
          <button class="note-delete-btn" onclick="Actions.deleteNote('${lec.id}','${note.id}')" title="Delete"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        </div>
        <div class="note-card-body">${note.text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}</div>
      </div>`).join('') || `<div class="empty-state">No notes yet.<br><small>Select a lecture from the Lectures page and click the note icon to add a note.</small></div>`;

    document.getElementById('page-notes').innerHTML = `
      <div class="page-header">
        <div class="page-header-left">
          <h1>Notes & Doubts</h1>
          <p class="page-subtitle">All your lecture notes, doubts and key points in one place</p>
        </div>
        <button class="btn btn-primary" onclick="Actions.addNoteQuick()">+ Add Note</button>
      </div>

      <div class="notes-stats-row">
        <div class="notes-stat notes-stat-note"><span class="notes-stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span><span class="notes-stat-val">${totalNotes}</span><span class="notes-stat-label">Notes</span></div>
        <div class="notes-stat notes-stat-doubt"><span class="notes-stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span><span class="notes-stat-val">${totalDoubts}</span><span class="notes-stat-label">Doubts</span></div>
        <div class="notes-stat notes-stat-key"><span class="notes-stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span><span class="notes-stat-val">${totalKey}</span><span class="notes-stat-label">Key Points</span></div>
      </div>

      <div class="table-controls" style="margin-bottom:16px">
        <div class="search-wrap">
          <span class="search-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
          <input id="notes-search" class="input-search" placeholder="Search notes…" value="${fSearch}" oninput="Pages.notes()">
        </div>
        <select id="notes-filter-sub"  class="input-select" onchange="Pages.notes()"><option value="">All Subjects</option>${subOpts}</select>
        <select id="notes-filter-type" class="input-select" onchange="Pages.notes()">
          <option value="">All Types</option>
          <option value="note">Notes</option>
          <option value="doubt">Doubts</option>
          <option value="key">Key Points</option>
        </select>
      </div>

      <div class="notes-list">${noteCards}</div>`;

    // Restore filter values after re-render
    if (fSub)  document.getElementById('notes-filter-sub').value  = fSub;
    if (fType) document.getElementById('notes-filter-type').value = fType;
  }
};

// =============================================
// ACTIONS
// =============================================
const Actions = {

  completeSession(lectureId) {
    Scheduler.completeSession(lectureId);
    Toast.show('Session complete!');
    UI.render();
  },

  showPartial(lectureId) {
    const lec = Store.data.lectures.find(l => l.id === lectureId);
    if (!lec) return;
    const today = Time.today();
    const prevStudied = lec.todayDate === today ? lec.todayStudied : 0;
    Modal.show(`
      <div class="modal-header">Log Today's Progress</div>
      <div class="modal-body">
        <div class="modal-info-row">
          <strong>${lec.name}</strong>
          <span class="modal-remain">Total remaining: ${Time.toHMS(lec.remaining)}</span>
          ${prevStudied > 0 ? `<span class="modal-prev">Previously logged today: ${Time.toDisplay(prevStudied)}</span>` : ''}
        </div>
        <label class="field-label">How much did you study today in total? (hh:mm:ss)</label>
        <input id="partial-time" class="input-field" type="text"
          placeholder="01:30:00" value="${prevStudied > 0 ? Time.toHMS(prevStudied) : ''}" autocomplete="off">
        <p class="field-hint">
          Enter your <strong>total</strong> study time for today.
          If you studied before, this replaces — not adds to — the previous entry.
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Save</button>
      </div>
    `, () => {
      const secs = Time.toSeconds(document.getElementById('partial-time').value.trim());
      if (secs <= 0) { Toast.show('Enter a valid time like 01:30:00', 'error'); return false; }
      const ok = Scheduler.partialComplete(lectureId, secs);
      if (ok === false) {
        Toast.show("This lecture is already marked Done for today. You can't log more time.", 'error');
        return false; // keep modal open
      }
      Toast.show(`${Time.toDisplay(secs)} logged!`);
      UI.render();
    });
  },

  markLecComplete(lectureId) {
    const lec = Store.data.lectures.find(l => l.id === lectureId);
    if (!lec) return;
    const today = Time.today();
    lec.status = 'complete'; lec.remaining = 0; lec.completedOn = today;

    // Always track todayStudied so forceRebuildToday can re-inject a "done" entry
    // even when there is no schedule entry today (e.g. marked from Lectures page).
    if (!lec.todayStudied || lec.todayDate !== today) {
      lec.todayDate = today;
      lec.todayStudied = lec.duration; // whole lecture counts as studied
    }

    // Also update today's schedule entry so Today's Plan shows it as Done immediately.
    const entry = (Store.data.schedule[today] || []).find(e => e.lectureId === lectureId);
    if (entry && entry.status !== 'done') {
      entry.completedSeconds = entry.plannedSeconds;
      entry.status = 'done';
    }
    Scheduler.buildSchedule();
    Store.save();
    Toast.show('Marked complete!');
    UI.render();
  },

  deleteLecture(lectureId) {
    const lec = Store.data.lectures.find(l => l.id === lectureId);
    if (!lec) return;
    Modal.show(`
      <div class="modal-header">Delete Lecture</div>
      <div class="modal-body"><p>Delete <strong>"${lec.name}"</strong>? Cannot be undone.</p></div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-danger">Delete</button>
      </div>
    `, () => {
      Store.data.lectures = Store.data.lectures.filter(l => l.id !== lectureId);
      // Clean orphaned schedule entries so heatmap/analytics don't show "—" names
      Object.keys(Store.data.schedule).forEach(date => {
        Store.data.schedule[date] = (Store.data.schedule[date] || [])
          .filter(e => e.lectureId !== lectureId);
        if (Store.data.schedule[date].length === 0) delete Store.data.schedule[date];
      });
      // Clean orphaned notes
      delete Store.data.notes[lectureId];
      Scheduler.buildSchedule(); Store.save(); Toast.show('Deleted'); UI.render();
    });
  },

  addSubject() {
    Modal.show(`
      <div class="modal-header">Add Subject</div>
      <div class="modal-body">
        <label class="field-label">Code (e.g. SFM)</label>
        <input id="s-code" class="input-field" placeholder="SFM" autocomplete="off">
        <label class="field-label">Full Name</label>
        <input id="s-full" class="input-field" placeholder="Strategic Financial Management">
        <label class="field-label">Deadline</label>
        <input id="s-dl" class="input-field" type="date">
        <label class="field-label">Daily Study Hours</label>
        <input id="s-hrs" class="input-field" type="number" value="2" min="0.5" max="24" step="0.5">
        <label class="field-label">Priority (1 = highest)</label>
        <input id="s-pri" class="input-field" type="number" value="${Store.data.subjects.length+1}" min="1">
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Add</button>
      </div>
    `, () => {
      const code = document.getElementById('s-code').value.trim().toUpperCase();
      if (!code) { Toast.show('Code required', 'error'); return false; }
      Store.data.subjects.push({
        id: `sub_${Date.now()}`, name: code,
        fullName: document.getElementById('s-full').value.trim() || code,
        deadline: document.getElementById('s-dl').value, examDate: '',
        dailyHours: parseFloat(document.getElementById('s-hrs').value) || 2,
        priority: parseInt(document.getElementById('s-pri').value) || Store.data.subjects.length,
        color: COLORS[Store.data.subjects.length % COLORS.length],
        createdAt: Time.today()
      });
      Scheduler.buildSchedule(); Store.save(); Toast.show('Subject added!'); UI.render();
    });
  },

  editSubject(subId) {
    const sub = Store.data.subjects.find(s => s.id === subId);
    if (!sub) return;
    Modal.show(`
      <div class="modal-header">Edit: ${sub.name}</div>
      <div class="modal-body">
        <label class="field-label">Full Name</label>
        <input id="es-full" class="input-field" value="${sub.fullName||sub.name}">
        <label class="field-label">Deadline</label>
        <input id="es-dl" class="input-field" type="date" value="${sub.deadline||''}">
        <label class="field-label">Exam Date</label>
        <input id="es-exam" class="input-field" type="date" value="${sub.examDate||''}">
        <label class="field-label">Daily Hours</label>
        <input id="es-hrs" class="input-field" type="number" value="${sub.dailyHours}" min="0.5" max="24" step="0.5">
        <label class="field-label">Priority</label>
        <input id="es-pri" class="input-field" type="number" value="${sub.priority}" min="1">
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Save</button>
      </div>
    `, () => {
      sub.fullName   = document.getElementById('es-full').value.trim() || sub.fullName;
      sub.deadline   = document.getElementById('es-dl').value;
      sub.examDate   = document.getElementById('es-exam').value;
      sub.dailyHours = parseFloat(document.getElementById('es-hrs').value) || sub.dailyHours;
      sub.priority   = parseInt(document.getElementById('es-pri').value)   || sub.priority;
      // forceRebuildToday=true so today's plan reflects new daily hours immediately
      Scheduler.buildSchedule(true); Store.save(); Toast.show('Updated!'); UI.render();
    });
  },

  deleteSubject(subId) {
    Modal.show(`
      <div class="modal-header">Delete Subject</div>
      <div class="modal-body"><p>Also deletes all lectures and notes under this subject. Sure?</p></div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-danger">Delete</button>
      </div>
    `, () => {
      // Collect lecture IDs before removing them
      const deletedLecIds = new Set(
        Store.data.lectures.filter(l => l.subjectId === subId).map(l => l.id)
      );
      Store.data.subjects = Store.data.subjects.filter(s => s.id !== subId);
      Store.data.lectures = Store.data.lectures.filter(l => l.subjectId !== subId);

      // Bug 3 fix: remove past schedule entries for deleted lectures so analytics
      // don't count their completed time after the subject is gone
      Object.keys(Store.data.schedule).forEach(date => {
        Store.data.schedule[date] = (Store.data.schedule[date] || [])
          .filter(e => !deletedLecIds.has(e.lectureId));
        if (Store.data.schedule[date].length === 0) delete Store.data.schedule[date];
      });

      // Bug 4 fix: remove orphaned notes for deleted lectures
      deletedLecIds.forEach(id => { delete Store.data.notes[id]; });

      Scheduler.buildSchedule(); Store.save(); Toast.show('Subject deleted'); UI.render();
    });
  },

  addLecture() {
    const subOpts = Store.data.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    Modal.show(`
      <div class="modal-header">Add Lecture</div>
      <div class="modal-body">
        <label class="field-label">Subject</label>
        <select id="al-sub" class="input-field">${subOpts}</select>
        <label class="field-label">Lecture Number</label>
        <input id="al-num"  class="input-field" placeholder="e.g. 61">
        <label class="field-label">Name</label>
        <input id="al-name" class="input-field" placeholder="Lecture name">
        <label class="field-label">Duration (hh:mm:ss)</label>
        <input id="al-dur"  class="input-field" placeholder="01:30:00">
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Add</button>
      </div>
    `, () => {
      const subjectId = document.getElementById('al-sub').value;
      const name = document.getElementById('al-name').value.trim();
      const dur  = Time.toSeconds(document.getElementById('al-dur').value.trim());
      const num  = document.getElementById('al-num').value.trim();
      if (!name) { Toast.show('Name required', 'error'); return false; }
      if (dur <= 0) { Toast.show('Enter duration like 01:30:00', 'error'); return false; }
      const subLecs = Store.data.lectures.filter(l => l.subjectId === subjectId);
      const maxSeq = subLecs.length ? Math.max(...subLecs.map(l => l.sequence)) : 0;
      Store.data.lectures.push({
        id: `lec_${Date.now()}`, subjectId, sequence: maxSeq+1,
        lectureNum: num || String(maxSeq+1), name,
        duration: dur, remaining: dur, status: 'pending', completedOn: null,
        todayStudied: 0, todayDate: null,
      });
      Scheduler.buildSchedule(); Store.save(); Toast.show('Lecture added!'); UI.render();
    });
  },

  // FIX: editLecture always shows remaining field, not just when currently partial
  editLecture(lectureId) {
    const lec = Store.data.lectures.find(l => l.id === lectureId);
    if (!lec) return;
    Modal.show(`
      <div class="modal-header">Edit Lecture</div>
      <div class="modal-body">
        <label class="field-label">Name</label>
        <input id="el-name" class="input-field" value="${lec.name}">
        <label class="field-label">Duration (hh:mm:ss)</label>
        <input id="el-dur"  class="input-field" value="${Time.toHMS(lec.duration)}">
        <label class="field-label">Remaining (hh:mm:ss)</label>
        <input id="el-rem"  class="input-field" value="${Time.toHMS(lec.remaining)}">
        <p class="field-hint">Set remaining = duration to reset all progress, or 0 to mark fully complete.</p>
        <label class="field-label">Status</label>
        <select id="el-status" class="input-field">
          <option value="pending"  ${lec.status==='pending' ?'selected':''}>Pending</option>
          <option value="partial"  ${lec.status==='partial' ?'selected':''}>Partial</option>
          <option value="complete" ${lec.status==='complete'?'selected':''}>Complete</option>
        </select>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Save</button>
      </div>
    `, () => {
      const name   = document.getElementById('el-name').value.trim();
      const newDur = Time.toSeconds(document.getElementById('el-dur').value);
      const newRem = Time.toSeconds(document.getElementById('el-rem').value);
      const status = document.getElementById('el-status').value;
      if (!name)    { Toast.show('Name required', 'error'); return false; }
      if (newDur <= 0) { Toast.show('Invalid duration', 'error'); return false; }
      lec.name = name;
      lec.duration = newDur;
      if (status === 'complete') {
        lec.remaining = 0; lec.status = 'complete';
        lec.completedOn = lec.completedOn || Time.today();
      } else if (status === 'pending') {
        lec.remaining = newDur; lec.status = 'pending'; lec.completedOn = null;
        lec.todayStudied = 0; lec.todayDate = null;
      } else {
        lec.remaining = Math.min(Math.max(0, newRem), newDur);
        lec.status = lec.remaining === 0 ? 'complete' : 'partial';
        if (lec.status === 'complete') lec.completedOn = lec.completedOn || Time.today();
        else lec.completedOn = null; // clear stale completedOn when back to partial
      }
      Scheduler.buildSchedule(); Store.save(); Toast.show('Updated!'); UI.render();
    });
  },

  importPDF() {
    const subOpts = Store.data.subjects.map(s =>
      `<option value="${s.id}">${s.name} — ${s.fullName||s.name}</option>`).join('');

    Modal.show(`
      <div class="modal-header">Import Lectures from PDF / Text</div>
      <div class="modal-body">
        <label class="field-label">Assign to Subject</label>
        <select id="imp-sub" class="input-field">${subOpts}</select>
        <div class="imp-tabs">
          <button class="imp-tab active" id="tab-pdf" onclick="Actions._impSwitchTab('pdf')">Upload PDF</button>
          <button class="imp-tab" id="tab-txt" onclick="Actions._impSwitchTab('txt')">Paste Text</button>
        </div>
        <div id="imp-pdf-panel">
          <div class="imp-dropzone" id="imp-drop" onclick="document.getElementById('imp-file').click()">
            <div class="imp-drop-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
            <div class="imp-drop-text">Click to choose a PDF<br><small>or drag and drop here</small></div>
            <input type="file" id="imp-file" accept=".pdf" style="display:none"
              onchange="Actions._impLoadFile(this.files[0])">
          </div>
        </div>
        <div id="imp-txt-panel" style="display:none">
          <label class="field-label">Paste your schedule text</label>
          <textarea id="imp-textarea" class="input-field imp-textarea"
            placeholder="01 Lecture Name 02:30:00&#10;02 Another Lecture 01:45:00&#10;..."></textarea>
          <button class="btn btn-outline btn-sm" onclick="Actions._impParseText()">Parse →</button>
        </div>
        <div id="imp-status" class="imp-status"></div>
        <div id="imp-preview"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary" id="imp-confirm" style="display:none">Import Selected</button>
      </div>
    `, () => {
      return Actions._impConfirm();
    });

    // Drag-and-drop support
    const drop = document.getElementById('imp-drop');
    if (drop) {
      drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('imp-drop-hover'); });
      drop.addEventListener('dragleave', () => drop.classList.remove('imp-drop-hover'));
      drop.addEventListener('drop', e => {
        e.preventDefault(); drop.classList.remove('imp-drop-hover');
        const f = e.dataTransfer.files[0];
        if (f?.type === 'application/pdf') Actions._impLoadFile(f);
        else Toast.show('Please drop a PDF file', 'error');
      });
    }

    // Store parsed rows on the Actions object for _impConfirm
    Actions._impRows = [];
  },

  _impSwitchTab(tab) {
    document.getElementById('imp-pdf-panel').style.display = tab === 'pdf' ? '' : 'none';
    document.getElementById('imp-txt-panel').style.display = tab === 'txt' ? '' : 'none';
    document.getElementById('tab-pdf').classList.toggle('active', tab === 'pdf');
    document.getElementById('tab-txt').classList.toggle('active', tab === 'txt');
  },

  async _impLoadFile(file) {
    if (!file) return;
    const status = document.getElementById('imp-status');
    const drop   = document.getElementById('imp-drop');
    drop.classList.add('imp-drop-loading');
    status.innerHTML = '<span class="imp-loading"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Reading PDF…</span>';
    document.getElementById('imp-confirm').style.display = 'none';

    const loaded = await PDFImport.loadLib();
    if (!loaded) {
      status.innerHTML = '<span class="imp-error"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Could not load PDF library. Try the "Paste Text" tab.</span>';
      drop.classList.remove('imp-drop-loading');
      return;
    }
    try {
      const text = await PDFImport.extractText(file);
      drop.querySelector('.imp-drop-text').innerHTML =
        `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <strong>${file.name}</strong><br><small>Click to change</small>`;
      drop.classList.remove('imp-drop-loading');
      Actions._impShowPreview(PDFImport.parse(text), status);
    } catch(e) {
      status.innerHTML = '<span class="imp-error"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Could not read PDF. Try "Paste Text" tab.</span>';
      drop.classList.remove('imp-drop-loading');
    }
  },

  _impParseText() {
    const text   = document.getElementById('imp-textarea')?.value || '';
    const status = document.getElementById('imp-status');
    Actions._impShowPreview(PDFImport.parse(text), status);
  },

  _impShowPreview(rows, statusEl) {
    Actions._impRows = rows;
    const preview = document.getElementById('imp-preview');
    const confirm = document.getElementById('imp-confirm');

    if (!rows.length) {
      statusEl.innerHTML = '<span class="imp-error"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> No lectures detected. Check format: "01 Topic Name 02:30:00"</span>';
      preview.innerHTML = '';
      confirm.style.display = 'none';
      return;
    }

    statusEl.innerHTML = `<span class="imp-ok"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${rows.length} lectures detected. Review and uncheck any to skip.</span>`;
    confirm.style.display = '';
    confirm.textContent   = `Import ${rows.length} Selected`;

    document.getElementById('modal-content')?.classList.add('modal-wide');
    preview.innerHTML = `
      <div class="imp-preview-wrap">
        <table class="imp-table">
          <thead><tr>
            <th><input type="checkbox" id="imp-chk-all" checked onchange="Actions._impToggleAll(this.checked)"></th>
            <th>#</th><th>Name</th><th>Duration</th>
          </tr></thead>
          <tbody>
            ${rows.map((r,i) => `<tr id="imp-row-${i}">
              <td><input type="checkbox" class="imp-chk" data-i="${i}" checked
                onchange="Actions._impRowToggle(${i},this.checked)"></td>
              <td class="imp-td-num">${r.num}</td>
              <td><input class="imp-cell" value="${r.name.replace(/"/g,'&quot;')}"
                oninput="Actions._impRows[${i}].name=this.value"></td>
              <td><input class="imp-cell imp-cell-dur" value="${r.durStr}"
                oninput="Actions._impRows[${i}].durStr=this.value"></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
  },

  _impToggleAll(checked) {
    document.querySelectorAll('.imp-chk').forEach(c => {
      c.checked = checked;
      const i = parseInt(c.dataset.i);
      Actions._impRows[i].selected = checked;
    });
    Actions._impUpdateConfirmCount();
  },

  _impRowToggle(i, checked) {
    Actions._impRows[i].selected = checked;
    Actions._impUpdateConfirmCount();
  },

  _impUpdateConfirmCount() {
    const count = Actions._impRows.filter(r => r.selected).length;
    const btn   = document.getElementById('imp-confirm');
    if (btn) btn.textContent = `Import ${count} Selected`;
  },

  _impConfirm() {
    const subjectId = document.getElementById('imp-sub')?.value;
    if (!subjectId) { Toast.show('Select a subject', 'error'); return false; }

    const toImport = (Actions._impRows || []).filter(r => r.selected);
    if (!toImport.length) { Toast.show('No lectures selected', 'error'); return false; }

    const subLecs = Store.data.lectures.filter(l => l.subjectId === subjectId);
    let maxSeq    = subLecs.length ? Math.max(...subLecs.map(l => l.sequence)) : 0;

    toImport.forEach(r => {
      maxSeq++;
      const dur = Time.toSeconds(r.durStr) || r.durSecs;
      if (dur <= 0) return;
      Store.data.lectures.push({
        id: `lec_${Date.now()}_${maxSeq}`, subjectId, sequence: maxSeq,
        lectureNum: r.num || String(maxSeq), name: r.name,
        duration: dur, remaining: dur, status: 'pending', completedOn: null,
        todayStudied: 0, todayDate: null,
      });
    });

    Scheduler.buildSchedule();
    Store.save();
    Toast.show(`Imported ${toImport.length} lectures!`);
    UI.render();
    // return true → Modal.show closes the modal
  },

  setSetting(key, value) {
    const v = (key === 'startDate' || key === 'bufferDayOfWeek') ? value : parseFloat(value);
    if (key !== 'bufferDayOfWeek' && key !== 'dailyStudyHours' && v !== 0 && !v) return;  // guard NaN
    Store.data.settings[key] = key === 'bufferDayOfWeek' ? parseInt(value) : v;
    // NOTE: We do NOT auto-sync subject dailyHours here any more.
    // _calcCapacity now uses sub.dailyHours for every subject (single or multi).
    // Global dailyStudyHours is only a fallback for subjects that never had
    // their hours configured. Overwriting sub.dailyHours here would destroy
    // a manually-set subject-specific value (e.g. FR=2.5h, global=8h).
    Scheduler.buildSchedule(true);
    Store.save(); Toast.show('Saved!'); UI.render();
  },

  setSubjectProp(subId, key, value) {
    const sub = Store.data.subjects.find(s => s.id === subId);
    if (!sub) return;
    sub[key] = value;
    let toastMsg = 'Updated!';
    // When a subject's daily hours change, auto-bump the global total if the
    // sum of subject hours now exceeds it.
    if (key === 'dailyHours') {
      const sumHours = Store.data.subjects.reduce((s, su) => s + (su.dailyHours || 0), 0);
      if (sumHours > Store.data.settings.dailyStudyHours) {
        Store.data.settings.dailyStudyHours = sumHours;
        toastMsg = `Daily total auto-updated to ${sumHours}h`;
      }
    }
    // forceRebuildToday=true: today's plan must reflect the new hours immediately
    Scheduler.buildSchedule(true);
    Store.save(); Toast.show(toastMsg); UI.render();
  },

  handleBacklog() {
    const stats = Scheduler.getStats();
    Modal.show(`
      <div class="modal-header">Handle Backlog</div>
      <div class="modal-body">
        <div class="modal-info-row">
          You have <strong>${Time.toDisplay(stats.backlogSecs)}</strong> of backlog from missed sessions.
        </div>
        <div class="backlog-options">
          <label class="backlog-opt"><input type="radio" name="bl" value="extend" checked>
            <span>Extend all deadlines by 2 weeks</span></label>
          <label class="backlog-opt"><input type="radio" name="bl" value="increase">
            <span>Increase daily hours by 1h (${Store.data.settings.dailyStudyHours}h → ${Math.min(24, Store.data.settings.dailyStudyHours+1)}h)</span></label>
          <label class="backlog-opt"><input type="radio" name="bl" value="keep">
            <span>Acknowledge &amp; reschedule forward (keep current hours)</span></label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Apply</button>
      </div>
    `, () => {
      const choice = document.querySelector('input[name="bl"]:checked')?.value;
      const today  = Time.today();

      if (choice === 'extend') {
        Store.data.subjects.forEach(s => { if (s.deadline) s.deadline = Time.addDays(s.deadline, 14); });
        Toast.show('Deadlines extended 2 weeks — backlog cleared');
      } else if (choice === 'increase') {
        const nh = Math.min(24, Store.data.settings.dailyStudyHours + 1);
        Store.data.settings.dailyStudyHours = nh;
        // Update every subject's dailyHours, not just subjects[0]
        Store.data.subjects.forEach(s => { s.dailyHours = Math.min(24, (s.dailyHours || nh) + 1); });
        Toast.show('Daily hours increased — backlog cleared');
      } else {
        Toast.show('Backlog acknowledged — rescheduled forward');
      }

      // Core fix: buildSchedule always preserves past entries, so backlogSecs never
      // drops to 0 after any choice. Erase past entries for incomplete lectures so
      // the backlog counter resets. Completed lectures' entries are kept (heatmap history).
      const incompleteIds = new Set(
        Store.data.lectures.filter(l => l.status !== 'complete').map(l => l.id)
      );
      Object.keys(Store.data.schedule).forEach(date => {
        if (date >= today) return;
        Store.data.schedule[date] = (Store.data.schedule[date] || [])
          .filter(e => !incompleteIds.has(e.lectureId));
        if (Store.data.schedule[date].length === 0) delete Store.data.schedule[date];
      });

      Scheduler.buildSchedule(true);
      Store.save();
      UI.render();
    });
  },

  resetApp() {
    Modal.show(`
      <div class="modal-header">Reset Everything</div>
      <div class="modal-body"><p>Permanently deletes all data and progress. This cannot be undone.</p></div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-danger">Yes, Reset</button>
      </div>
    `, () => { localStorage.removeItem(STORAGE_KEY); location.reload(); });
  },

  setTheme(theme) {
    const isDark = theme === 'dark';
    // Apply transitioning class so colours animate smoothly, but ONLY during toggle
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    try { localStorage.setItem('studyplan_theme', theme); } catch(e) {}
    const lbl = document.querySelector('.theme-btn-label');
    if (lbl) lbl.textContent = isDark ? 'Light mode' : 'Dark mode';
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 300);
    // Notify Android host so it can sync status/nav bar icon colours
    try { if (window.AndroidBridge) AndroidBridge.onThemeChanged(theme); } catch(e) {}
    UI.render();
  },

  // ─── NOTES ACTIONS ─────────────────────────────────────────────
  addNoteToLecture(lectureId) {
    const lec  = Store.data.lectures.find(l => l.id === lectureId);
    const subj = Store.data.subjects.find(s => s.id === lec?.subjectId);
    if (!lec) return;
    Modal.show(`
      <div class="modal-header">Add Note — ${lec.name}</div>
      <div class="modal-body">
        <label class="field-label">Type</label>
        <select id="note-type" class="input-field">
          <option value="note">Note</option>
          <option value="doubt">Doubt</option>
          <option value="key">Key Point</option>
        </select>
        <label class="field-label" style="margin-top:12px">Content</label>
        <textarea id="note-text" class="input-field imp-textarea" rows="5"
          placeholder="Write your note, doubt or key point here…" style="min-height:120px"></textarea>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Save Note</button>
      </div>
    `, () => {
      const text = document.getElementById('note-text').value.trim();
      const type = document.getElementById('note-type').value;
      if (!text) { Toast.show('Note cannot be empty', 'error'); return false; }
      if (!Store.data.notes) Store.data.notes = {};
      if (!Store.data.notes[lectureId]) Store.data.notes[lectureId] = [];
      Store.data.notes[lectureId].push({
        id: `note_${Date.now()}`, text, type, createdAt: Time.today()
      });
      Store.save();
      Toast.show('Note saved!');
      UI.render();
    });
    // Focus textarea after modal opens
    setTimeout(() => document.getElementById('note-text')?.focus(), 100);
  },

  addNoteQuick() {
    const { lectures, subjects } = Store.data;
    if (!lectures.length) { Toast.show('Add lectures first', 'error'); return; }
    const lecOpts = lectures.map(l => {
      const s = subjects.find(s => s.id === l.subjectId);
      return `<option value="${l.id}">[${s?.name||'?'}] ${l.name}</option>`;
    }).join('');
    Modal.show(`
      <div class="modal-header">Add Note</div>
      <div class="modal-body">
        <label class="field-label">Lecture</label>
        <select id="note-lec" class="input-field">${lecOpts}</select>
        <label class="field-label" style="margin-top:12px">Type</label>
        <select id="note-type" class="input-field">
          <option value="note">Note</option>
          <option value="doubt">Doubt</option>
          <option value="key">Key Point</option>
        </select>
        <label class="field-label" style="margin-top:12px">Content</label>
        <textarea id="note-text" class="input-field imp-textarea" rows="5"
          placeholder="Write your note, doubt or key point…" style="min-height:120px"></textarea>
      </div>
      <div class="modal-footer">
        <button class="btn btn-cancel btn-outline">Cancel</button>
        <button class="btn btn-confirm btn-primary">Save Note</button>
      </div>
    `, () => {
      const lectureId = document.getElementById('note-lec').value;
      const text      = document.getElementById('note-text').value.trim();
      const type      = document.getElementById('note-type').value;
      if (!text) { Toast.show('Note cannot be empty', 'error'); return false; }
      if (!Store.data.notes) Store.data.notes = {};
      if (!Store.data.notes[lectureId]) Store.data.notes[lectureId] = [];
      Store.data.notes[lectureId].push({
        id: `note_${Date.now()}`, text, type, createdAt: Time.today()
      });
      Store.save();
      Toast.show('Note saved!');
      UI.render();
    });
  },

  deleteNote(lectureId, noteId) {
    if (!Store.data.notes?.[lectureId]) return;
    Store.data.notes[lectureId] = Store.data.notes[lectureId].filter(n => n.id !== noteId);
    Store.save();
    Toast.show('Note deleted');
    UI.render();
  }
};

// =============================================
// HEATMAP UI HELPER
// =============================================
const HeatmapUI = {
  showDay(date) {
    const { schedule, lectures, subjects } = Store.data;
    const entries = schedule[date] || [];
    const popup   = document.getElementById('hm-day-popup');
    if (!popup) return;

    if (!entries.length) {
      popup.style.display = 'none';
      return;
    }

    const rows = entries.map(e => {
      const lec  = lectures.find(l => l.id === e.lectureId);
      const subj = subjects.find(s => s.id === e.subjectId);
      const studied = e.completedSeconds || 0;
      return `<div class="hm-popup-row">
        <span class="hm-popup-dot" style="background:${subj?.color||'#888'}"></span>
        <span class="hm-popup-lec">${lec?.name || '—'}</span>
        <span class="hm-popup-time">${Time.toDisplay(studied)}</span>
      </div>`;
    }).join('');

    const total = entries.reduce((s, e) => s + (e.completedSeconds || 0), 0);
    popup.innerHTML = `
      <div class="hm-popup-header">
        <strong>${Time.formatDate(date)}</strong>
        <button class="hm-popup-close" onclick="this.closest('.hm-day-popup').style.display='none'"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      ${rows}
      <div class="hm-popup-total">Total: ${Time.toDisplay(total)}</div>`;
    popup.style.display = 'block';
  }
};

// =============================================
// INIT
// =============================================
function initApp() {
  // ── Restore saved theme before first render ─────────────────────
  try {
    const savedTheme = localStorage.getItem('studyplan_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Update sidebar toggle label
    const lbl = document.querySelector('.theme-btn-label');
    if (lbl) lbl.textContent = savedTheme === 'dark' ? 'Light mode' : 'Dark mode';
  } catch(e) {}

  const existing = Store.load();
  if (!existing?.meta?.initialized) {
    Store.init();
  } else {
    // Migrate lectures: add todayStudied/todayDate if missing
    Store.data.lectures.forEach(l => {
      if (l.remaining == null) l.remaining = l.duration;
      if (!l.status) l.status = 'pending';
      if (!l.hasOwnProperty('todayStudied')) { l.todayStudied = 0; l.todayDate = null; }
    });
    // Migrate subjects: add dailyHours if missing (fall back to global setting)
    const globalHours = Store.data.settings.dailyStudyHours || 6;
    Store.data.subjects.forEach(s => {
      if (!s.hasOwnProperty('dailyHours') || s.dailyHours == null) {
        s.dailyHours = globalHours;
      }
    });
    // Migrate: add notes store if missing
    if (!Store.data.notes) Store.data.notes = {};
  }

  Scheduler.buildSchedule();
  Store.save();

  // Nav clicks — also close mobile sidebar
  document.querySelectorAll('.nav-item').forEach(el =>
    el.addEventListener('click', () => {
      UI.navigate(el.dataset.page);
      // Close mobile sidebar on nav
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('mobile-overlay').classList.remove('active');
    }));

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sidebar      = document.getElementById('sidebar');
  const overlay      = document.getElementById('mobile-overlay');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  UI.navigate('dashboard');
}

document.addEventListener('DOMContentLoaded', initApp);


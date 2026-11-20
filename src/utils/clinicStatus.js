export const CLINIC_SCHEDULE = {
  1: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  2: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  3: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  4: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  5: { open: 9 * 60, close: 18 * 60, openStr: '09:00', closeStr: '18:00' },
  6: { open: 9 * 60, close: 13 * 60, openStr: '09:00', closeStr: '13:00' },
  0: null,
};

const DAY_NAMES_FR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const DAY_NAMES_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export function getCasablancaNow() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Casablanca',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const map = {};
  for (const p of parts) {
    map[p.type] = p.value;
  }

  const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayOfWeek = weekdayMap[map.weekday] ?? now.getDay();
  const hour = parseInt(map.hour === '24' ? '0' : map.hour, 10);
  const minute = parseInt(map.minute, 10);
  const dateStr = `${map.year}-${map.month}-${map.day}`;

  return {
    dayOfWeek,
    hour,
    minute,
    totalMinutes: hour * 60 + minute,
    dateStr,
  };
}

export function getClinicStatus(lang = 'fr') {
  const { dayOfWeek, totalMinutes } = getCasablancaNow();
  const todayHours = CLINIC_SCHEDULE[dayOfWeek];

  if (todayHours && totalMinutes >= todayHours.open && totalMinutes < todayHours.close) {
    return {
      isOpen: true,
      badge: lang === 'ar' ? 'مفتوح الآن' : 'Ouvert',
      detail:
        lang === 'ar'
          ? `يغلق على الساعة ${todayHours.closeStr}`
          : `Ferme à ${todayHours.closeStr}`,
    };
  }

  if (todayHours && totalMinutes < todayHours.open) {
    return {
      isOpen: false,
      badge: lang === 'ar' ? 'مغلق حالياً' : 'Fermé',
      detail:
        lang === 'ar'
          ? `يفتح اليوم على الساعة ${todayHours.openStr}`
          : `Ouvre aujourd'hui à ${todayHours.openStr}`,
    };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (dayOfWeek + offset) % 7;
    const sched = CLINIC_SCHEDULE[nextDay];
    if (sched) {
      const dayLabel =
        offset === 1
          ? lang === 'ar'
            ? 'غداً'
            : 'demain'
          : lang === 'ar'
          ? DAY_NAMES_AR[nextDay]
          : DAY_NAMES_FR[nextDay];

      return {
        isOpen: false,
        badge: lang === 'ar' ? 'مغلق حالياً' : 'Fermé',
        detail:
          lang === 'ar'
            ? `يفتح ${dayLabel} على الساعة ${sched.openStr}`
            : `Ouvre ${dayLabel} à ${sched.openStr}`,
      };
    }
  }

  return {
    isOpen: false,
    badge: lang === 'ar' ? 'مغلق' : 'Fermé',
    detail: '',
  };
}

export function generateThirtyMinuteSlots(selectedDateStr) {
  if (!selectedDateStr) return [];

  const [y, m, d] = selectedDateStr.split('-').map(Number);
  if (!y || !m || !d) return [];

  const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dayOfWeek = dt.getUTCDay();
  const sched = CLINIC_SCHEDULE[dayOfWeek];
  if (!sched) return [];

  const nowCasa = getCasablancaNow();
  const isToday = selectedDateStr === nowCasa.dateStr;
  const isPastDate = selectedDateStr < nowCasa.dateStr;
  if (isPastDate) return [];

  const slots = [];
  for (let start = sched.open; start + 30 <= sched.close; start += 30) {
    const end = start + 30;
    const startH = String(Math.floor(start / 60)).padStart(2, '0');
    const startM = String(start % 60).padStart(2, '0');
    const endH = String(Math.floor(end / 60)).padStart(2, '0');
    const endM = String(end % 60).padStart(2, '0');
    const label = `${startH}:${startM} – ${endH}:${endM}`;

    const disabled = isToday && start <= nowCasa.totalMinutes + 15;
    slots.push({
      value: label,
      startMinutes: start,
      disabled,
    });
  }

  return slots;
}

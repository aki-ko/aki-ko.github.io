export const byYearDesc = (a,b) => String(b.year).localeCompare(String(a.year));
export const normalizeTag = value => String(value || '').trim().toLowerCase();

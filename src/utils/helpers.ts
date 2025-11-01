// src/utils/helpers.ts

/** ✅ Generate a random short ID (used in PhoneManager, Participants) */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/** ✅ Sort participants alphabetically by Bangla name */
export function sortParticipants(participants: any[]) {
  return participants.sort((a, b) => a.name.localeCompare(b.name, 'bn'));
}

/** ✅ Detect both 12-hour ("08:30 AM") and 24-hour ("20:30") formats
 *    and always return a formatted 12-hour AM/PM string for display. */
export function displayTime(timeString?: string): string {
  if (!timeString) return '';

  try {
    // Case 1: already has AM/PM
    if (/AM|PM/i.test(timeString)) {
      const date = new Date(`1970-01-01 ${timeString}`);
      if (isNaN(date.getTime())) return timeString;
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    // Case 2: 24-hour "HH:mm"
    if (/^\d{1,2}:\d{2}$/.test(timeString)) {
      const [h, m] = timeString.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m);
      return d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    // Case 3: ISO date/time like "1970-01-01T20:30:00"
    if (timeString.includes('T')) {
      const d = new Date(timeString);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    return timeString;
  } catch {
    return timeString;
  }
}

/** ✅ Convert 12 h ("08:00 AM") to 24 h ("08:00") */
export function to24Hour(timeString?: string): string {
  if (!timeString) return '';
  if (/^\d{2}:\d{2}$/.test(timeString)) return timeString;
  if (/AM|PM/i.test(timeString)) {
    const d = new Date(`1970-01-01 ${timeString}`);
    if (isNaN(d.getTime())) return '';
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  return timeString;
}

/** ✅ Convert Date object to 12 h AM/PM — replaces old formatTime12Hour() */
export function formatTime12Hour(date: Date | string): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
}

/** ✅ Aliases so old imports keep working */
export const formatTime12HourAlias = formatTime12Hour;
export const formatTime12HourAlias2 = displayTime;

/** ✅ Get current time in 12 h format */
export function getCurrentTime12h(): string {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/** ✅ Get current time in 24 h format */
export function getCurrentTime24h(): string {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

/** ✅ Default export for safety */
export default {
  generateId,
  sortParticipants,
  displayTime,
  to24Hour,
  formatTime12Hour,
  getCurrentTime12h,
  getCurrentTime24h,
};

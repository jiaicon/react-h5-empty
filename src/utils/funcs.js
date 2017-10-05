
/**
 * 2013-03-03 12:12:12 to 2013.03.03
 */
export function parseTimeStringToDateString(timeString) {
  const dateString = timeString.split(' ')[0];
  return dateString.replace(/-/g, '.');
}


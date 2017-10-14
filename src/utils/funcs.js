
/**
 * 2013-03-03 12:12:12 to 2013.03.03
 */
export function parseTimeStringToDateString(timeString) {
  const dateString = timeString.split(' ')[0];
  return dateString.replace(/-/g, '.');
}

export function isWindowReachBottom(threshold = 0) {
  if ((window.innerHeight + window.scrollY + threshold) >= document.body.scrollHeight) {
    return true;
  }
  return false;
}

export function parseDistance(distance) {
  let parsedDistance = distance / 1000;

  if (parsedDistance < 10) {
    parsedDistance = parsedDistance.toFixed(1);
  } else {
    parsedDistance = parseInt(parsedDistance, 10);
  }

  return `${parsedDistance}km`;
}

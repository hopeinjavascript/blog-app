export function extractStringFromEnd(str, searchStr = '/') {
  return str.slice(str.lastIndexOf(searchStr) + 1);
}

export function setLocalStorage(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value));
}

export function getLocalStorage(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}

export function removeLocalStorage(keyName) {
  return localStorage.removeItem(keyName);
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function getAccessToken() {
  return getLocalStorage('token')?.accessToken;
}

const monthsOfTheYear = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function getDateTimeDetails(dateTime = new Date().toString()) {
  // check whether there's a space before PM/pm/AM/am
  let d = !dateTime.match(/(\s)(PM|pm|AM|am)$/)
    ? dateTime.replace(/(PM|pm|AM|am)$/, ' $1')
    : dateTime;

  const date = new Date(d);
  let [dd, mm, mmm, yyyy, hours, minutes, seconds, milliseconds] = [
    (date.getDate() < 10 ? '0' : '') + date.getDate(),
    (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1),
    monthsOfTheYear[
      parseInt((date.getMonth() < 10 ? '0' : '') + date.getMonth())
    ],
    date.getFullYear() + '',
    (date.getHours() < 10 ? '0' : '') + date.getHours(),
    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
    (date.getSeconds() < 10 ? '0' : '') + date.getSeconds(),
    (date.getMilliseconds() < 10 ? '0' : '') + date.getMilliseconds(),
  ];

  return {
    d: `${dd} ${mmm} ${yyyy}, ${hours}:${minutes}:${seconds}`,
  };
}

export function formatArticleDate(date) {
  return getDateTimeDetails(date).d;
}

export function formatString(str) {
  return str.toLowerCase().trim().replace(/ /g, '-');
}

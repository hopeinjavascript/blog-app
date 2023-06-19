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

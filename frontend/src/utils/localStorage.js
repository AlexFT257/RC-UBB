export function getItem(key) {
    if (typeof window === 'undefined') {
      return null;
    }
  
    return window.localStorage.getItem(key);
  }
  
  export function setItem(key, value) {
    if (typeof window === 'undefined') {
      return;
    }
  
    window.localStorage.setItem(key, value);
  }
  
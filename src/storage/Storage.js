class Storage {
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    localStorage.setItem(key, value);
    setTimeout(() => localStorage.clear(), 3600000)
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();

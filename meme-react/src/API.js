// src/API.js

const fakeUser = { id: 1, name: 'Negin' };

const API = {
  login: async ({ username, password }) => {
    if (username === 'user' && password === 'pass') {
      return Promise.resolve(fakeUser);
    } else {
      return Promise.reject('Invalid credentials');
    }
  },

  logout: async () => {
    return Promise.resolve();
  }
};

export default API;

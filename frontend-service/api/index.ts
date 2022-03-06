export const BACKEND_HOST = 'https://mbtl.ru/api';

export const getUserByToken = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_HOST}/auth/sync`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).then((data) => data.json());

    return { result: res };
  } catch (err) {
    return { err: 'Возникла проблема' };

    return null;
  }
};

export const getArticles = async () => {
  try {
    const res = await fetch(`${BACKEND_HOST}/articles/news/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((data) => data.json());

    return { result: res };
  } catch (err) {
    return { err: 'Возникла проблема' };

    return null;
  }
};

export const getLatestArticle = async () => {
  try {
    const res = await fetch(`${BACKEND_HOST}/articles/latest/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((data) => data.json());

    return { result: res };
  } catch (err) {
    return { err: 'Возникла проблема' };

    return null;
  }
};

export const loginUser = async (nickname: string, password: string) => {
  try {
    const res = await fetch(`${BACKEND_HOST}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, password }),
    }).then((data) => data.json());

    if (!res.token) {
      return {
        err: res?.msg,
      };
    }

    return { result: res };
  } catch (err) {
    return { err: 'Возникла проблема' };
  }
};

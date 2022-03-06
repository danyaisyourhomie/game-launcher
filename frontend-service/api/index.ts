export const BACKEND_HOST = 'https://mbtl.ru:4000';

export const getUserByToken = async (token: string) => {
  try {
    const res = await fetch('http://localhost:4000/auth/sync', {
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

export const loginUser = async (nickname: string, password: string) => {
  try {
    const res = await fetch('http://localhost:4000/auth/login', {
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

export const BACKEND_HOST =
  process.env.NODE_ENV === 'development' ? 'https://mbtl.ru/api' : '/api';

export const TAPPER_HOST = 'https://servertap.mbtl.ru/v1';

export const TAPPER_KEY =
  'c107f2b62891d2ba25e4790909e6a308f0c27925c929b8be29d052f5f957ce93f180db8c0b058b4ba61d1a12bd1161e82bde2436e305da5079cf9d58ddfa0f14';

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

export const getUserSkin = async (uuid: string) => {
  try {
    const res = await fetch(
      `http://skin.ovesnovs.com/3d.php?user=${uuid}&aa=true`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    ).then((data) => data.json());

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

export const pingServer = async () => {
  try {
    const res = await fetch(`${TAPPER_HOST}/ping`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        key: TAPPER_KEY,
      },
    }).then((data) => data.json());

    return { result: res };
  } catch (err) {
    return { err: 'Возникла проблема' };
  }
};

export const getPlayers = async () => {
  try {
    const res = await fetch(`${TAPPER_HOST}/players`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        key: TAPPER_KEY,
      },
    }).then((data) => data.json());

    return { result: res };
  } catch (err) {
    return { err: 'Возникла проблема' };
  }
};

export const uploadSkin = async (formData) => {
  return fetch(`${BACKEND_HOST}/users/upload/skin`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const uploadCape = async (formData) => {
  return fetch(`${BACKEND_HOST}/users/upload/cape`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const getPlayersList = async () => {
  return fetch(`${TAPPER_HOST}/players/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      key: TAPPER_KEY,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const getPlayersOnlineList = async () => {
  return fetch(`${TAPPER_HOST}/players`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      key: TAPPER_KEY,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

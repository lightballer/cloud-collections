const baseUrl = `http://${process.env.REACT_APP_BACKEND_URL}`;

const login = async (email, password) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 201) {
    const { access_token } = await response.json();
    return access_token;
  }

  return null;
};

const getUserInfo = async (token) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const user = await response.json();
    return user;
  }

  return null;
};

const signUp = async (email, password) => {
  const response = await fetch(`${baseUrl}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 201) {
    const user = await response.json();
    return user;
  }

  return null;
};

export { login, getUserInfo, signUp };

const baseUrl = `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`;

const login = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 201) {
    const responseJSON = await response.json();
    // console.log({ responseJSON });
    return responseJSON;
  }

  return null;
};

const getUserInfo = async (token: string) => {
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

const signUp = async (email: string, password: string) => {
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

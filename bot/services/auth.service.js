const requestAuthToken = async (email, password) => {
  const response = await fetch(`http://${process.env.BACKEND_URL}/auth/login`, {
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

module.exports = { requestAuthToken };

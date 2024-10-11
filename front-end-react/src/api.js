const API_BASE_URL = "http://localhost:80";

export const register = async (user) => {
  const res = await fetch(`${API_BASE_URL}/user/register`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const data = await res.json();
  return data;
};

export const verifyCode = async (email, code) => {
  const res = await fetch(`${API_BASE_URL}/user/verify`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email, code }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const data = await res.json();
  return data;
};

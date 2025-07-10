export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

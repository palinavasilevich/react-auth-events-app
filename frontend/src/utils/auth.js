import { redirect } from "react-router-dom";

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  }
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function removeAuthToken() {
  localStorage.removeItem("token");
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  console.log(token);

  if (!token) {
    return redirect("/auth?mode=login");
  }

  return null;
}

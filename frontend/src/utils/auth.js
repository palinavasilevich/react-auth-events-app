import { redirect } from "react-router-dom";

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
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

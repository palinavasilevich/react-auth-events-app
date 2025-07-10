import { redirect } from "react-router-dom";
import { removeAuthToken } from "../../utils/auth";

export function logoutAction() {
  removeAuthToken();
  return redirect("/");
}

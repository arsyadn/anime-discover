export function isLoggedIn() {
  return !!localStorage.getItem("access_token");
}

export function logout() {
  localStorage.clear();
}

export const getUserId = () => localStorage.getItem("user_id");

export const DUMMY_CREDENTIALS = {
  username: "rsdavalbhai",
  password: "Afran@1234",
};

export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const setLogin = () => {
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("isLoggedIn");
};
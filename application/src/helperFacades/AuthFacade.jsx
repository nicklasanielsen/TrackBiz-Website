import tokenFacade from "./TokenFacade";
import apiFacade from "./ApiFacade";

function AuthFacade() {
  const login = (username, password) => {
    const body = {
      userName: username,
      password: password,
    };

    const request = apiFacade.prepareRequest("POST", body);

    return apiFacade.submitRequest("/auth/login", request).then((data) => {
      tokenFacade.setToken(data.token);
    });
  };

  const logout = () => {
    tokenFacade.removeToken();
  };

  const isLoggedIn = () => {
    let status = tokenFacade.isValid();
    return status;
  };

  const register = (username, password, firstname, lastname) => {
    const body = {
      userName: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
    };

    const request = apiFacade.prepareRequest("POST", body);

    return apiFacade.submitRequest("/auth/register", request).then((data) => {
      tokenFacade.setToken(data.token);
    });
  };

  const isAdmin = () => {
    let decodedToken = tokenFacade.getDecodedToken();

    if (decodedToken) {
      let roles = decodedToken.roles.split(",");
      return roles.includes("Admin");
    }

    return false;
  };

  return { login, logout, isLoggedIn, register, isAdmin };
}

const authFacade = AuthFacade();
export default authFacade;

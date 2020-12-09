import apiFacade from "./ApiFacade";
import tokenFacade from "./TokenFacade";

function UserFacade() {
  const lookup = (token) => {
    const request = apiFacade.prepareRequest("GET", null, token);
    return apiFacade.submitRequest("/user", request);
  };

  const deleteUser = () => {
    let token = tokenFacade.getToken();
    tokenFacade.removeToken(token);

    const request = apiFacade.prepareRequest("DELETE", null, token);
    return apiFacade.submitRequest("/user", request);
  };

  const editUser = (username, firstName, lastName, password) => {
    let token = tokenFacade.getToken();
    const body = {
      userName: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    const request = apiFacade.prepareRequest("PUT", body, token);
    return apiFacade.submitRequest("/user", request);
  };

  return { lookup, deleteUser, editUser };
}
const userFacade = UserFacade();
export default userFacade;

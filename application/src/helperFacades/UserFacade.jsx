import apiFacade from "./ApiFacade";

function UserFacade() {
  const lookup = (username, token) => {
    const request = apiFacade.prepareRequest("GET", null, token);
    return apiFacade.submitRequest("/info/user/" + username, request);
  };

  return { lookup };
}

const userFacade = UserFacade();
export default userFacade;

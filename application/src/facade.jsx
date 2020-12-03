import trackFacade from "./helperFacades/TrackFacade";
import courierFacade from "./helperFacades/CourierFacade";
import authFacade from "./helperFacades/AuthFacade";
import tokenFacade from "./helperFacades/TokenFacade";
import userFacade from "./helperFacades/UserFacade";

function Facade() {
  /** Auth related */

  const login = (username, password) => {
    return authFacade.login(username, password);
  };

  const logout = () => {
    authFacade.logout();
  };

  const isLoggedIn = () => {
    return authFacade.isLoggedIn();
  };

  const register = (username, password, firstname, lastname) => {
    return authFacade.register(username, password, firstname, lastname);
  };

  const isAdmin = () => {
    return authFacade.isAdmin();
  };

  /** Track related */

  const getTrackInfo = (courier, trackingNumber) => {
    return trackFacade.track(courier, trackingNumber);
  };

  const getStatusLogo = (status) => {
    return trackFacade.getStatusLogo(status);
  };

  /** Courier related */

  const getCouriers = () => {
    return courierFacade.getAll();
  };

  /** User related */
  const getProfile = () => {
    let decodedToken = tokenFacade.getDecodedToken();
    let username = decodedToken.username;

    return lookupUser(username);
  };

  const lookupUser = (username) => {
    let token = tokenFacade.getToken();
    return userFacade.lookup(username, token);
  };

  return {
    /**Auth related */
    login,
    logout,
    isLoggedIn,
    register,
    isAdmin,

    /** Courier related */
    getCouriers,

    /** Track related */
    getTrackInfo,
    getStatusLogo,

    /**User related */

    getProfile,
  };
}

const facade = Facade();
export default facade;

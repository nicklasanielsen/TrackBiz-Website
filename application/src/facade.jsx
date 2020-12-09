import trackFacade from "./helperFacades/TrackFacade";
import courierFacade from "./helperFacades/CourierFacade";
import authFacade from "./helperFacades/AuthFacade";
import tokenFacade from "./helperFacades/TokenFacade";
import userFacade from "./helperFacades/UserFacade";
import shipmentFacade from "./helperFacades/ShipmentFacade";

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
    let token = tokenFacade.getToken();
    return lookupUser(token);
  };

  const deleteUser = () => {
    return userFacade.deleteUser();
  };

  const editUser = (username, firstname, lastname, password) => {
    return userFacade.editUser(username, firstname, lastname, password);
  };

  const lookupUser = (username) => {
    let token = tokenFacade.getToken();
    return userFacade.lookup(username, token);
  };

  /** Shipment related */

  const getShipmentList = () => {
    let token = tokenFacade.getToken();
    return shipmentFacade.shipment(token);
  };

  const untrackShipment = (courier, trackingNumber) => {
    let token = tokenFacade.getToken();
    return shipmentFacade.untrackShipment(courier, trackingNumber, token);
  };

  const addShipment = (courier, trackingNumber) => {
    let token = tokenFacade.getToken();
    return shipmentFacade.addShipment(courier, trackingNumber, token);
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

    /** User related */
    getProfile,
    deleteUser,
    editUser,

    /** Shipment related */
    getShipmentList,
    untrackShipment,
    addShipment,
  };
}

const facade = Facade();
export default facade;

import trackFacade from "./helperFacades/TrackFacade";
import courierFacade from "./helperFacades/CourierFacade";

function Facade() {
  const getTrackInfo = (courier, trackingNumber) => {
    return trackFacade.track(courier, trackingNumber);
  };

  const getStatusLogo = (status) => {
    return trackFacade.getStatusLogo(status);
  };

  const getCouriers = () => {
    return courierFacade.getAll();
  };

  return {
    /** Courier related */
    getCouriers,

    /** Track related */
    getTrackInfo,
    getStatusLogo,
  };
}

const facade = Facade();
export default facade;

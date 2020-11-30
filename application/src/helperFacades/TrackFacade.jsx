import apiFacade from "./ApiFacade";
import {
  Attemptfail,
  AvailableForPickup,
  Delivered,
  Exception,
  Expired,
  InfoReceive,
  InTransit,
  OutForDelivery,
  Pending,
} from "../Icons/shippingIcons";

function TrackFacade() {
  const track = (courier, trackingNumber) => {
    const request = apiFacade.prepareRequest("GET", null, null);

    return apiFacade.submitRequest(
      "/tracking/" + courier + "/" + trackingNumber,
      request
    );
  };

  const getStatusLogo = (status) => {
    if (status === "Info Received") {
      return <InfoReceive width="100px" height="100px" />;
    } else if (status === "In Transit") {
      return <InTransit width="100px" height="100px" />;
    } else if (status === "Out for Delivery") {
      return <OutForDelivery width="100px" height="100px" />;
    } else if (status === "Failed Attempt") {
      return <Attemptfail width="100px" height="100px" />;
    } else if (status === "Delivered") {
      return <Delivered width="100px" height="100px" />;
    } else if (status === "Available for Pickup") {
      return <AvailableForPickup width="100px" height="100px" />;
    } else if (status === "Exception") {
      return <Exception width="100px" height="100px" />;
    } else if (status === "Expired") {
      return <Expired width="100px" height="100px" />;
    } else if (status === "Pending") {
      return <Pending width="100px" height="100px" />;
    }
  };

  return { track, getStatusLogo };
}

const trackFacade = TrackFacade();
export default trackFacade;

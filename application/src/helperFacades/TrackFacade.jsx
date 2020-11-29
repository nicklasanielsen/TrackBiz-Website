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
      return <InfoReceive />;
    } else if (status === "In Transit") {
      return <InTransit />;
    } else if (status === "Out for Delivery") {
      return <OutForDelivery />;
    } else if (status === "Failed Attempt") {
      return <Attemptfail />;
    } else if (status === "Delivered") {
      return <Delivered />;
    } else if (status === "Available for Pickup") {
      return <AvailableForPickup />;
    } else if (status === "Exception") {
      return <Exception />;
    } else if (status === "Expired") {
      return <Expired />;
    } else if (status === "Pending") {
      return <Pending />;
    }
  };

  return { track, getStatusLogo };
}

const trackFacade = TrackFacade();
export default trackFacade;

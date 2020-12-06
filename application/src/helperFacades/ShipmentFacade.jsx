import apiFacade from "./ApiFacade";

function ShipmentFacade() {
  const shipment = (token) => {
    const request = apiFacade.prepareRequest("GET", null, token);
    return apiFacade.submitRequest("/user/shipments", request);
  };

  const untrackShipment = (courier, trackingNumber, token) => {
    const body = {
      courier: courier,
      trackingNumber: trackingNumber,
    };
    const request = apiFacade.prepareRequest("DELETE", body, token);
    return apiFacade.submitRequest("/user/shipments", request);
  };

  const addShipment = (courier, trackingNumber, token) => {
    const body = {
      courier: courier,
      trackingNumber: trackingNumber,
    };
    const request = apiFacade.prepareRequest("POST", body, token);
    return apiFacade.submitRequest("/user/shipments", request);
  };

  return { shipment, untrackShipment, addShipment };
}

const shipmentFacade = ShipmentFacade();
export default shipmentFacade;

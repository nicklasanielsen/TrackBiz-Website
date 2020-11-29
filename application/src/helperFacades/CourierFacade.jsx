import apiFacade from "./ApiFacade";

function CourierFacade() {
  const getAll = () => {
    const request = apiFacade.prepareRequest("GET", null, null);

    return apiFacade.submitRequest("/courier/all", request);
  };

  return { getAll };
}

const courierFacade = CourierFacade();
export default courierFacade;

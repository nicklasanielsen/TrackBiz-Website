import apiFacade from "./ApiFacade";
import tokenFacade from "./TokenFacade";

function FeedbackFacade() {
  const getFeedback = () => {
    const request = apiFacade.prepareRequest("GET", null, null);
    return apiFacade.submitRequest("/feedback/courier/", request);
  };

  const makeFeedback = (courier, courierSite, description) => {
    const body = {
      name: courier,
      url: courierSite,
      message: description,
    };
    const request = apiFacade.prepareRequest("POST", body, null);
    return apiFacade.submitRequest("/feedback/courier/", request);
  };

  const removeFeedback = (Id) => {
    const token = tokenFacade.getToken();
    const body = {
      id: Id,
    };
    const request = apiFacade.prepareRequest("DELETE", body, token);
    return apiFacade.submitRequest("/feedback/courier/", request);
  };

  return { getFeedback, makeFeedback, removeFeedback };
}

const feedback = FeedbackFacade();
export default feedback;

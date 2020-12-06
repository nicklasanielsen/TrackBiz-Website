import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState, useCallback } from "react";
import { Alert } from "react-bootstrap";
import facade from "../facade";

export default function Home({ isLoggedIn }) {
  const [getCouriers, setCouriers] = useState("Loading..");
  const [error, setError] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courier, setCourier] = useState();
  const [trackInfo, setTrackInfo] = useState();
  const [trackingButton, setTrackingButton] = useState("Track");
  const [savingButton, setSavingButton] = useState("Save shipment");

  const importCouriers = useCallback(() => {
    facade
      .getCouriers()
      .then((couriers) => {
        setCouriers([
          <option key="Any">Any</option>,
          couriers.map((courier) => {
            return <option key={courier.name}>{courier.name}</option>;
          }),
        ]);
        setCourier({
          Choice: "Any",
        });
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError(
          "An error occurred while loading the list of supported couriers."
        );
      });
  }, [setCouriers]);

  useEffect(() => {
    importCouriers();
  }, [importCouriers]);

  const addShipment = (courier, trackingNumber) => {
    setSavingButton(
      <>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Saving...
      </>
    );
    facade.addShipment(courier, trackingNumber);
  };

  const perfromTrack = (event) => {
    event.preventDefault();

    setError(null);
    setTrackInfo(null);

    if (trackingNumber !== "") {
      setTrackingButton(
        <>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Tracking...
        </>
      );

      facade
        .getTrackInfo(courier.Choice, trackingNumber.trackingNumber)
        .then((data) =>
          setTrackInfo(
            data.map((info) => {
              return (
                <div key={info.trackingNumber + "_" + info.timeStamp}>
                  <Col md={2}></Col>
                  <Col md={10}>
                    <Row className=" justify-content-md-center">
                      <Col>
                        <h5>Current Status</h5>
                      </Col>
                      <Col></Col>
                      <Col></Col>
                      <Col className="saveButton justify-content-md-right">
                        {isLoggedIn && (
                          <Button
                            onClick={function () {
                              addShipment(info.courier, info.trackingNumber);
                            }}
                          >
                            {savingButton}
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <Row className="statusTextArea justify-content-md-center">
                      <Col md={2} className="statusLogo">
                        {facade.getStatusLogo(info.currentEvent.status)}
                      </Col>
                      <Col md={6} className="statusCol1">
                        <span className="infoStatus">
                          {info.courier} - {info.consignor}
                        </span>
                        <br />
                        <br />
                        <span className="infoStatus">
                          {info.currentEvent.status}
                        </span>
                        <br />
                        <span>{info.currentEvent.description}</span>
                        <br />
                        <br />
                        <span className="infoStatus">Origin: </span>
                        <span>
                          {info.originCountry}, {info.originCity}
                        </span>
                        <br />
                        <span className="infoStatus">Destination: </span>
                        <span>
                          {info.destinationCountry}, {info.destinationCity}
                        </span>
                      </Col>
                      <Col md={4} className="statusCol2">
                        <span>{info.currentEvent.timeStamp}</span>
                        <br />
                        <br />
                        <span>{info.volume} m³</span>
                        <br />
                        <span>{info.weight} kg</span>
                      </Col>
                    </Row>
                    <Row className="historyHeader justify-content-md-center">
                      <h5>History</h5>
                    </Row>
                    {info.events.map((element) => {
                      return (
                        <div
                          key={
                            info.trackingNumber +
                            "_" +
                            element.timeStamp +
                            "_" +
                            info.courier
                          }
                        >
                          <Row className="historyArea justify-content-md-center">
                            <Col md={2} className="statusLogo">
                              {facade.getStatusLogo(element.status)}
                            </Col>
                            <Col md={6} className="statusCol1">
                              <span
                                key={
                                  element.trackingNumber +
                                  "_" +
                                  element.timeStamp
                                }
                                className="infoStatus"
                              >
                                {element.status}
                              </span>
                              <br />
                              <span
                                key={
                                  element.description +
                                  "_" +
                                  element.trackingNumber +
                                  "_" +
                                  element.timeStamp
                                }
                              >
                                {element.description}
                              </span>
                              <br />
                              <br />
                              <span className="infoStatus">Updated at: </span>
                              <br />
                              <span
                                key={
                                  element.country +
                                  "_" +
                                  element.trackingNumber +
                                  "_" +
                                  element.timeStamp
                                }
                              >
                                {element.country}, {element.city}
                              </span>
                            </Col>
                            <Col md={4} className="statusCol2">
                              {element.timeStamp}
                            </Col>
                          </Row>
                          <br />
                        </div>
                      );
                    })}
                  </Col>
                  <Col md={0}></Col>
                </div>
              );
            })
          )
        )
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("An error occurred while processing your request.");
        })
        .then(() => {
          setTrackingButton("Track");
          setSavingButton("Save shipment");
        });
    } else {
      setError("Tracking number is missing!");
    }
  };

  const onChange = (event) => {
    setTrackingNumber({
      ...trackingNumber,
      [event.target.id]: event.target.value,
    });
    setCourier({
      ...courier,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <>
      <Container>
        <Row className="homeHeader justify-content-md-center">
          <h2>TRACKING</h2>
        </Row>
        <span className="homeParagraph">
          <Row className="justify-content-md-center">
            A platform to track all your shipments!
          </Row>
          <Row className="justify-content-md-center">
            Enter your tracking number and we will collect the information for
            you
          </Row>
          <Row className="justify-content-md-center">
            All information is in real time
          </Row>
        </span>
        <Row className="formArea">
          <Col md={2}></Col>
          <Col md={9}>
            <Form>
              <Form.Row>
                <Form.Group as={Col} xl={2}>
                  <Form.Label className="" htmlFor="Choice"></Form.Label>
                  <Form.Control
                    as="select"
                    className=""
                    id="Choice"
                    custom
                    onChange={onChange}
                  >
                    {getCouriers}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} xl={8}>
                  <Form.Label htmlFor="trackingNumber" srOnly>
                    Tracking Number
                  </Form.Label>
                  <Form.Control
                    onChange={onChange}
                    className=""
                    id="trackingNumber"
                    placeholder="Tracking number"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formSubmit" xl={2}>
                  <Button type="submit" className="" onClick={perfromTrack}>
                    {trackingButton}
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {trackInfo}
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </>
  );
}

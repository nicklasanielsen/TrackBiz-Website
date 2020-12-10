import facade from "../facade";
import React, { useState, useCallback, useEffect } from "react";
import { Col, Container, Row, Button, Collapse, Alert } from "react-bootstrap";

export default function TrackedShipments() {
  const [shipments, setShipments] = useState("Loading...");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const removeFromList = (courier, trackingNumber) => {
    facade.untrackShipment(courier, trackingNumber).then((data) => {
      window.location.reload();
    });
  };

  const importTrackedShipments = useCallback(() => {
    facade
      .getShipmentList()
      .then((data) => {
        setShipments(
          data.map((info) => {
            return (
              <div key={info.trackingNumber + "_" + info.timeStamp}>
                <Row>
                  <Col md={3}>{info.courier}</Col>
                  <Col md={3}>{info.trackingNumber}</Col>
                  <Col md={3}>{info.currentEvent.status}</Col>
                  <Col md={3}>
                    <Button
                      onClick={() => setOpen(!open)}
                      aria-controls="historyCollapse"
                      aria-expanded={open}
                    >
                      See history
                    </Button>
                    <Button
                      onClick={() =>
                        removeFromList(info.courier, info.trackingNumber)
                      }
                      variant="danger"
                    >
                      Remove from list
                    </Button>
                  </Col>
                  <Row>
                    <Collapse in={open}>
                      <div id="historyCollapse">
                        {info.events.map((element) => {
                          return (
                            <div
                              key={
                                element.trackingNumber + "_" + element.timeStamp
                              }
                            >
                              <Row className="historyArea justify-content-md-center">
                                <Col md={2} className="statusLogo">
                                  {facade.getStatusLogo(element.status)}
                                </Col>
                                <Col md={6} className="statusCol1">
                                  <span className="infoStatus">
                                    {element.status}
                                  </span>
                                  <br />
                                  <span>{element.description}</span>
                                  <br />
                                  <br />
                                  <span className="infoStatus">
                                    Updated at:{" "}
                                  </span>
                                  <br />
                                  <span>
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
                      </div>
                    </Collapse>
                  </Row>
                </Row>
              </div>
            );
          })
        );
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError(
          "An error occurred while loading the list of supported couriers."
        );
      });
  }, [setShipments, open]);

  useEffect(() => {
    importTrackedShipments();
  }, [importTrackedShipments]);

  return (
    <>
      <Container>
        <Row>
          <Col md={3}>Courier</Col>
          <Col md={3}>Tracking Number</Col>
          <Col md={3}>Status</Col>
          <Col md={3}></Col>
        </Row>
        {shipments}
        <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
      </Container>
    </>
  );
}

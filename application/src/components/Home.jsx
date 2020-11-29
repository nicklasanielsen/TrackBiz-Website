import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import facade from "../facade";

export default function Home() {
  const [getCouriers, setCouriers] = useState("Loading..");
  const [error, setError] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState();
  const [courier, setCourier] = useState();

  useEffect(() => {
    facade
      .getCouriers()
      .then((couriers) => {
        setCouriers([
          <option key="Any">Any</option>,
          couriers.map((courier) => {
            return <option key={courier.name}>{courier.name}</option>;
          }),
        ]);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setError(e.message));
        }

        setError("An error occurred while processing your request.");
      });
  }, [setCouriers]);

  const perfromTrack = (event) => {
    event.preventDefault();

    setError(null);

    if (trackingNumber !== "") {
      facade
        .getTrackInfo(courier.Choice, trackingNumber.trackingNumber)
        .then((data) =>
          data.map((info) => {
            return (
              <>
                <Row className="statusHeader">
                  <h5>Current Status</h5>
                </Row>
                <Row>
                  <Col md={2}></Col>
                  <Col md={8}>
                    <Row className="statusTextArea">
                      <Col className="statusLogo">
                        {facade.getStatusLogo(info.currentEvent.status)}
                      </Col>
                      <Col className="statusCol1">
                        <span>{info.currentEvent.status}</span>
                      </Col>
                      <Col className="statusCol2">
                        <span>{info.currentEvent.timeStamp}</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2}></Col>
                </Row>
                <Row>
                  <h5 className="historyHeader">History</h5>
                </Row>
              </>
            );
          })
        )
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setError(e.message));
          }

          setError("An error occurred while processing your request.");
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
            {error && <Alert variant="danger">{error}</Alert>}
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
                    Submit
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </>
  );
}

import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <div>
      <Container>
        <Row className="homeHeader justify-content-md-center">
          <h2>TRACKING</h2>
        </Row>
        <p className="homeParagraph">
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
        </p>
        <Row>
          <Col md={2}></Col>
          <Col md={9}>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formCourierChoice" xl={2}>
                  <Form.Label className="" htmlFor="Choice"></Form.Label>
                  <Form.Control as="select" className="" id="Choice" custom>
                    <option value="Any">Any</option>
                    <option value="PostNord">PostNord</option>
                    <option value="GLS">GLS</option>
                    <option value="Bring">Bring</option>
                    <option value="DAO">DAO</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formTrackingNumber" xl={8}>
                  <Form.Label htmlFor="trackingNumber" srOnly>
                    Tracking Number
                  </Form.Label>
                  <Form.Control
                    className=""
                    id="trackingNumber"
                    placeholder="Tracking number"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formSubmit" xl={2}>
                  <Button type="submit" className="">
                    Submit
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

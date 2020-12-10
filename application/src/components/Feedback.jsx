import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import facade from "../facade";

export default function Feedback() {
  const [feedbackC, setFeedbackC] = useState("");
  const [feedbackCW, setFeedbackCW] = useState("");
  const [feedbackAI, setFeedbackAI] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (event) => {
    if (event.target.id === "formC") {
      setFeedbackC(event.target.value);
    }
    if (event.target.id === "formCW") {
      setFeedbackCW(event.target.value);
    }
    if (event.target.id === "formAI") {
      setFeedbackAI(event.target.value);
    }
  };

  const processFeedback = (event) => {
    event.preventDefault();
    if (feedbackC !== "" && feedbackCW !== "") {
      facade.sendFeedback(feedbackC, feedbackCW, feedbackAI);
      setSuccess("Success, feedback received!");
    } else {
      setError("Courier and/or Courier-Website is missing!");
    }
  };

  return (
    <div>
      <Container className="feedbackContainer">
        <Row className="feedbackBox">
          <Col md={1}></Col>
          <Col md={10}>
            {" "}
            <Form onChange={onChange}>
              <Form.Group>
                <Form.Label>Courier</Form.Label>
                <Form.Control
                  id="formC"
                  placeholder="Enter a courier name"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Courier-Website</Form.Label>
                <Form.Control
                  id="formCW"
                  placeholder="Enter link to courier-website"
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Additional information</Form.Label>
                <Form.Control
                  id="formAI"
                  as="textarea"
                  placeholder="Enter any Additional information you want."
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Button onClick={processFeedback} type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

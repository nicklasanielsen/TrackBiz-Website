import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Container, Alert, Button } from "react-bootstrap";
import facade from "../facade";

export default function FeedbackAdmin() {
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");

  const removeFromList = (id) => {
    facade.deleteFeedback(id).then(() => {
      window.location.reload();
    });
  };

  const importFeedback = useCallback(() => {
    facade
      .pullFeedback()
      .then((data) => {
        setFeedback(
          data.map((info) => {
            return (
              <div key={info.id + "_" + info.name}>
                <Row>
                  <Col md={3}>{info.name}</Col>
                  <Col md={3}>{info.url}</Col>
                  <Col md={3}>{info.message}</Col>
                  <Col md={3}>
                    <Button
                      onClick={() => removeFromList(info.id)}
                      variant="danger"
                    >
                      Delete feedback
                    </Button>
                  </Col>
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

        setError("An error occurred while loading the list of feedback.");
      });
  }, [setFeedback]);

  useEffect(() => {
    importFeedback();
  }, [importFeedback]);

  return (
    <Container>
      <Row>
        <Col md={3}>Courier</Col>
        <Col md={3}>Courier Website</Col>
        <Col md={3}>Information</Col>
        <Col md={3}></Col>
      </Row>
      {feedback}
      <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
    </Container>
  );
}

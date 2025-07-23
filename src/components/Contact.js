import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">CONTACT US</h2>
        <p className="contact-subtitle">Email Us for queries</p>
        <div className="divider"></div>
        <p className="contact-desc">We will get back to you in 48 working hours.</p>

        <Form className="contact-form">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First name *</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>Last name *</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Form.Group>

          <Button type="submit" className="submit-button">Send</Button>
        </Form>
      </div>
    </section>
  );
}

export default Contact;

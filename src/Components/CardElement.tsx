import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  header?: string;
  title: string | null;
  body?: string;
};

const CardElement = (props: Props) => {
  return (
    <Card>
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>
        <Card.Title>{props.title}e</Card.Title>
        <Card.Text>{props.body}</Card.Text>
        <Button variant="dark">Flip Card</Button>
      </Card.Body>
    </Card>
  );
};

export default CardElement;

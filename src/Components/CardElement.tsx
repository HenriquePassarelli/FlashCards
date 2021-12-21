
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
  header: string | null;
  body?: string;
};

const CardElement = (props: Props) => {
  return (
    <Card style={{ width: '18rem' }} className=" m-2" >
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>
        <Card.Text>{props.body}</Card.Text>
        <Button variant="dark">Flip Card</Button>
      </Card.Body>
    </Card>
  );
};

export default CardElement;

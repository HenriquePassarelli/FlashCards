import React, { useState } from 'react';
import { Card, Button, CloseButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard } from '../Context/Context';

type Props = {
  header: string | null;
  front: string;
  back: string
  id: number
};

const CardElement = (props: Props) => {
  const { cards, setCards } = useCard();
  const [flip, setFlip] = useState<boolean>(false)
  const deleteCard = () => {
    const copyCards = [...cards]
    copyCards.splice(props.id, 1)
    setCards(copyCards)
  }
  return (
    <Card key={props.id} style={{ width: '18rem' }} className=" m-2" >
      <Card.Header className="d-flex justify-content-between">{props.header} <CloseButton onClick={deleteCard} /></Card.Header>
      <Card.Body>
        {flip ?
          <Card.Text>{props.back}</Card.Text>
          :
          <Card.Text>{props.front}</Card.Text>
        }
        <Button variant="dark" onClick={() => setFlip((flip) => !flip)}>Flip Card</Button>
      </Card.Body>
    </Card>
  );
};

export default CardElement;

import React, { useState } from 'react';
import { Card, Button, CloseButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard } from '../Context/Context';

type Props = {
  header: string | null;
  front: string;
  back: string
  idx: number
  id: number
};

const CardElement = (props: Props) => {
  const { setCards, cards } = useCard();
  const [flip, setFlip] = useState<boolean>(false)

  const deleteCard = () => {
    const copyCards = [...cards]
    const index = copyCards.findIndex(card => card.id === props.id);
    copyCards.splice(index, 1)
    setCards(copyCards)
    console.log(cards[index].id)
    handleSubmit(cards[index].id)
  }

  const handleSubmit = (id: number): void => {
    console.log(id)
    const url = `http://localhost:3004/cards/${id}`
    fetch(url, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response)
      if (response.ok) {

        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
      .catch((error) => console.log(error, 'something went wrong'))
  }

  return (
    <Card key={props.idx} style={{ width: '18rem' }} className=" m-2" >
      <Card.Header className="d-flex justify-content-between">{props.header} <CloseButton onClick={deleteCard} /></Card.Header>
      <Card.Body>
        {flip ?
          <Card.Text style={{ color: 'red' }}>{props.back}</Card.Text>
          :
          <Card.Text >{props.front}</Card.Text>
        }
        <Button variant="dark" onClick={() => setFlip((flip) => !flip)}>Flip Card</Button>
      </Card.Body>
    </Card>
  );
};

export default CardElement;

import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl, Form, DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard, Cards } from "../Context/Context";
import { useLogin } from "../Context/LoginContext";
type Props = {
  show?: boolean,
  onHide: () => void
}


const CardModal = (props: Props): JSX.Element => {
  const { setModalShow, topics, setTopics, setCards, cards } = useCard();
  const { loggingId } = useLogin()
  const [newTopic, setNewTopic] = useState<string>('')
  const [frontCard, setFrontCard] = useState<string>('')
  const [backCard, setBackCard] = useState<string>('')

  const newListTopic = (): void => {
    if (topics.every(topic => topic !== newTopic)) {
      const newListTopic: string[] = [...topics]
      newListTopic.push(newTopic)
      setTopics(newListTopic)
    }
  }

  const handleSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const event = e.target as HTMLInputElement
    setNewTopic(Object.values(event)[1].value)
  }

  const addNewCard = (): void => {

    if (frontCard === '' || newTopic === '' || backCard === '') return

    if (!topics.some(topic => newTopic === topic)) {
      newListTopic()
    }

    const newCard = [...cards]

    const cardData = { userId: loggingId, id: newCard.length + 1, topic: newTopic, frontCard, backCard }
    newCard.push(cardData)

    const url = `http://localhost:3004/cards`
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    }).then((response) => {
      if (response.ok) {
        setModalShow(false)
        setCards(newCard)
        clear()
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
      .catch((error) => console.log(error, 'something went wrong'))


  }

  const clear = () => {
    setFrontCard('')
    setBackCard('')
    setNewTopic('')
  }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="list">Topic List</Form.Label>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title="Topic"
            id="input-group-dropdown-1"
          >
            {topics.map((item, index) => {
              return (
                <Dropdown.Item key={index} value={item} onClick={(e) => handleSelect(e)}>{item}</Dropdown.Item>
              )
            })}

          </DropdownButton>

          <FormControl value={newTopic} onChange={(e: { target: { value: any; }; }) => setNewTopic(e.target.value)}
            id="list" aria-label="list"
            placeholder="Select one or type to add one " autoComplete="off"
          />
          <Button onClick={newListTopic} variant="secondary" id="button-addon2">
            Add to list
          </Button>
        </InputGroup>
        <Form.Label htmlFor="list">Front card</Form.Label>
        <InputGroup>
          <FormControl as="textarea" aria-label="textarea" placeholder="Add your text here"
            onChange={(e: { target: { value: any; }; }) => setFrontCard(e.target.value)}
          />
        </InputGroup>
        <Form.Label htmlFor="list">Back card</Form.Label>
        <InputGroup>
          <FormControl as="textarea" aria-label="textarea" placeholder="Add your text here"
            onChange={(e: { target: { value: any; }; }) => setBackCard(e.target.value)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addNewCard}>Add Card</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;

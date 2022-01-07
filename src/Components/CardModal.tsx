import React, { useState, useCallback } from "react";
import { Modal, Button, InputGroup, FormControl, Form, DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard } from "../Context/Context";
type Props = {
  show?: boolean,
  onHide: () => void
}


const CardModal = (props: Props): JSX.Element => {
  const { setModalShow, topics, setTopics, setCards, cards, setFilter } = useCard();
  const [newTopic, setNewTopic] = useState<string>('')
  const [frontCard, setFrontCard] = useState<string>('')
  const [backCard, setBackCard] = useState<string>('')
  const [withoutTopic, setWithoutTopic] = useState<boolean>(false)
  const [withoutFront, setWithoutFront] = useState<boolean>(false)
  const [withoutBack, setWithoutBack] = useState<boolean>(false)


  const checkTopic = useCallback(() => {
    if (newTopic.length > 0) {
      return setWithoutTopic(false)
    }
    return setWithoutTopic(true)
  }, [newTopic])

  const checkFront = useCallback(() => {
    if (frontCard.length > 0) {
      return setWithoutFront(false)
    }
    return setWithoutFront(true)
  }, [frontCard])

  const checkBack = useCallback(() => {
    if (backCard !== "") {
      return setWithoutBack(false)
    }
    return setWithoutBack(true)
  }, [backCard])

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

  const addNewCard = () => {
    checkTopic()
    checkFront()
    checkBack()
    if (frontCard === '' || newTopic === '' || backCard === '') return

    if (!topics.some(topic => newTopic === topic)) {
      newListTopic()
    }
    setModalShow(false)
    const newCard = [...cards]
    newCard.push({ id: newCard.length + 1, topic: newTopic, frontCard, backCard })
    setCards(newCard)
    setFrontCard('')
    setBackCard('')
    setNewTopic('')
    setFilter('')
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

          <FormControl value={newTopic} onChange={(e: { target: { value: any; }; }) => {
            setNewTopic(e.target.value)
            checkTopic()
          }}
            id="list" aria-label="list"
            placeholder="Select one or type to add one " autoComplete="off"
            isInvalid={withoutTopic} />
          <Button onClick={newListTopic} variant="secondary" id="button-addon2">
            Add to list
          </Button>
        </InputGroup>
        <Form.Label htmlFor="list">Front card</Form.Label>
        <InputGroup>
          <FormControl as="textarea" aria-label="textarea" placeholder="Add your text here" onChange={(e: { target: { value: any; }; }) => {
            setFrontCard(e.target.value)
            checkFront()
          }}
            isInvalid={withoutFront} />
        </InputGroup>
        <Form.Label htmlFor="list">Back card</Form.Label>
        <InputGroup>
          <FormControl as="textarea" aria-label="textarea" placeholder="Add your text here" onChange={(e: { target: { value: any; }; }) => {
            setBackCard(e.target.value)
            checkBack()
          }} isInvalid={withoutBack} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addNewCard}>Add Card</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;

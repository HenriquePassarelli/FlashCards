import React, { useState, MouseEventHandler } from "react";
import { Modal, Button, InputGroup, FormControl, Form, DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard } from "../Contex/CardContext";
type Props = {
  show?: boolean,
  onHide: () => void
}


const CardModal = (props: Props): JSX.Element => {
  const { setModalShow, topics, setTopics, setCards, cards } = useCard();
  const [newTopic, setNewTopic] = useState<string | null>('')
  const [selectedTopic, setSelectedTopic] = useState<string | null>('')
  const [content, setContent] = useState<string>('')

  const newListTopic = (): void => {
    
    if (topics.every(topic => topic.item == newTopic)) {
      const newListTopic = [...topics]
      newListTopic.push({ item: newTopic })
      setTopics(newListTopic)
    }

  }

  const handleSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const event = e.target as HTMLInputElement
    console.log(event.value)
    let value
    if (event.getAttribute('value') == null) {
      value = ''
    } else {
      value = event.getAttribute('value')
    }
    setNewTopic(value)
    setSelectedTopic(value)
  }

  const addNewCard = () => {
    setModalShow(false)
    const newCard = [...cards]
    newCard.push({ topic: selectedTopic, content })
    setCards(newCard)
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
        <Form.Label htmlFor="list">List</Form.Label>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title="List Topic"
            id="input-group-dropdown-1"
          >
            {topics.map((item, index) => {
              return (<>
                <Dropdown.Item key={index} value={item.item} onClick={(e) => handleSelect(e)}>{item.item}</Dropdown.Item>
              </>)
            })}

          </DropdownButton>

          <FormControl onChange={(e: { target: { value: any; }; }) => setNewTopic(e.target.value)} id="list" aria-label="list" placeholder="Select one or type to add one " />
          <Button onClick={newListTopic} variant="secondary" id="button-addon2">
            Add to list
          </Button>
        </InputGroup>
        <InputGroup>
          <FormControl as="textarea" aria-label="textarea" placeholder="Add your text here" onChange={(e: { target: { value: any; }; }) => setContent(e.target.value)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addNewCard}>Add Card</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;

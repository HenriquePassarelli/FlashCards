import React, { useState } from "react";
import { Button, Container, DropdownButton, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from '../Components/LoginModal'
import CardModal from "../Components/CardModal";
import CardElement from "../Components/CardElement";
import Settings from '../Components/Setting'
import Header from "../Components/Header"
import './mainPage.css'

import { useLogin } from "../Context/LoginContext";
import { useCard } from "../Context/Context";
import useToken from '../hooks/useToken'


const Page = (): JSX.Element => {

  const { token, logout } = useToken()
  const { modalShow, setModalShow, topics, filteredCards, setFilter } = useCard();
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  console.log(token)

  const filterDropdown = () => {
    return (
      <>
        <DropdownButton
          variant="outline-secondary"
          title="Filter"
          id="input-group-dropdown-1"
        >
          {topics?.map((item, index) => {
            return (
              <Dropdown.Item key={index} value={item} onClick={handleSelect}>{item}</Dropdown.Item>
            )
          })}

        </DropdownButton>
        <Button variant="outline-danger" onClick={clearFilter} >Clear</Button>
      </>
    )
  }

  const handleSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const event = e.target as HTMLInputElement
    setFilter(event?.getAttribute("value") || '')
  }

  const clearFilter = () => {
    setFilter('')
  }

  if (!token) return <LoginModal show={!token} />


  return (
    <Container style={{ height: '100%' }} fluid="md" className="container bg-dark rounded-bottom pb-3">
      <Header logout={logout} setSettingsOpen={setSettingsOpen} />
      <section className="d-flex gap-3">
        <Button variant="success" onClick={() => setModalShow(true)} >Add a new card</Button>
        {filteredCards.length > 0 && filterDropdown()}
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Settings show={settingsOpen} onHide={() => setSettingsOpen(false)} />
      <section style={{ background: "var(--bs-gray-700)", minHeight: "50px" }} className="d-flex flex-wrap justify-content-center rounded m-3 pt-3 pb-3">
        {filteredCards.map((item, index) => {
          return (
            <CardElement key={index} idx={index} id={item.id} header={item.topic} front={item.frontCard} back={item.backCard} />
          )
        })}
      </section>
    </Container >
  );
};

export default Page;

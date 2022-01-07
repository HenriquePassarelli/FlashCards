import React, { useState } from "react";
import { Button, Container, DropdownButton, Dropdown, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from '../Components/LoginModal'
import CardModal from "../Components/CardModal";
import CardElement from "../Components/CardElement";
import Settings from '../Components/Setting'
import './mainPage.css'

import { useLogin } from "../Context/LoginContext";
import { useCard } from "../Context/Context";


const Page = (): JSX.Element => {
  const { isLoggedIn, setIsLoggedIn } = useLogin()
  const { modalShow, setModalShow, topics, filteredCards, setFilter } = useCard();
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

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
    setFilter(event.getAttribute("value"))
  }

  const clearFilter = () => {
    setFilter('')
  }

  return (
    <Container style={{ height: '100%' }} fluid="md" className="container bg-dark rounded-bottom pb-3">
      <Navbar className="justify-content-between" >
        <h1 className="text-light">Flash card</h1>
        <Navbar.Text >
          {
            isLoggedIn ?
              <>

                <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-${"bottom"}`}>
                      Settings
                    </Tooltip>
                  }
                >
                  <span onClick={() => setSettingsOpen(true)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg>
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-${"bottom"}`}>
                      Exit
                    </Tooltip>
                  }
                >
                  <span onClick={() => setIsLoggedIn(false)} style={{ cursor: 'pointer' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" /></g></svg>
                  </span>
                </OverlayTrigger>


              </>
              :
              <>
                <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg></span>
                <LoginModal show={!isLoggedIn} />
              </>

          }

        </Navbar.Text>

      </Navbar>
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

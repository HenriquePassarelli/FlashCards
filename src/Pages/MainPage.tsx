import React, { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard } from "../Context/Context";
import LoginModal from '../Components/LoginModal'
import CardModal from "../Components/CardModal";
import CardElement from "../Components/CardElement";
import './mainPage.css'

const Page = (): JSX.Element => {
  const { modalShow, setModalShow, cards } = useCard();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); //
  return (
    <Container style={{ height: '100%' }} fluid="md" className="container bg-dark rounded-bottom pb-3">
      <Navbar className="justify-content-between" >
        <h1 className="text-light">Flash card</h1>
        <Navbar.Text >
          {
            isLoggedIn ?
              <>
                <Button variant="success" onClick={() => setModalShow(true)} >Add a new card</Button>
                <i className="fas fa-sign-out-alt"></i>
                <CardModal show={modalShow} onHide={() => setModalShow(false)} />
              </>
              :
              <>
                <LoginModal show={!isLoggedIn} close={setIsLoggedIn} />  <i className="far fa-user-circle"></i>
              </>

          }

        </Navbar.Text>

      </Navbar>
      <section style={{ background: "var(--bs-gray-700)", minHeight: "50px" }} className="d-flex flex-wrap justify-content-center rounded m-3 pt-3 pb-3">
        {cards.map((item, index) => {
          return (
            <CardElement key={index} id={index} header={item.topic} front={item.frontCard} back={item.backCard} />
          )
        })}
      </section>
    </Container >
  );
};

export default Page;

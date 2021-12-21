import React from "react";
import { Button, Container, Row, Col, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCard } from "../Contex/CardContext";
import CardModal from "../Components/CardModal";
import CardElement from "../Components/CardElement";

const Page = (): JSX.Element => {
  const { modalShow, setModalShow, cards } = useCard();
  return (
    <Container style={{ height:'100%'}} fluid="md" className="container bg-dark rounded-bottom pb-3">
      <Navbar className="justify-content-between" >
        <h1 className="text-light">Flash card</h1>
        <Navbar.Text >
          <Button variant="success" onClick={() => setModalShow(true)} >Add a new card</Button>
          <CardModal show={modalShow} onHide={() => setModalShow(false)} />
        </Navbar.Text>

      </Navbar>
      <section style={{background:"var(--bs-gray-700)", minHeight:"50px"}} className="d-flex flex-wrap justify-content-center rounded m-3 pt-3 pb-3">
        {cards.map(item => { 
    return (
      <CardElement  header={item.topic} body={item.content}/>
      )
  })}
      </section>
    </Container>
  );
};

export default Page;

import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components"
import { useCard } from "../Contex/CardContext";
import CardModal from "../Components/CardModal";
import ShowCards from "../Components/ShowCards"

const Page = (): JSX.Element => {
  const { modalShow, setModalShow } = useCard();
  return (
    <Container>
      <section className="header">
        <Button variant="success" onClick={() => setModalShow(true)}>Add a new card</Button>
        <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      </section>
      <section>
        <ShowCards />
      </section>
    </Container>
  );
};

export default Page;

const Container = styled.div`
  width:100%;
  height:100vh;
  background-color:black;

  .header{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

`
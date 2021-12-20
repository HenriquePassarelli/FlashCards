import React from "react";
import CardElement from "./CardElement";
import { useCard } from "../Contex/CardContext";


const ShowCards = () => {
  const { cards } = useCard();

  return <>
  
  {cards.map(item => { 
    return (
      <CardElement title={item.topic} body={item.content}/>
      )
  })}
  </>
};

export default ShowCards
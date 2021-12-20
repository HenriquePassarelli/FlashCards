import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type Cards = {
  topic: string | null,
  content: string
}

type Item = {
  item: string | null
}
type CardContextData = {
  cards: Cards[];
  setCards: Dispatch<SetStateAction<Array<Cards>>>;
  addCard?: () => void;
  deleteCard?: () => void;
  modalShow?: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>
  topics: Item[]
  setTopics: Dispatch<SetStateAction<Array<Item>>>;
};


export const CardContext = createContext({} as CardContextData);

type ProviderProps = {
  children: ReactNode;
};

export function CardContextProvider({ children }: ProviderProps): JSX.Element {
  const [cards, setCards] = useState<Cards[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [topics, setTopics] = useState<Item[]>([])

  const addCard = () => { };
  const deleteCard = () => { };

  return (
    <CardContext.Provider
      value={{ cards, setCards, addCard, deleteCard, setModalShow, modalShow, topics, setTopics }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCard = (): CardContextData => {
  return useContext(CardContext);
};
